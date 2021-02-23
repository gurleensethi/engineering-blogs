import axios from "axios";
import { addPropertyIfNotExists } from "../common/utils";
import { PaginatedResult, Post } from "../types";

const { BACKEND_URL } = process.env;

interface AllPostFilters {
  page?: number | string;
  publicationIds?: string;
  search?: string;
}

interface MyFeedFilters {
  page?: number | string;
  authToken: string;
}

export async function getAllPosts(
  filters: AllPostFilters = {
    page: 0,
    publicationIds: undefined,
    search: undefined,
  }
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

export async function getMyFeedPost(
  filters: MyFeedFilters
): Promise<PaginatedResult<Post>> {
  const { page = 0, authToken } = filters;

  const params = {};

  addPropertyIfNotExists(params, "page", page);

  const { data } = await axios.get(`${BACKEND_URL}/posts/feed`, {
    params,
    headers: { Authorization: authToken },
  });

  return data;
}
