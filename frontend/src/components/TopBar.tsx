import Link from "next/link";
import { useRouter } from "next/router";
import React, { useContext } from "react";
import { UserContext } from "../context/UserProvider";
import useBreakpoint from "../hooks/useBreakpoint";
import TopBarLink from "./TopBarLink";
import Image from "next/image";
import { DarkModeContext } from "../context/DarkMode";

export default function TopBar() {
  const router = useRouter();
  const [isDropDownOpen, setDropDownOpen] = React.useState(false);
  const userContext = useContext(UserContext);
  const darkMode = useContext(DarkModeContext);

  const toggleDropDown = () => {
    setDropDownOpen((value) => !value);
  };

  const isSmall = useBreakpoint("sm");

  return (
    <div className="bg-white dark:bg-black p-4 w-screen shadow-sm flex items-center">
      <div className="flex-1">
        <Link href="/">
          <a className="text-lg text-gray-700 dark:text-white flex items-center">
            <img
              height={20}
              width={20}
              src={
                darkMode.isEnabled
                  ? "/images/logo-white.png"
                  : "/images/logo.png"
              }
              className="mr-2"
            />
            Engineering Blogs
          </a>
        </Link>
      </div>
      <button onClick={() => darkMode.toggle()}>
        {darkMode.isEnabled ? (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 20 20"
            fill="currentColor"
            className="h-6 mr-4 sm:mr-8 text-gray-100 fade-in"
            key="light"
          >
            <path
              fillRule="evenodd"
              d="M10 2a1 1 0 011 1v1a1 1 0 11-2 0V3a1 1 0 011-1zm4 8a4 4 0 11-8 0 4 4 0 018 0zm-.464 4.95l.707.707a1 1 0 001.414-1.414l-.707-.707a1 1 0 00-1.414 1.414zm2.12-10.607a1 1 0 010 1.414l-.706.707a1 1 0 11-1.414-1.414l.707-.707a1 1 0 011.414 0zM17 11a1 1 0 100-2h-1a1 1 0 100 2h1zm-7 4a1 1 0 011 1v1a1 1 0 11-2 0v-1a1 1 0 011-1zM5.05 6.464A1 1 0 106.465 5.05l-.708-.707a1 1 0 00-1.414 1.414l.707.707zm1.414 8.486l-.707.707a1 1 0 01-1.414-1.414l.707-.707a1 1 0 011.414 1.414zM4 11a1 1 0 100-2H3a1 1 0 000 2h1z"
              clipRule="evenodd"
            />
          </svg>
        ) : (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            className="h-6 mr-4 sm:mr-8 text-gray-500 fade-in"
            key="dark"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z"
            />
          </svg>
        )}
      </button>
      <div>
        <div onClick={toggleDropDown} className="sm:hidden">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            className={`text-gray-500 dark:text-gray-100 w-5 transform transition ${
              isDropDownOpen ? "rotate-90" : ""
            }`}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M4 6h16M4 12h16m-7 6h7"
            />
          </svg>
        </div>
        {(isDropDownOpen || isSmall) && (
          <div className="bg-white dark:bg-black absolute left-0 right-0 top-full m-2 rounded-md p-2 shadow-lg sm:flex sm:items-center sm:relative sm:left-auto sm:top-auto sm:right-auto sm:shadow-none sm:m-0 sm:p-0">
            <TopBarLink
              href="/"
              isActive={router.pathname === "/"}
              title="Posts"
              className="m-2 mb-4 block sm:m-0 sm:mr-8"
              onClick={() => setDropDownOpen(false)}
            />
            <TopBarLink
              href="/publications"
              isActive={router.pathname === "/publications"}
              title="Publications"
              className="m-2 mb-4 block sm:m-0 sm:mr-8"
              onClick={() => setDropDownOpen(false)}
            />
            <TopBarLink
              href="/about"
              isActive={router.pathname === "/about"}
              title="About"
              className="m-2 mb-4 block sm:m-0 sm:mr-8"
              onClick={() => setDropDownOpen(false)}
            />
            {userContext.isLoading ? (
              <div className="animate-spin w-4 h-4 bg-gray-500 flex justify-center items-center">
                <div className="w-3 h-3 bg-white" />
              </div>
            ) : userContext.data ? (
              <TopBarLink
                href="/profile"
                isActive={router.pathname === "/profile"}
                title="Profile"
                className="m-2 block sm:m-0"
                onClick={() => setDropDownOpen(false)}
              />
            ) : (
              <a
                href={`https://github.com/login/oauth/authorize?client_id=${process.env.NEXT_PUBLIC_GITHUB_CLIENT_ID}&scope=user,read:user&allow_signup=true`}
                className="outline-none transition flex justify-center items-center ring-1 ring-gray-500 rounded px-2 py-1 m-4 cursor-pointer sm:m-0 hover:bg-gray-100 dark:hover:bg-gray-700"
              >
                <Image
                  src={
                    darkMode.isEnabled
                      ? "/images/github-logo-white.png"
                      : "/images/github-logo.png"
                  }
                  alt="github logo"
                  height={15}
                  width={15}
                  className="opacity-80"
                />
                <div className="ml-2 text-sm text-gray-500 dark:text-gray-100">
                  Github Login
                </div>
              </a>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
