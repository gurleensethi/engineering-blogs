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
  getNextPageLink?: (currentPage: number) => string;
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
  cloudflare: {
    name: 'Cloudflare',
    link: 'https://blog.cloudflare.com/',
    description: 'The Cloudflare Blog',
    feedUrl: 'https://blog.cloudflare.com/rss/',
    isPaged: false,
    mapper: (rawJson: any) => {
      return {
        ...extractCommonFieldsFromRSS(rawJson),
      };
    },
  },
  dropboxApplication: {
    name: 'Dropbox - Application',
    link: 'https://dropbox.tech/application',
    description: 'Dropbox Tech',
    feedUrl: 'https://dropbox.tech/application/feed',
    isPaged: false,
    mapper: (rawJson: any) => {
      return {
        ...extractCommonFieldsFromRSS(rawJson),
      };
    },
  },
  dropboxFrontend: {
    name: 'Dropbox - Frontend',
    link: 'https://dropbox.tech/frontend',
    description: 'Dropbox Tech',
    feedUrl: 'https://dropbox.tech/frontend/feed',
    isPaged: false,
    mapper: (rawJson: any) => {
      return {
        ...extractCommonFieldsFromRSS(rawJson),
      };
    },
  },
  dropboxInfrastructure: {
    name: 'Dropbox - Infrastructure',
    link: 'https://dropbox.tech/infrastructure',
    description: 'Dropbox Tech',
    feedUrl: 'https://dropbox.tech/infrastructure/feed',
    isPaged: false,
    mapper: (rawJson: any) => {
      return {
        ...extractCommonFieldsFromRSS(rawJson),
      };
    },
  },
  dropboxMachineLearning: {
    name: 'Dropbox - Machine Learning',
    link: 'https://dropbox.tech/machine-learning',
    description: 'Dropbox Tech',
    feedUrl: 'https://dropbox.tech/machine-learning/feed',
    isPaged: false,
    mapper: (rawJson: any) => {
      return {
        ...extractCommonFieldsFromRSS(rawJson),
      };
    },
  },
  dropboxMobile: {
    name: 'Dropbox - Mobile',
    link: 'https://dropbox.tech/mobile',
    description: 'Dropbox Tech',
    feedUrl: 'https://dropbox.tech/mobile/feed',
    isPaged: false,
    mapper: (rawJson: any) => {
      return {
        ...extractCommonFieldsFromRSS(rawJson),
      };
    },
  },
  dropboxSecurity: {
    name: 'Dropbox - Security',
    link: 'https://dropbox.tech/security',
    description: 'Dropbox Tech',
    feedUrl: 'https://dropbox.tech/security/feed',
    isPaged: false,
    mapper: (rawJson: any) => {
      return {
        ...extractCommonFieldsFromRSS(rawJson),
      };
    },
  },
  doordash: {
    name: 'DoorDash',
    link: 'https://doordash.engineering',
    description: 'DoorDash Engineering Blog',
    feedUrl: 'https://doordash.engineering/feed',
    isPaged: true,
    getNextPage: (page) => page + 1,
    getNextPageLink: (pageNumber) =>
      `https://doordash.engineering/feed?paged=${pageNumber + 1}`,
    mapper: (rawJson: any) => {
      return {
        ...extractCommonFieldsFromRSS(rawJson),
      };
    },
  },
  github: {
    name: 'GitHub',
    link: 'https://github.bloc',
    description: 'GitHub Blog',
    feedUrl: 'https://github.blog/feed',
    isPaged: true,
    getNextPage: (page) => page + 1,
    getNextPageLink: (pageNumber) =>
      `https://github.blog/feed?paged=${pageNumber + 1}`,
    mapper: (rawJson: any) => {
      return {
        ...extractCommonFieldsFromRSS(rawJson),
      };
    },
  },
};
