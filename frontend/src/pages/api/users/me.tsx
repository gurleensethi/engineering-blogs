import axios from "axios";
import { NextApiRequest, NextApiResponse } from "next";

const { BACKEND_URL } = process.env;

export default async function Proxy(req: NextApiRequest, res: NextApiResponse) {
  const { cookies } = req;

  const { data, headers: responseHeaders, status } = await axios
    .get(`${BACKEND_URL}/users/me`, {
      headers: { authorization: cookies["auth.access_token"] },
    })
    .catch((error) => error.response || { status: 500 });

  res.writeHead(status, responseHeaders);
  res.end(JSON.stringify(data));
}
