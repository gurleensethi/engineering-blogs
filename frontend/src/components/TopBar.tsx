import { useRouter } from "next/router";
import React from "react";
import useBreakpoint from "../hooks/useBreakpoint";
import TopBarLink from "./TopBarLink";

export default function TopBar() {
  const router = useRouter();
  const [isDropDownOpen, setDropDownOpen] = React.useState(true);

  const toggleDropDown = () => {
    setDropDownOpen((value) => !value);
  };

  const isSmall = useBreakpoint("sm");

  return (
    <div className="bg-white p-4 w-screen shadow-sm flex">
      <div className="text-xl text-gray-700 flex-1">Engineering Blogs</div>
      <div>
        <div onClick={toggleDropDown} className="sm:hidden">
          Options
        </div>
        {(isDropDownOpen || isSmall) && (
          <div className="absolute bg-white left-0 right-0 top-full m-2 rounded-md p-2 shadow-lg sm:flex sm:relative sm:left-auto sm:top-auto sm:right-auto sm:shadow-none sm:m-0 sm:p-0">
            <TopBarLink
              href="/"
              isActive={router.pathname === "/"}
              title="Posts"
              className="m-2 block sm:m-0 sm:mr-8"
            />
            <TopBarLink
              href="/publications"
              isActive={router.pathname === "/publications"}
              title="Publications"
              className="m-2 block sm:m-0"
            />
          </div>
        )}
      </div>
    </div>
  );
}
