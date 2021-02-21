import { GetServerSideProps } from "next";
import React, { useContext, useState } from "react";
import { getAllPosts } from "../api-client/posts";
import { Post } from "../types";
import Link from "next/link";
import { shortenText } from "../common/utils";
import { useRouter } from "next/router";
import { format } from "date-fns";
import Search from "../components/Search";
import useDebounce from "../hooks/useDebounce";
import { FlairColorsContext } from "../context/FlairColors";
import Layout from "../components/Layout";
import MultiSwitch, { MultiSwitchItem } from "../components/switch/MultiSwitch";

type Props = {
  posts: Post[];
  hasNextPage: boolean;
  pageNumber: number;
  publicationIds: string;
  search: string;
};
type Query = { page?: string; publicationIds?: string; search?: string };

const getPubIdsAsQuery = (ids?: string): string => {
  return !!ids ? `&publicationIds=${ids}` : "";
};

const Index: React.FC<Props> = ({
  posts,
  pageNumber,
  publicationIds,
  hasNextPage,
  search,
}) => {
  const [feed, setFeed] = useState("all");
  const [searchText, setSearchText] = useState(search || "");
  const router = useRouter();
  const [searchDebounce] = useDebounce(500);
  const { getFlairColor } = useContext(FlairColorsContext);

  const fetchPosts = (value: string) => {
    router.push({ href: "/", query: { ...router.query, search: value } });
  };

  const handlePublicationClick = (id: string): void => {
    router.push(`/?publicationIds=${id}`);
  };

  const handleSearchChange = (value: string) => {
    setSearchText(value);
    searchDebounce(() => fetchPosts(value));
  };

  const onSearchReset = () => {
    setSearchText((value) => {
      if (value !== "") {
        fetchPosts("");
      }
      return "";
    });
  };

  const handleFeedSelect = (id: string) => {
    if (id === "my_feed") {
      return;
    }

    setFeed(id);
    router.push(
      router.route,
      { query: { ...router.query, feed: id } },
      { shallow: true }
    );
  };

  return (
    <Layout
      title="Posts | Engineering Blogs"
      className="flex flex-col items-center sm:max-w-screen-lg m-auto h-full w-full"
    >
      <Search
        text={searchText}
        onTextChange={handleSearchChange}
        onTextReset={onSearchReset}
      />
      <MultiSwitch
        className="my-2"
        selectedId={feed}
        onOptionSelect={handleFeedSelect}
      >
        <MultiSwitchItem id="all" name="All" />
        <MultiSwitchItem id="my_feed" name="My Feed" />
      </MultiSwitch>
      <ul className="inline-flex flex-wrap justify-between">
        {posts.map((item) => {
          const flairColor = getFlairColor(item.publicationId);

          return (
            <li
              className="ring-1 ring-gray-200 dark:ring-gray-500 rounded-md mb-8 transition hover:shadow-xl dark:hover:bg-gray-800 cursor-pointer w-full sm:w-custom/48"
              key={item.guid}
            >
              <a
                className="h-full outline-none"
                href={item.link}
                target="_blank"
                rel="noopener noreferrer"
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
                    <div className="text-xs text-gray-500 dark:text-gray-400 flex-1 text-right">
                      {format(new Date(item.pubDate), "dd-MMM-yyyy")}
                    </div>
                  </div>
                  <div className="mb-2 text-lg text-gray-700 dark:text-gray-100 font-medium">
                    {item.title}
                  </div>
                  <div className="mb-2 text-sm text-gray-500 dark:text-gray-400">
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
            <a className="outline-none text-blue-500">Prev</a>
          </Link>
        )}
        {hasNextPage && (
          <Link
            href={`/?page=${pageNumber + 1}${getPubIdsAsQuery(publicationIds)}`}
            scroll
          >
            <a className="outline-none text-blue-500 ml-auto">Next</a>
          </Link>
        )}
      </div>
    </Layout>
  );
};

export default Index;

export const getServerSideProps: GetServerSideProps<Props, Query> = async ({
  query,
}) => {
  let page: number = parseInt((query?.page as string) || "0");
  let publicationIds = query?.publicationIds as string;
  const search = query?.search as string;

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
    search,
  });

  return {
    props: {
      posts,
      hasNextPage,
      pageNumber,
      publicationIds: publicationIds || "",
      search: search || "",
    },
  };
};
