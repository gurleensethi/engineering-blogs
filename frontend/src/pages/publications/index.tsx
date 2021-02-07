import { GetServerSideProps } from "next";
import Link from "next/link";
import React from "react";
import { FC } from "react";
import { getAllPublications } from "../../api-client/publications";
import { Publication } from "../../types";

const flairColors = [
  "text-red-500 bg-red-100",
  "text-blue-500 bg-blue-100",
  "text-green-500 bg-green-100",
  "text-teal-500 bg-teal-100",
  "text-orange-500 bg-orange-100",
  "text-indigo-500 bg-indigo-100",
  "text-violet-500 bg-violet-100",
];

const getFlairColor = (id: string): string => {
  return flairColors[id.charCodeAt(0) % flairColors.length];
};

type ServerSideProps = { publications: Publication[] };

type Props = ServerSideProps;

const Publications: FC<Props> = ({ publications }) => {
  const [searchText, setSearchText] = React.useState("");

  const handleOpenBlogLink = (
    event: React.MouseEvent<HTMLParagraphElement>,
    url: string
  ) => {
    event.preventDefault();
    event.stopPropagation();
    window.open(url, "_blank");
  };

  const handleOnSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = event.target;
    setSearchText(value);
  };

  const resetSearch = () => {
    setSearchText("");
  };

  return (
    <div className="sm:max-w-screen-lg sm:m-auto">
      <div className="flex transition w-full rounded-md border border-gray-200 mb-8 p-2 focus-within:border-gray-400 focus-within:shadow">
        <input
          className="outline-none text-lg text-gray-500 flex-1"
          placeholder="Search"
          onChange={handleOnSearchChange}
          value={searchText}
        />
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          className="w-6 text-gray-200 hover:text-gray-400 cursor-pointer"
          onClick={resetSearch}
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z"
          />
        </svg>
      </div>
      <ul className="sm:flex sm:flex-wrap sm:justify-between">
        {publications
          .filter((publication) => {
            return (
              publication.name
                .toLowerCase()
                .indexOf(searchText.toLowerCase()) !== -1 ||
              publication.blogName
                .toLowerCase()
                .indexOf(searchText.toLowerCase()) !== -1 ||
              publication.description
                .toLowerCase()
                .indexOf(searchText.toLowerCase()) !== -1
            );
          })
          .map((publication) => {
            const flairColor = getFlairColor(publication.id);

            return (
              <li key={publication.id} className="mb-6 sm:w-custom/48">
                <Link href={`/?publicationIds=${publication.id}`}>
                  <a className="outline-none">
                    <div className="ring-1 ring-gray-200 rounded-md p-4 transition hover:shadow-xl cursor-pointer h-full">
                      <div className="flex items-center">
                        <div className="flex-1 mb-2">
                          <h3
                            className={`${flairColor} font-semibold tracking-wide px-2 py-1 text-xs rounded inline-block`}
                          >
                            {publication.name}
                          </h3>
                        </div>
                        <p
                          onClick={(event) =>
                            handleOpenBlogLink(event, publication.link)
                          }
                          className="text-xs text-blue-500 underline hover:text-blue-700"
                        >
                          Blog Link
                        </p>
                      </div>
                      <h2 className="mb-2">{publication.blogName}</h2>
                      <h2 className="text-gray-500 text-sm">
                        {publication.description}
                      </h2>
                    </div>
                  </a>
                </Link>
              </li>
            );
          })}
      </ul>
    </div>
  );
};

export default Publications;

export const getServerSideProps: GetServerSideProps<ServerSideProps> = async () => {
  const publications = await getAllPublications();

  return {
    props: {
      publications,
    },
  };
};
