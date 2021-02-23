import { GetServerSideProps } from "next";
import React, { useContext, useState } from "react";
import { getAllPosts, getMyFeedPost } from "../api-client/posts";
import { FeedType, Post } from "../types";
import Link from "next/link";
import { useRouter } from "next/router";
import Search from "../components/Search";
import useDebounce from "../hooks/useDebounce";
import Layout from "../components/Layout";
import MultiSwitch, { MultiSwitchItem } from "../components/switch/MultiSwitch";
import Tooltip from "../components/tooltip/Tooltip";
import { UserContext } from "../context/UserProvider";
import PostItem from "../components/PostItem";
import usePropChanged from "../hooks/usePropChanged";

type Props = {
  posts: Post[];
  hasNextPage: boolean;
  pageNumber: number;
  publicationIds: string;
  search: string;
  feed: string;
};
type Query = {
  page?: string;
  publicationIds?: string;
  search?: string;
  feed?: string;
};

const getPubIdsAsQuery = (ids?: string): string => {
  return !!ids ? `&publicationIds=${ids}` : "";
};

const Index: React.FC<Props> = ({
  posts,
  pageNumber,
  hasNextPage,
  search,
  feed,
}) => {
  const [postFeed, setPostFeed] = useState(feed);
  const [searchText, setSearchText] = useState(search || "");
  const [showLoginTooltip, setShowLoginTooltip] = useState(false);
  const router = useRouter();
  const [searchDebounce] = useDebounce(500);
  const user = useContext(UserContext);

  usePropChanged(postFeed, feed, setPostFeed);
  usePropChanged(searchText, search, setSearchText);

  const fetchPosts = (value: string) => {
    router.push({
      href: "/",
      query: { ...router.query, feed: FeedType.ALL, search: value },
    });
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
    if (id === FeedType.MY_FEED && !user.data) {
      setShowLoginTooltip(true);
      return;
    }

    setSearchText("");
    setPostFeed(id);
    router.push({ href: router.route, query: { feed: id } });
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
        selectedId={postFeed}
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
        {!posts.length && postFeed === FeedType.MY_FEED && (
          <div className="text-xl text-gray-500">
            Your feed is empty! &#128558;
          </div>
        )}
      </ul>
      <div className="p-6 flex w-full">
        {pageNumber > 0 && (
          <Link
            href={{
              href: router.route,
              query: { ...router.query, page: pageNumber - 1 },
            }}
          >
            <a className="outline-none text-blue-500">Prev</a>
          </Link>
        )}
        {hasNextPage && (
          <Link
            href={{
              href: router.route,
              query: { ...router.query, page: pageNumber + 1 },
            }}
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
  req,
}) => {
  const page: number = parseInt((query?.page as string) || "0");
  const publicationIds = query?.publicationIds as string;
  const search = query?.search as string;
  const feed = (query?.feed as string) || FeedType.ALL;

  if (
    page < 0 ||
    (!req.cookies["auth.access_token"] && feed === FeedType.MY_FEED)
  ) {
    return {
      redirect: {
        destination: "/",
        statusCode: 302,
      },
    };
  }

  const { data: posts, pageNumber, hasNextPage } =
    feed === FeedType.MY_FEED
      ? await getMyFeedPost({
          page,
          authToken: req.cookies["auth.access_token"],
        })
      : await getAllPosts({ page, publicationIds, search });

  return {
    props: {
      posts,
      hasNextPage,
      pageNumber,
      publicationIds: publicationIds || "",
      search: search || "",
      feed,
    },
  };
};
