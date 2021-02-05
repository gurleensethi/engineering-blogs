import Link from "next/link";
import { useRouter } from "next/router";
import TopBarLink from "./TopBarLink";

export default function TopBar() {
  const router = useRouter();

  return (
    <div className="bg-white p-4 w-screen shadow-sm flex">
      <div className="text-xl text-gray-700 flex-1">Engineering Blogs</div>
      <div className="flex">
        <TopBarLink
          href="/"
          isActive={router.pathname === "/"}
          title="Posts"
          className="mr-8"
        />
        <TopBarLink
          href="/publications"
          isActive={router.pathname === "/publications"}
          title="Publications"
        />
      </div>
    </div>
  );
}
