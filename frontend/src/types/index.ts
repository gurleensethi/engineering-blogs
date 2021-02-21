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

export type ApiResponse<T> =
  | { success: true; statusCode: number; data: T }
  | { success: false; statusCode: number; data?: T };

export interface GitHubLoginResponse {
  accessToken: string;
}

export interface User {
  id: number;
  username: string;
  firstName: string;
  lastName: string;
}

export enum FeedType {
  ALL = "all",
  MY_FEED = "my_feed",
}
