export interface PaginatedResult<T> {
  pageNumber: number;
  hasNextPage: boolean;
  data: T[];
}
