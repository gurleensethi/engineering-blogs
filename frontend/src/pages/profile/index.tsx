import Link from "next/link";
import { useRouter } from "next/router";
import React, { FC, useContext, useState } from "react";
import { Accordian } from "../../components/accordian/Accordian";
import { SubmitPublicationForm } from "../../components/compound/SubmitPublicationForm";
import Layout from "../../components/Layout";
import Loading from "../../components/Loading";
import { UserContext } from "../../context/UserProvider";

const Profile: FC = () => {
  const router = useRouter();
  const user = useContext(UserContext);
  const [isSubmitPubAccordianOpen, setSubmitPubAccordianOpen] = useState(false);

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
    <Layout className="fade-in sm:max-w-screen-md mx-auto" title="Profile">
      <h1 className="tracking-widest text-gray-500 dark:text-gray-300">
        @{user.data.username}
      </h1>
      <h2 className="text-3xl text-gray-700 dark:text-gray-100">
        {user.data.firstName} {user.data.lastName}
      </h2>
      <p className="my-8 text-gray-700 dark:text-gray-300">
        Nothing much here really, lets go back{" "}
        <Link href="/">
          <a className="transition cursor-pointer text-blue-500 underline hover:text-blue-700">
            home
          </a>
        </Link>
        .
      </p>
      <a className="btn" href="/logout">
        Logout
      </a>
      <Accordian
        isOpen={isSubmitPubAccordianOpen}
        className="mt-16"
        header="Submit a blog"
        onToggle={() => setSubmitPubAccordianOpen((val) => !val)}
      >
        <SubmitPublicationForm />
      </Accordian>
    </Layout>
  );
};

export default Profile;
