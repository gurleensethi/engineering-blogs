import Head from "next/head";
import Link from "next/link";
import React, { FC } from "react";

const About: FC = () => {
  return (
    <div className="sm:max-w-screen-lg m-auto">
      <Head>
        <title>About | Engineering Blogs</title>
      </Head>
      <div className="mb-4 ring-1 ring-gray-200 rounded p-4">
        <h1 className="text-xl mb-2">🤔 What is this website?</h1>
        <p className="text-gray-700">
          An aggregation of the top engineering blogs around the world. View all
          the publications{" "}
          <Link href="/publications">
            <a className="text-blue-500 underline hover:text-blue-700">here</a>
          </Link>
          . More publications coming soon.
        </p>
      </div>
      <div className="mb-4 ring-1 ring-gray-200 rounded p-4">
        <h1 className="text-xl mb-2">✍🏻 Do you write these blogs?</h1>
        <p className="text-gray-700">
          No! These are just links from other blogs, click them and it takes you
          to the original blog.
        </p>
      </div>
      <div className="mb-4 ring-1 ring-gray-200 rounded p-4">
        <h1 className="text-xl mb-2">
          🤷‍♂️ Where are you getting this data from?
        </h1>
        <p className="text-gray-700">
          RSS feeds, thanks to this GitHub repository:{" "}
          <a
            className="text-blue-500 underline hover:text-blue-700"
            href="https://github.com/kilimchoi/engineering-blogs"
            target="_blank"
            rel="noopener noreferrer"
          >
            kilimchoi/engineering-blogs
          </a>
        </p>
      </div>
      <div className="mb-4 ring-1 ring-gray-200 rounded p-4">
        <h1 className="text-xl mb-2">
          🕵🏻‍♀ Do you own any of the data on the website?
        </h1>
        <p className="text-gray-700">
          Absolutely not! Unless its my own blog :P
        </p>
      </div>
      <div className="mb-4 ring-1 ring-gray-200 rounded p-4">
        <h1 className="text-xl mb-2">
          👨‍🔧 What is the main technology stack used?
        </h1>
        <ul className="list-disc pl-6 text-gray-700">
          <li>Next.js/React</li>
          <li>TailwindCSS</li>
          <li>Nest.js</li>
          <li>PostgreSQL</li>
          <li>Prisma 2</li>
          <li>Typescript</li>
        </ul>
      </div>
      <p className="mb-4 text-gray-400 text-lg text-center">
        have a great day!
      </p>
    </div>
  );
};

export default About;
