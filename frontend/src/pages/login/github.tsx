import { GetServerSideProps } from "next";
import { FC } from "react";
import { loginWithGitHub } from "../../api-client/login";

const GithubLogin: FC = () => {
  return <div></div>;
};

export const getServerSideProps: GetServerSideProps = async ({
  query,
  res,
}) => {
  if (!query.code) {
    return {
      redirect: {
        destination: "/",
        permanent: true,
      },
    };
  }

  const user = await loginWithGitHub(query.code as string);

  if (!user.success) {
    return {
      redirect: {
        destination: "/login/error",
        permanent: true,
      },
    };
  }

  const date = new Date(Date.now() + 2592000000);

  res.setHeader(
    "Set-Cookie",
    `auth.access_token=${
      user.data.accessToken
    }; Path=/; HttpOnly; SameSite=Lax; Expires=${date.toUTCString()}`
  );

  return {
    redirect: {
      destination: "/",
      permanent: true,
    },
  };
};

export default GithubLogin;
