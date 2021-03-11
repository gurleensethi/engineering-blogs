import Head from "next/head";
import React, { FC } from "react";

type Props = React.HTMLAttributes<HTMLDivElement> & { title: string };

const Layout: FC<Props> = ({ children, title, ...rest }) => {
  return (
    <div {...rest} className={`${rest.className || ""} fade-in relative`}>
      <Head>
        <title>{title}</title>
      </Head>
      {children}
    </div>
  );
};

export default Layout;
