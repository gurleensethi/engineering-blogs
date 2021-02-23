import { GetServerSideProps } from "next";
import React, { useContext, useState } from "react";
import { getAllPosts } from "../api-client/posts";
import { Post } from "../types";
import Link from "next/link";
import { shortenText } from "../common/utils";
import { useRouter } from "next/router";

import Search from "../components/Search";
import useDebounce from "../hooks/useDebounce";
import { FlairColorsContext } from "../context/FlairColors";
import Layout from "../components/Layout";
import MultiSwitch, { MultiSwitchItem } from "../components/switch/MultiSwitch";
import Tooltip from "../components/tooltip/Tooltip";
import { UserContext } from "../context/UserProvider";
import PostItem from "../components/PostItem";

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
  const [showLoginTooltip, setShowLoginTooltip] = useState(false);
  const router = useRouter();
  const [searchDebounce] = useDebounce(500);
  const { getFlairColor } = useContext(FlairColorsContext);
  const user = useContext(UserContext);

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
    if (id === "my_feed" && !user.data) {
      setShowLoginTooltip(true);
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
        className="my-4"
        selectedId={feed}
        onOptionSelect={handleFeedSelect}
      >
        <MultiSwitchItem id="all" name="All" />
        <Tooltip
          visible={showLoginTooltip}
          text="Please login to access My Feed. Click on 'Login with GitHub' in the menu."
          onClose={() => setShowLoginTooltip(false)}
        >
          <MultiSwitchItem id="my_feed" name="My Feed" />
        </Tooltip>
      </MultiSwitch>
      <ul className="inline-flex flex-wrap justify-between">
        {posts.map((item) => {
          return (
            <PostItem
              post={item}
              onPublicationClick={handlePublicationClick}
              key={item.guid}
            />
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
