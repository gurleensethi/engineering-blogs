import Head from "next/head";
import React, { FC } from "react";

type Props = React.HTMLAttributes<HTMLDivElement> & {
  title: string;
  description?: string;
};

const Layout: FC<Props> = ({ children, title, description, ...rest }) => {
  return (
    <div {...rest} className={`${rest.className || ""} fade-in relative`}>
      <Head>
        <title>{title}</title>
        <meta name="title" content={title} />
        <meta name="description" content={description} />
      </Head>
      {children}
    </div>
  );
};

export default Layout;
