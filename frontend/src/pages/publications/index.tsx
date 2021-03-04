import { GetServerSideProps } from "next";
import React from "react";
import { FC } from "react";
import { getAllPublications } from "../../api-client/publications";
import Search from "../../components/Search";
import { Publication } from "../../types";

import Layout from "../../components/Layout";
import PublicationItem from "../../components/PublicationItem";

type ServerSideProps = { publications: Publication[] };

type Props = ServerSideProps;

const Publications: FC<Props> = ({ publications }) => {
  const [searchText, setSearchText] = React.useState("");

  const handleOnSearchChange = (value: string) => {
    setSearchText(value);
  };

  const resetSearch = () => {
    setSearchText("");
  };

  return (
    <Layout
      title="Publications | Engineering Blogs"
      className="sm:max-w-screen-md sm:m-auto"
    >
      <Search
        onTextChange={handleOnSearchChange}
        text={searchText}
        onTextReset={resetSearch}
        className="mb-8"
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
            return <PublicationItem publication={publication} />;
          })}
      </ul>
    </Layout>
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
