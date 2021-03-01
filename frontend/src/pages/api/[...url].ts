import { NextApiHandler } from "next";
import cookie from "cookie";
import { createProxyMiddleware } from "http-proxy-middleware";
import axios, { AxiosError } from "axios";
import path from "path";

const { BACKEND_URL } = process.env;

// const apiProxy = createProxyMiddleware("/api", {
//   target: BACKEND_URL,
//   pathRewrite: { "^/api/": "" },
//   onProxyReq: (req) => {
//     const cookieHeader = req.getHeader("cookie") as string;
//     const parsedCookies = cookie.parse(cookieHeader || "");
//     req.setHeader("authorization", parsedCookies["auth.access_token"] || null);
//   },
// });

const publications: NextApiHandler = async (req, res) => {
  const { data, status, headers } = await axios({
    method: req.method as any,
    url: `${BACKEND_URL}${req.url.replace("/api", "")}`,
    data: req.body,
    headers: {
      ...req.headers,
      authorization: req.cookies["auth.access_token"] || null,
    },
  }).catch((err: AxiosError) => {
    return err.response;
  });

  Object.keys(headers || {}).forEach((key) => res.setHeader(key, headers[key]));
  res.statusCode = status;
  res.json(data || {});
};

export default publications;

export const config = {
  api: {
    externalResolver: true,
  },
};
