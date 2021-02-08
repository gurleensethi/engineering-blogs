import axios from "axios";
import { addPropertyIfExists } from "../common/utils";
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
  addPropertyIfExists(params, "page", page);
  addPropertyIfExists(params, "publicationIds", publicationIds);
  addPropertyIfExists(params, "search", search);

  const { data } = await axios.get(`${BACKEND_URL}/posts`, {
    params,
  });

  return data;
}
