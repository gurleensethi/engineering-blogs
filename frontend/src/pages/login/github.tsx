import { GetServerSideProps } from "next";
import { FC } from "react";

const GithubLogin: FC = () => {
  return <div></div>;
};

export const getServerSideProps: GetServerSideProps = async ({ res }) => {
  res.setHeader("Set-Cookie", "test=test");

  return {
    redirect: {
      destination: "/",
      permanent: true,
    },
  };
};

export default GithubLogin;
