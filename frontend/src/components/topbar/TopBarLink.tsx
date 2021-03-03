import Link from "next/link";
import React, { FC } from "react";

type Props = {
  title: string;
  href: string;
  isActive: boolean;
} & React.AnchorHTMLAttributes<HTMLAnchorElement>;

const TopBarLink: FC<Props> = ({
  title,
  href,
  isActive,
  className,
  ...rest
}) => {
  return (
    <Link href={href}>
      <a
        className={`text-gray-500 dark:text-white cursor-pointer outline-none text-xl sm:text-lg ${
          isActive ? "" : "opacity-50"
        } ${className}`}
        {...rest}
      >
        <div className="inline-block">
          {title}
          <div
            className={`transition h-0.5 bg-gray-500 dark:bg-white ${
              !isActive && "invisible"
            }`}
          />
        </div>
      </a>
    </Link>
  );
};

export default TopBarLink;
