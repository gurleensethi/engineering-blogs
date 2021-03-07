import Link from "next/link";
import React, { FC, useContext } from "react";
import { FlairColorsContext } from "../context/FlairColors";
import { Publication } from "../types";

type PublicationItemProps = { publication: Publication };

const PublicationItem: FC<PublicationItemProps> = ({ publication }) => {
  const { getFlairColor, getFlairColorDark } = useContext(FlairColorsContext);

  const handleOpenBlogLink = (
    event: React.MouseEvent<HTMLButtonElement>,
    url: string
  ) => {
    event.preventDefault();
    event.stopPropagation();
    window.open(url, "_blank");
  };

  const flairColor = getFlairColor(publication.id);
  const flairColorDark = getFlairColorDark(publication.id);

  return (
    <li
      key={publication.id}
      className="transition mb-8 dark:hover:bg-gray-800 w-full"
    >
      <Link href={`/?publicationIds=${publication.id}`}>
        <a className="outline-none mt-10">
          <div
            className={`group flex flex-col ring-1 ring-gray-200 rounded-md dark:ring-gray-500 transition cursor-pointer h-full overflow-hidden hover:bg-gray-100 dark:hover:bg-gray-700`}
          >
            <div className="flex flex-col flex-1 p-4 h-full">
              <div className="flex flex-col sm:flex-row items-center mb-2">
                <h2
                  className={`text-xl tracking-wider text-gray-600 font-semibold mr-auto dark:text-white mb-2 sm:mb-0`}
                >
                  {publication.blogName}
                </h2>
                <h3
                  className={`${flairColorDark} self-start font-semibold tracking-wide px-2 py-1 text-sm rounded inline-block`}
                >
                  {publication.name}
                </h3>
              </div>
              <h2 className="text-gray-500 dark:text-gray-300 text-base mb-2">
                {publication.description}
              </h2>
              <div className="flex items-center mt-auto">
                <button
                  onClick={(event) =>
                    handleOpenBlogLink(event, publication.link)
                  }
                  className="outline-none focus:outline-none transition mr-auto text-sm transform text-blue-500 hover:text-blue-700 hover:scale-110 dark:hover:text-blue-300"
                >
                  Blog Link
                </button>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  className="transition h-5 text-teal-500 transform group-hover:scale-150"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M14 5l7 7m0 0l-7 7m7-7H3"
                  />
                </svg>
              </div>
            </div>
          </div>
        </a>
      </Link>
    </li>
  );
};

export default PublicationItem;
