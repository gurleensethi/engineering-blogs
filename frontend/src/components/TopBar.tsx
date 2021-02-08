import Link from "next/link";
import { useRouter } from "next/router";
import React from "react";
import useBreakpoint from "../hooks/useBreakpoint";
import TopBarLink from "./TopBarLink";

export default function TopBar() {
  const router = useRouter();
  const [isDropDownOpen, setDropDownOpen] = React.useState(false);

  const toggleDropDown = () => {
    setDropDownOpen((value) => !value);
  };

  const isSmall = useBreakpoint("sm");

  return (
    <div className="bg-white p-4 w-screen shadow-sm flex items-center">
      <div className="flex-1">
        <Link href="/">
          <a className="text-lg text-gray-700 ">Engineering Blogs</a>
        </Link>
      </div>
      <div>
        <div onClick={toggleDropDown} className="sm:hidden">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            className={`text-gray-500 w-5 transform transition ${
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
          <div className="absolute bg-white left-0 right-0 top-full m-2 rounded-md p-2 shadow-lg sm:flex sm:relative sm:left-auto sm:top-auto sm:right-auto sm:shadow-none sm:m-0 sm:p-0">
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
              className="m-2 block sm:m-0"
              onClick={() => setDropDownOpen(false)}
            />
          </div>
        )}
      </div>
    </div>
  );
}
