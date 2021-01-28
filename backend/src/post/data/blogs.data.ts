import { Post } from '@prisma/client';

function extractCommonFieldsFromRSS({
  title,
  description,
  guid,
  pubDate,
  link,
}: any): Omit<Post, 'postId' | 'publicationId'> {
  return {
    guid,
    title,
    description,
    pubDate: new Date(pubDate),
    link,
  };
}

export interface BlogSource {
  name: string;
  link: string;
  description: string;
  feedUrl: string;
  mapper: (arg: any) => Omit<Post, 'postId' | 'publicationId'>;
  [key: string]: any;
  isPaged: boolean;
  startPage?: number;
  getNextPage?: (currentPage: number) => number;
}

export default <{ [key: string]: BlogSource }>{
  uber: {
    name: 'Uber',
    link: 'https://eng.uber.com/',
    description: 'https://eng.uber.com/',
    feedUrl: 'https://eng.uber.com/feed/',
    isPaged: false,
    mapper: (rawJson: any) => {
      return {
        ...extractCommonFieldsFromRSS(rawJson),
      };
    },
  },
  trivago: {
    name: 'Trivago',
    link: 'https://eng.uber.com/',
    description: 'https://eng.uber.com/',
    feedUrl: 'https://tech.trivago.com/index.xml',
    isPaged: false,
    mapper: (rawJson: any) => {
      return {
        ...extractCommonFieldsFromRSS(rawJson),
      };
    },
  },
  toptal: {
    name: 'Toptal',
    link: 'https://eng.uber.com/',
    description: 'https://eng.uber.com/',
    feedUrl: 'https://www.toptal.com/blog.rss',
    isPaged: false,
    mapper: (rawJson: any) => {
      return {
        ...extractCommonFieldsFromRSS(rawJson),
      };
    },
  },
  spotify: {
    name: 'Spotify',
    link: 'https://engineering.atspotify.com',
    description: 'https://engineering.atspotify.com',
    feedUrl: 'https://engineering.atspotify.com/feed',
    isPaged: true,
    startPage: 1,
    getNextPage: (currentPage) => currentPage + 1,
    mapper: (rawJson: any) => {
      return {
        ...extractCommonFieldsFromRSS(rawJson),
      };
    },
  },
  soundcloud: {
    name: 'Soundcloud',
    link: 'https://developers.soundcloud.com',
    description: 'https://developers.soundcloud.com',
    feedUrl: 'https://developers.soundcloud.com/blog.rss',
    isPaged: true,
    mapper: (rawJson: any) => {
      return {
        ...extractCommonFieldsFromRSS(rawJson),
      };
    },
  },
};
