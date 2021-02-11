import axios from "axios";
import { NextApiRequest, NextApiResponse } from "next";

const { BACKEND_URL } = process.env;

export default async function Proxy(req: NextApiRequest, res: NextApiResponse) {
  const { method, url, headers, body } = req;

  console.log(method, url);

  const { data, headers: responseHeaders, status } = await axios({
    method: method as any,
    url: `${BACKEND_URL}/${url.substring(12)}`,
    headers,
    data: body,
  });

  res.writeHead(status, responseHeaders);
  res.end(JSON.stringify(data));
}
