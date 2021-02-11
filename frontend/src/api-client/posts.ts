import axios from "axios";
import { addPropertyIfNotExists } from "../common/utils";
import { PaginatedResult, Post } from "../types";

const { BACKEND_URL } = process.env;

export async function getAllPosts(
  filters: {
    page?: number | string;
    publicationIds?: string;
    search?: string;
  } = { page: 0, publicationIds: undefined, search: undefined }
): Promise<PaginatedResult<Post>> {
  const { page, publicationIds, search } = filters;

  const params = {};
  addPropertyIfNotExists(params, "page", page);
  addPropertyIfNotExists(params, "publicationIds", publicationIds);
  addPropertyIfNotExists(params, "search", search);

  const { data } = await axios.get(`${BACKEND_URL}/posts`, {
    params,
  });

  return data;
}
