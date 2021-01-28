import { Injectable, Logger, Scope } from '@nestjs/common';
import { Cron, CronExpression } from '@nestjs/schedule';
import blogsData from 'src/post/data/blogs.data';
import { PostService } from 'src/post/post.service';
import * as xmlParser from 'fast-xml-parser';
import axios from 'axios';
import { Post, Publication } from '@prisma/client';
import { PublicationService } from 'src/publication/publication.service';

@Injectable({ scope: Scope.DEFAULT })
export class SyncService {
  private readonly logger: Logger = new Logger(SyncService.name);

  constructor(
    private postService: PostService,
    private publicationService: PublicationService,
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
        description: channel.description,
        link: channel.link,
      },
      items: channel.item,
    };
  }

  public async getBlogFeed(rssUrl: string): Promise<Record<any, any>> {
    const response = await axios.get(rssUrl);
    const { data } = response;
    return xmlParser.parse(data);
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
            ...publication,
            id: blogKey,
            name: blog.name,
          });
        }

        const posts: Post[] = items.map((item) => ({
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
  }
}