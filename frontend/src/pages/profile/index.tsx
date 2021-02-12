import Link from "next/link";
import { useRouter } from "next/router";
import React, { FC, useContext } from "react";
import Loading from "../../components/Loading";
import { UserContext } from "../../context/UserProvider";

const Profile: FC = () => {
  const router = useRouter();
  const user = useContext(UserContext);

  if (user.isLoading) {
    return (
      <div className="flex justify-center items-center">
        <Loading />
        <div className="ml-4 text-gray-500">Loading, hang tight...</div>
      </div>
    );
  }

  if (!user.data) {
    router.replace("/");
    return null;
  }

  return (
    <div className="fade-in">
      <h1 className="tracking-wider text-gray-500">@{user.data.username}</h1>
      <h2 className="text-3xl text-gray-700">
        {user.data.firstName} {user.data.lastName}
      </h2>
      <p className="my-8 text-gray-700">
        Nothing much here really, lets go back{" "}
        <Link href="/">
          <a className="transition cursor-pointer text-blue-500 underline hover:text-blue-700">
            home
          </a>
        </Link>
        .
      </p>
      {/* <Link href="/logout"> */}
      <a className="btn" href="/logout">
        Logout
      </a>
      {/* </Link> */}
    </div>
  );
};

export default Profile;
