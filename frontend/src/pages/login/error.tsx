import Link from "next/link";
import { FC } from "react";

const LoginError: FC = () => {
  return (
    <div className="w-screen h-full flex flex-col justify-center items-center p-4">
      <h1 className="text-2xl">Error in Login :(</h1>
      <p className="text-md mt-2 text-gray-500">
        Don't worry we are working on it!
      </p>
      <Link href="/">
        <a className="mt-8 bg-gray-700 px-4 py-2 rounded-lg cursor-pointer text-white hover:shadow-md hover:bg-gray-900">
          Go Home
        </a>
      </Link>
    </div>
  );
};

export default LoginError;
