import Link from "next/link";
import React, { FC } from "react";
import Layout from "../components/Layout";

type AboutItemProps = {
  title: string | (() => React.ReactNode);
  description: string | (() => React.ReactNode);
  emoji: string;
};

const AboutItem: FC<AboutItemProps> = ({ title, description, emoji }) => {
  return (
    <div className="mb-10 p-2 flex items-start">
      <div className="text-4xl mr-4">{emoji}</div>
      <div>
        <h1 className="text-xl text-gray-700 dark:text-white font-medium mb-4">
          {typeof title === "function" ? title() : title}
        </h1>
        <p className="text-gray-500 dark:text-gray-200 text-lg">
          {typeof description === "function" ? description() : description}
        </p>
      </div>
    </div>
  );
};

const About: FC = () => {
  return (
    <Layout
      title="About | Engineering Blogs"
      className="sm:max-w-screen-md m-auto"
    >
      <h1 className="text-center mb-12 text-3xl dark:text-white">
        Engineering Blogs
      </h1>
      <AboutItem
        emoji="🤔"
        title="What is this website?"
        description={() => (
          <>
            An aggregation of the top engineering blogs around the world. View
            all the publications{" "}
            <Link href="/publications">
              <a className="text-blue-500 underline hover:text-blue-700">
                here
              </a>
            </Link>
            . More publications coming soon!
          </>
        )}
      />
      <AboutItem
        emoji="✍🏻"
        title="Do you write these blogs?"
        description={
          "No! These are just links from other blogs, click them and it takes you to the original blog."
        }
      />
      <AboutItem
        emoji="🤷‍♂️"
        title="Where are you getting this data from?"
        description={() => (
          <>
            RSS feeds, thanks to this GitHub repository:{" "}
            <a
              className="text-blue-500 underline hover:text-blue-700"
              href="https://github.com/kilimchoi/engineering-blogs"
              target="_blank"
              rel="noopener noreferrer"
            >
              kilimchoi/engineering-blogs
            </a>
          </>
        )}
      />
      <AboutItem
        emoji="🕵🏻‍♀"
        title="Do you own any of the data on the website?"
        description={"Absolutely not! Unless its my own blog :P"}
      />
      <AboutItem
        emoji="👨‍🔧"
        title="What is the technology stack used?"
        description={() => (
          <ul className="flex flex-wrap">
            <li className="mr-4 mb-4 bg-blue-500 text-white px-2 py-1 text-lg rounded-md shadow-md">
              Next.js
            </li>
            <li className="mr-4 mb-4 bg-blue-500 text-white px-2 py-1 text-lg rounded-md shadow-md">
              React
            </li>
            <li className="mr-4 mb-4 bg-blue-500 text-white px-2 py-1 text-lg rounded-md shadow-md">
              TailwindCSS
            </li>
            <li className="mr-4 mb-4 bg-blue-500 text-white px-2 py-1 text-lg rounded-md shadow-md">
              Nest.js
            </li>
            <li className="mr-4 mb-4 bg-blue-500 text-white px-2 py-1 text-lg rounded-md shadow-md">
              PostgreSQL
            </li>
            <li className="mr-4 mb-4 bg-blue-500 text-white px-2 py-1 text-lg rounded-md shadow-md">
              Prisma 2
            </li>
            <li className="mr-4 mb-4 bg-blue-500 text-white px-2 py-1 text-lg rounded-md shadow-md">
              Typescript
            </li>
          </ul>
        )}
      />
      <p className="mb-4 text-gray-400 dark:text-white text-lg text-center">
        have a great day!
      </p>
    </Layout>
  );
};

export default About;
