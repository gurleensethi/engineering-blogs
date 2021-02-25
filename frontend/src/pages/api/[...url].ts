import { NextApiHandler } from "next";
import cookie from "cookie";
import { createProxyMiddleware } from "http-proxy-middleware";

const { BACKEND_URL } = process.env;

const apiProxy = createProxyMiddleware({
  target: BACKEND_URL,
  changeOrigin: true,
  pathRewrite: { "^/api/": "/" },
  onProxyReq: (req) => {
    console.log(BACKEND_URL);
    console.log(req.host, req.path);
    const cookieHeader = req.getHeader("cookie") as string;
    const parsedCookies = cookie.parse(cookieHeader || "");
    req.setHeader("authorization", parsedCookies["auth.access_token"] || null);
  },
});

const publications: NextApiHandler = async (req, res) => {
  (apiProxy as any)(req, res);
};

export default publications;

export const config = {
  api: {
    externalResolver: true,
  },
};
