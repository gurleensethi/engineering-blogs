export interface Post {
  postId: string;
  guid: string;
  title: string;
  description: string;
  pubDate: string;
  link: string;
  publicationId: string;
  publication: {
    id: string;
    name: string;
    blogName: string;
    description: string;
    link: string;
  };
}

export interface PaginatedResult<T> {
  hasNextPage: boolean;
  data: T[];
  pageNumber: number;
}

export interface Publication {
  id: string;
  name: string;
  blogName: string;
  description: string;
  link: string;
}
