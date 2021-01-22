import { Injectable, Logger, Scope } from '@nestjs/common';
import { Cron, CronExpression } from '@nestjs/schedule';
import blogsData from 'src/post/data/blogs.data';
import { PostService } from 'src/post/post.service';
import * as xmlParser from 'fast-xml-parser';
import axios from 'axios';
import { Post, Publication } from '@prisma/client';

@Injectable({ scope: Scope.DEFAULT })
export class SyncService {
  private readonly logger: Logger = new Logger(SyncService.name);

  constructor(private postService: PostService) {
    for (const item of Object.keys(blogsData)) {
      this.logger.debug(`Fetching data for ${item}...`);
      try {
        const blog = blogsData[item];
        console.log(blog);
      } catch (error) {
        this.logger.error(`Error when fetching data for ${item}...`);
        this.logger.error(error);
      }
    }

    this.test();
  }

  private async test() {
    const userData = await this.getBlogFeed(blogsData.toptal.feedUrl);
    console.log(userData);
    console.log(this.getRssItemFromJson(userData));
  }

  public async getRssItemFromJson(
    json: Record<any, any>,
  ): Promise<{ publication: Publication; posts: Post[] }> {
    const {
      rss: { channel },
    } = json;

    return {
      
    };
  }

  public async getBlogFeed(rssUrl: string): Promise<Record<any, any>> {
    const response = await axios.get(rssUrl);
    const { data } = response;
    return xmlParser.parse(data);
  }

  @Cron(CronExpression.EVERY_12_HOURS)
  public async syncPosts(): Promise<void> {}
}
