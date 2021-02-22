import { Injectable } from '@nestjs/common';
import axios from 'axios';
import { parse } from 'node-html-parser';

@Injectable()
export class PostImageService {
  public async getPostImageUrl(url: string): Promise<string | null> {
    const { data } = await axios.get(url);
    const parsed = parse(data);

    const ogLinkMeta = parsed.querySelector('meta[property="og:image"]');

    if (ogLinkMeta) {
      return ogLinkMeta.attributes.content;
    }

    const twitterImageMeta = parsed.querySelector('meta[name="twitter:image"]');

    if (twitterImageMeta) {
      return twitterImageMeta.attributes.content;
    }

    return null;
  }
}
