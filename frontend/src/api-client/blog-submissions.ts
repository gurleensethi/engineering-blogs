import axios from "axios";
import { BlogSubmission } from "../types";

const { BACKEND_URL } = process.env;

export async function getBlogSubmissions(): Promise<BlogSubmission[]> {
  const { data } = await axios.get<BlogSubmission[]>(
    `${BACKEND_URL}/blog-submission`
  );
  return data;
}
