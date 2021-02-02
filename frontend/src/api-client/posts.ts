import { PaginatedResult, Post } from "../types";

const { BACKEND_URL } = process.env;

export async function getAllPosts(
  page: number | string = 0
): Promise<PaginatedResult<Post>> {
  const response = await fetch(`${BACKEND_URL}/posts?page=${page}`);
  return response.json();
}
