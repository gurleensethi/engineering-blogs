import { GetServerSideProps } from "next";
import Link from "next/link";
import React, { useContext } from "react";
import { FC } from "react";
import { getAllPublications } from "../../api-client/publications";
import Search from "../../components/Search";
import { Publication } from "../../types";
import Head from "next/head";
import { FlairColorsContext } from "../../context/FlairColors";

type ServerSideProps = { publications: Publication[] };

type Props = ServerSideProps;

const Publications: FC<Props> = ({ publications }) => {
  const [searchText, setSearchText] = React.useState("");
  const { getFlairColor } = useContext(FlairColorsContext);

  const handleOpenBlogLink = (
    event: React.MouseEvent<HTMLParagraphElement>,
    url: string
  ) => {
    event.preventDefault();
    event.stopPropagation();
    window.open(url, "_blank");
  };

  const handleOnSearchChange = (value: string) => {
    setSearchText(value);
  };

  const resetSearch = () => {
    setSearchText("");
  };

  return (
    <div className="sm:max-w-screen-lg sm:m-auto">
      <Head>
        <title>Publications | Engineering Blogs</title>
      </Head>
      <Search
        onTextChange={handleOnSearchChange}
        text={searchText}
        onTextReset={resetSearch}
      />
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
              <li
                key={publication.id}
                className="transition mb-6 sm:w-custom/48 dark:hover:bg-gray-800"
              >
                <Link href={`/?publicationIds=${publication.id}`}>
                  <a className="outline-none">
                    <div className="ring-1 ring-gray-200 dark:ring-gray-500 rounded-md p-4 transition hover:shadow-xl cursor-pointer h-full">
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
                          className="text-sm text-blue-500 underline hover:text-blue-700 dark:text-gray-100 dark:hover:text-gray-500"
                        >
                          Blog Link
                        </p>
                      </div>
                      <h2 className="mb-2 text-gray-700 dark:text-gray-100">
                        {publication.blogName}
                      </h2>
                      <h2 className="text-gray-500 dark:text-gray-400 text-sm">
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
