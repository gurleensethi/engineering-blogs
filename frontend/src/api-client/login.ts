import axios from "axios";
import { ApiResponse, GitHubLoginResponse } from "../types";

const { BACKEND_URL } = process.env;

export const loginWithGitHub = async (
  code: string
): Promise<ApiResponse<GitHubLoginResponse>> => {
  try {
    const { data, status } = await axios.post<GitHubLoginResponse>(
      `${BACKEND_URL}/auth/login/github`,
      { code }
    );

    return {
      data,
      success: true,
      statusCode: status,
    };
  } catch ({ response }) {
    return {
      success: false,
      statusCode: response.status,
      data: response.data,
    };
  }
};
