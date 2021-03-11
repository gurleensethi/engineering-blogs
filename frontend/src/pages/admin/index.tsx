import { GetServerSideProps } from "next";
import { FC, useState } from "react";
import { AUTH_COOKIE_KEY } from "../../common/constants";
import { BlogSubmissionItem } from "../../components/BlogSubmissionItem";
import { Drawer } from "../../components/drawer/Drawer";
import Layout from "../../components/Layout";
import Loading from "../../components/Loading";
import useDataFetch from "../../hooks/useDataFetch";
import { BlogSubmission } from "../../types";

const DRAWER_OPTIONS = [{ title: "Blog Submissions", id: "blog_submission" }];

const AdminPage: FC = () => {
  const [sectionId, setSelectionId] = useState("blog_submission");
  const { data, error, isLoading, retry } = useDataFetch<BlogSubmission[]>(() =>
    fetch("/api/blog-submissions")
  );

  return (
    <Layout title="Admin | Engineering Blogs" className="p-0">
      <Drawer onOptionSelected={setSelectionId} options={DRAWER_OPTIONS}>
        {sectionId === "blog_submission" && (
          <div>
            {isLoading && (
              <div className="flex items-center">
                <Loading />
                <div className="m-2">Fetching blog submissions...</div>
              </div>
            )}
            {!isLoading && error && (
              <div className="mb-4">
                <div className="text-xl text-red-500">
                  Error loading blog submissions...
                </div>
                <button className="btn mt-4" onClick={retry}>
                  Retry
                </button>
              </div>
            )}
            {data &&
              data.map((item) => {
                return <BlogSubmissionItem key={item.id} submission={item} />;
              })}
          </div>
        )}
      </Drawer>
    </Layout>
  );
};

export default AdminPage;

export const getServerSideProps: GetServerSideProps = async ({ req, res }) => {
  if (!req.cookies[AUTH_COOKIE_KEY]) {
    return {
      notFound: true,
    };
  }

  return {
    props: {},
  };
};
