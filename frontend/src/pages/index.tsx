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
import SimpleDialog from "../components/dialog/SimpleDialog";
import PublicationsEditor from "../components/compound/PublicationsEditor";

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

const Index: React.FC<Props> = ({
  posts,
  pageNumber,
  hasNextPage,
  search,
  feed,
}) => {
  const [postFeed, setPostFeed] = useState(feed);
  const [isFeedDialogOpen, setFeedDialogOpen] = useState(false);
  const [searchText, setSearchText] = useState(search || "");
  const [showLoginTooltip, setShowLoginTooltip] = useState(false);
  const [arePublicationsEdited, setPublicationsEdited] = useState(false);
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

  const handleOpenFeedDialog = () => {
    setPublicationsEdited(false);
    setFeedDialogOpen(true);
  };

  const handlePublicationEditorClose = () => {
    setFeedDialogOpen(false);
    if (arePublicationsEdited) {
      router.replace({ href: "/", query: { ...router.query } });
    }
  };

  return (
    <Layout
      title="Posts | Engineering Blogs"
      description="Blogs from the best software engineering blogs around the world."
      className="flex flex-col items-center sm:max-w-screen-lg m-auto h-full w-full"
    >
      <Search
        text={searchText}
        onTextChange={handleSearchChange}
        onTextReset={onSearchReset}
      />
      <MultiSwitch
        className="my-4 text-lg"
        selectedId={postFeed}
        onOptionSelect={handleFeedSelect}
      >
        <MultiSwitchItem id="all" name="All" />
        <Tooltip
          visible={showLoginTooltip}
          text="Please login to access My Feed. Click on 'Login with GitHub' in the menu."
          onClose={() => setShowLoginTooltip(false)}
        >
          <div className="flex items-center">
            <MultiSwitchItem id="my_feed" name="My Feed" />
            {postFeed === FeedType.MY_FEED && (
              <button
                className="text-blue-500 hover:text-blue-700 dark:text-blue-300 dark:hover:text-blue-500 cursor-pointer outline-none focus:outline-none"
                onClick={handleOpenFeedDialog}
              >
                (customize)
              </button>
            )}
          </div>
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
      {!posts.length && postFeed === FeedType.MY_FEED && (
        <div className="flex flex-col items-center h-full w-full mt-8">
          <div className="text-6xl">&#128558;</div>
          <div className="text-xl text-gray-500 mt-4 dark:text-gray-200">
            Your feed is empty
          </div>
          <button className="btn mt-16" onClick={handleOpenFeedDialog}>
            Customize Feed
          </button>
        </div>
      )}
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
      <SimpleDialog
        isOpen={isFeedDialogOpen}
        onClose={() => handlePublicationEditorClose()}
      >
        <PublicationsEditor
          onPublicationsModified={() => setPublicationsEdited(true)}
        />
      </SimpleDialog>
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
