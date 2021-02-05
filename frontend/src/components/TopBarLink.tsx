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
        className={`text-gray-500 ${
          isActive ? "underline" : "opacity-50"
        } cursor-pointer ${className}`}
        {...rest}
      >
        {title}
      </a>
    </Link>
  );
};

export default TopBarLink;
