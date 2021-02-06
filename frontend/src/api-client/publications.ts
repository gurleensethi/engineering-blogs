import axios from "axios";
import { Publication } from "../types";

const { BACKEND_URL } = process.env;

export const getAllPublications = async (): Promise<Publication[]> => {
  const { data } = await axios.get(`${BACKEND_URL}/publications`);
  return data;
};
