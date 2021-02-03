import axios from "axios";
import { PaginatedResult, Post } from "../types";

const { BACKEND_URL } = process.env;

export async function getAllPosts(
  filters: {
    page?: number | string;
    publicationIds?: string;
  } = { page: 0, publicationIds: "" }
): Promise<PaginatedResult<Post>> {
  const { page, publicationIds } = filters;

  const { data } = await axios.get(`${BACKEND_URL}/posts`, {
    params: { page, publicationIds },
  });

  return data;
}
