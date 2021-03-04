import Link from "next/link";
import { useRouter } from "next/router";
import React, { useContext, useRef } from "react";
import { UserContext } from "../../context/UserProvider";
import useBreakpoint from "../../hooks/useBreakpoint";
import TopBarLink from "./TopBarLink";
import Image from "next/image";
import { DarkModeContext } from "../../context/DarkMode";
import ThemeToggleButton from "../buttons/ThemeToggleButton";
import useClickAway from "../../hooks/useClickAway";
import Loading from "../Loading";

export default function TopBar() {
  const router = useRouter();
  const [isDropDownOpen, setDropDownOpen] = React.useState(false);
  const menuRef = useRef<HTMLDivElement | null>(null);
  const menuButtonRef = useRef<HTMLButtonElement | null>(null);
  const userContext = useContext(UserContext);
  const darkMode = useContext(DarkModeContext);

  const toggleDropDown = () => {
    setDropDownOpen((value) => !value);
  };

  useClickAway<HTMLElement>(
    [menuRef, menuButtonRef],
    () => setDropDownOpen(false),
    isDropDownOpen
  );

  const isSmall = useBreakpoint("sm");

  return (
    <div className="bg-white dark:bg-black p-4 w-screen shadow-sm flex items-center">
      <div className="flex-1">
        <Link href="/">
          <a className="text-xl text-gray-700 dark:text-white flex items-center">
            <img
              height={24}
              width={24}
              src={
                darkMode.isEnabled
                  ? "/images/logo-white.png"
                  : "/images/logo.png"
              }
              className="mr-4"
            />
            Engineering Blogs
          </a>
        </Link>
      </div>
      <ThemeToggleButton
        darkModeEnabled={darkMode.isEnabled}
        onClick={() => darkMode.toggle()}
        className="mr-8"
      />
      <div>
        <button
          onClick={toggleDropDown}
          className="outline-none focus:outline-none sm:hidden"
          ref={menuButtonRef}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            className={`text-gray-500 dark:text-gray-100 h-6 w-6 transform transition ${
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
        </button>
        {(isDropDownOpen || isSmall) && (
          <div
            ref={menuRef}
            className="enter-top bg-white dark:bg-black absolute left-0 right-0 top-full m-2 rounded-md p-4 shadow-lg 
            sm:flex sm:items-center sm:relative sm:left-auto sm:top-auto sm:right-auto sm:shadow-none sm:m-0 sm:p-0"
          >
            <TopBarLink
              href="/"
              isActive={router.pathname === "/"}
              title="Posts"
              className="m-2 mb-6 block sm:m-0 sm:mr-8"
              onClick={() => setDropDownOpen(false)}
            />
            <TopBarLink
              href="/publications"
              isActive={router.pathname === "/publications"}
              title="Publications"
              className="m-2 mb-6 block sm:m-0 sm:mr-8"
              onClick={() => setDropDownOpen(false)}
            />
            <TopBarLink
              href="/about"
              isActive={router.pathname === "/about"}
              title="About"
              className="m-2 mb-6 block sm:m-0 sm:mr-8"
              onClick={() => setDropDownOpen(false)}
            />
            {userContext.isLoading ? (
              <Loading />
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
                  height={18}
                  width={18}
                  className="opacity-80"
                />
                <div className="ml-2 text-base text-gray-500 dark:text-gray-100">
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
