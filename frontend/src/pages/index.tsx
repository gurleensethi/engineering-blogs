import { GetServerSideProps } from "next";
import React from "react";
import { getAllPosts } from "../api-client/posts";
import { Post } from "../types";
import Link from "next/link";

type Props = { posts: Post[]; hasNextPage: boolean; pageNumber: number };
type Query = { page?: string };

const Index: React.FC<Props> = ({ posts, pageNumber }) => {
  return (
    <div>
      <ul>
        {posts.map((item) => (
          <li key={item.guid}>{item.title}</li>
        ))}
      </ul>
      {pageNumber > 0 && (
        <Link href={`/?page=${pageNumber - 1}`}>
          <a>Prev</a>
        </Link>
      )}
      <Link href={`/?page=${pageNumber + 1}`}>
        <a>Next</a>
      </Link>
    </div>
  );
};

export default Index;

export const getServerSideProps: GetServerSideProps<Props, Query> = async ({
  query,
}) => {
  let page: number = parseInt((query?.page as string) || "0");

  if (page < 0) {
    return {
      redirect: {
        destination: "/?page=0",
        permanent: true,
      },
    };
  }

  const { data: posts, pageNumber, hasNextPage } = await getAllPosts(page);

  return {
    props: {
      posts,
      hasNextPage,
      pageNumber,
    },
  };
};
