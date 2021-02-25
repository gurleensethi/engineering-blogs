import { NextApiHandler } from "next";
import httpProxy from "http-proxy";
import cookie from "cookie";

const proxy = httpProxy.createProxy({});

proxy.on("proxyReq", (req) => {
  req.path = req.path.replace("/api", "");
  const cookieHeader = req.getHeader("cookie") as string;
  const parsedCookies = cookie.parse(cookieHeader);
  req.setHeader("authorization", parsedCookies["auth.access_token"]);
});

const { BACKEND_URL } = process.env;

const publications: NextApiHandler = async (req, res) => {
  return proxy.web(req, res, { target: BACKEND_URL });
};

export default publications;

export const config = {
  api: {
    externalResolver: true,
  },
};
