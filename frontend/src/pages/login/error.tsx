import Link from "next/link";
import { FC } from "react";

const LoginError: FC = () => {
  return (
    <div className="w-screen h-full flex flex-col justify-center items-center p-4">
      <h1 className="text-xl">Error in Login :(</h1>
      <Link href="/">
        <a className="mt-8 bg-gray-700 px-4 py-2 rounded-lg cursor-pointer text-white hover:shadow-md hover:bg-gray-900">
          Go Home
        </a>
      </Link>
    </div>
  );
};

export default LoginError;
