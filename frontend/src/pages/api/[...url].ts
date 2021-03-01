import { NextApiHandler } from "next";
import cookie from "cookie";
import { createProxyMiddleware } from "http-proxy-middleware";

const { BACKEND_URL } = process.env;

const apiProxy = createProxyMiddleware({
  target: BACKEND_URL,
  changeOrigin: true,
  pathRewrite: { "^/api/": "" },
  onProxyReq: (proxyReq, req, res) => {
    const cookieHeader = proxyReq.getHeader("cookie") as string;
    const parsedCookies = cookie.parse(cookieHeader || "");
    proxyReq.setHeader(
      "authorization",
      parsedCookies["auth.access_token"] || null
    );

    const { body } = req as any;
    if (body) {
      const bodyData = JSON.stringify(body);
      proxyReq.setHeader("Content-Type", "application/json");
      proxyReq.setHeader("Content-Length", Buffer.byteLength(bodyData));
      proxyReq.write(bodyData);
    }
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
