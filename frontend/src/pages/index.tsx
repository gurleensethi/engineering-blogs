import { GetServerSideProps } from "next";
import React from "react";
import { getAllPosts } from "../api-client/posts";
import { Post } from "../types";
import Link from "next/link";
import { shortenText } from "../common/utils";
import { useRouter } from "next/router";
import { format } from "date-fns";

type Props = {
  posts: Post[];
  hasNextPage: boolean;
  pageNumber: number;
  publicationIds: string;
};
type Query = { page?: string; publicationIds?: string };

const getPubIdsAsQuery = (ids?: string): string => {
  return !!ids ? `&publicationIds=${ids}` : "";
};

const flairColors = [
  "text-red-500 bg-red-100",
  "text-blue-500 bg-blue-100",
  "text-green-500 bg-green-100",
  "text-teal-500 bg-teal-100",
  "text-orange-500 bg-orange-100",
  "text-indigo-500 bg-indigo-100",
  "text-violet-500 bg-violet-100",
];

export const getFlairColor = (id: string): string => {
  return flairColors[id.charCodeAt(0) % flairColors.length];
};

const Index: React.FC<Props> = ({
  posts,
  pageNumber,
  publicationIds,
  hasNextPage,
}) => {
  const router = useRouter();

  const handlePublicationClick = (id: string): void => {
    router.push(`/?publicationIds=${id}`);
  };

  return (
    <div className="h-screen px-8 py-8 flex flex-col items-center">
      <ul className="inline-flex flex-wrap justify-between w-full sm:w-10/12">
        {posts.map((item) => {
          const flairColor = getFlairColor(item.publicationId);

          return (
            <li
              className="ring-1 ring-gray-200 rounded-md mb-8 transition hover:shadow-xl cursor-pointer w-full sm:w-custom/48"
              key={item.guid}
            >
              <a
                className="h-full outline-none"
                href={item.link}
                target="_blank"
              >
                <div className="p-4 flex flex-col h-full">
                  <div className="flex w-full mb-2 align-middle">
                    <div
                      className={`${flairColor} font-semibold tracking-wide px-2 py-1 text-xs rounded`}
                      onClick={(event) => {
                        event.preventDefault();
                        event.stopPropagation();
                        handlePublicationClick(item.publicationId);
                      }}
                    >
                      {item.publication.name}
                    </div>
                    <div className="text-xs text-gray-500 flex-1 text-right">
                      {format(new Date(item.pubDate), "dd-MMM-yyyy")}
                    </div>
                  </div>
                  <div className="mb-2 text-lg text-gray-700 font-medium">
                    {item.title}
                  </div>
                  <div className="mb-2 text-sm text-gray-500">
                    {shortenText(item.description)}
                  </div>
                </div>
              </a>
            </li>
          );
        })}
      </ul>
      <div className="p-6 flex w-full">
        {pageNumber > 0 && (
          <Link
            href={`/?page=${pageNumber - 1}${getPubIdsAsQuery(publicationIds)}`}
          >
            <a className="text-blue-500">Prev</a>
          </Link>
        )}
        {hasNextPage && (
          <Link
            href={`/?page=${pageNumber + 1}${getPubIdsAsQuery(publicationIds)}`}
            scroll
          >
            <a className="text-blue-500 ml-auto">Next</a>
          </Link>
        )}
      </div>
    </div>
  );
};

export default Index;

export const getServerSideProps: GetServerSideProps<Props, Query> = async ({
  query,
}) => {
  let page: number = parseInt((query?.page as string) || "0");
  let publicationIds = query?.publicationIds as string;

  if (page < 0) {
    return {
      redirect: {
        destination: "/",
        permanent: true,
      },
    };
  }

  const { data: posts, pageNumber, hasNextPage } = await getAllPosts({
    page,
    publicationIds,
  });

  return {
    props: {
      posts,
      hasNextPage,
      pageNumber,
      publicationIds: publicationIds || "",
    },
  };
};
