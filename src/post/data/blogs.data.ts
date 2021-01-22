function extractCommonFieldsFromRSS({
  title,
  description,
  guid,
  pubDate,
  link,
}: any) {
  return {
    title,
    description,
    guid,
    pubDate,
    link,
  };
}

export interface BlogSource {
  name: string;
  link: string;
  description: string;
  feedUrl: string;
  mapper: (arg: any) => any;
  [key: string]: any;
}

export default <{ [key: string]: BlogSource }>{
  uber: {
    name: 'Uber',
    link: 'https://eng.uber.com/',
    description: 'https://eng.uber.com/',
    feedUrl: 'https://eng.uber.com/feed/',
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
    mapper: (rawJson: any) => {
      return {
        ...extractCommonFieldsFromRSS(rawJson),
      };
    },
  },
};
