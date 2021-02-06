import { GetServerSideProps } from "next";
import Link from "next/link";
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
  const handleOpenBlogLink = (
    event: React.MouseEvent<HTMLParagraphElement>,
    url: string
  ) => {
    event.preventDefault();
    event.stopPropagation();
    window.open(url, "_blank");
  };

  return (
    <ul className="sm:flex sm:flex-wrap sm:justify-between sm:max-w-screen-lg sm:m-auto">
      {publications.map((publication) => {
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
