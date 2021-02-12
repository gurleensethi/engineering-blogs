import { GetServerSideProps } from "next";
import { FC } from "react";

const Logout: FC = () => {
  return null;
};

export default Logout;

export const getServerSideProps: GetServerSideProps = async ({ res }) => {
  res.setHeader(
    "Set-Cookie",
    `auth.access_token=""; Path=/; HttpOnly; SameSite=Lax; expires=Thu, 01 Jan 1970 00:00:00 GMT`
  );

  return {
    redirect: { destination: "/", statusCode: 302 },
  };
};
