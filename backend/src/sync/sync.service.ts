import { Injectable, Logger, Scope } from '@nestjs/common';
import { Cron, CronExpression } from '@nestjs/schedule';
import blogsData, { BlogSource } from 'src/post/data/blogs.data';
import { PostService } from 'src/post/post.service';
import * as xmlParser from 'fast-xml-parser';
import axios from 'axios';
import { Prisma, Publication } from '@prisma/client';
import { PublicationService } from 'src/publication/publication.service';
import { htmlToText } from 'html-to-text';
import { PostImageService } from 'src/post/post-image.service';

@Injectable({ scope: Scope.DEFAULT })
export class SyncService {
  private readonly logger: Logger = new Logger(SyncService.name);

  constructor(
    private postService: PostService,
    private publicationService: PublicationService,
    private postImageService: PostImageService,
  ) {
    this.syncPosts();
  }

  public async extractDataFromRSS(
    json: Record<any, any>,
  ): Promise<{
    publication: Pick<Publication, 'blogName' | 'description' | 'link'>;
    items: Record<any, any>[];
  }> {
    const {
      rss: { channel },
    } = json;

    return {
      publication: {
        blogName: channel.title,
        description: htmlToText(channel.description),
        link: channel.link,
      },
      items: channel.item.map((item) => ({
        ...item,
        description: htmlToText(item.description),
      })),
    };
  }

  public async getBlogFeed(rssUrl: string): Promise<Record<any, any>> {
    const response = await axios.get(rssUrl);
    const { data } = response;
    return xmlParser.parse(data);
  }

  private normalizePublication(
    publication: Pick<Publication, 'blogName' | 'description' | 'link'>,
    blog: BlogSource,
  ): Pick<Publication, 'blogName' | 'description' | 'link'> {
    const result = { ...publication };

    if (!result.description) {
      result.description = blog.description;
    }

    if (!result.blogName) {
      result.blogName = blog.blogName || blog.name;
    }

    if (!result.link) {
      result.link = blog.link;
    }

    return result;
  }

  @Cron(CronExpression.EVERY_12_HOURS)
  public async syncPosts(): Promise<void> {
    for (const blogKey of Object.keys(blogsData)) {
      this.logger.log(`Fetching data for '${blogKey}'...`);

      try {
        const blog = blogsData[blogKey];
        const rawFeed = await this.getBlogFeed(blog.feedUrl);
        const { publication, items } = await this.extractDataFromRSS(rawFeed);

        let pub = await this.publicationService.getPublication(blogKey);

        if (!pub) {
          this.logger.log(
            `Publication for '${blogKey}' not found. Creating it...`,
          );

          pub = await this.publicationService.createPublication({
            ...this.normalizePublication(publication, blog),
            id: blogKey,
            name: blog.name,
          });
        }

        const posts: Prisma.PostUpdateInput[] = items.map((item) => ({
          ...blog.mapper(item),
          postId: `${blogKey}#${item.guid}`,
          publicationId: pub.id,
        }));

        this.logger.log(`${posts.length} posts fetched for '${blogKey}'.`);

        await this.postService.createManyPosts(posts);
      } catch (error) {
        this.logger.error(
          `Error occured when fetching posts for '${blogKey}'!`,
        );
        this.logger.error(error);
      }
    }

    await this.syncPostImages();
  }

  private async syncPostImages(): Promise<void> {
    let posts = await this.postService.getPostsWithoutImages();

    this.logger.log(`${posts.length} don't have any images...`);

    try {
      const images = await Promise.all(
        posts.map((item) =>
          this.postImageService.getPostImageUrl(item.link).catch(() => null),
        ),
      );

      posts = posts.map((item, index) => ({
        ...item,
        imageUrl: images[index],
      }));

      this.logger.log(`Image fetch complete...`);
    } catch (err) {
      this.logger.error(`Unable to fetch images...`);
    }

    await this.postService.updatePostImages(posts);
  }
}
