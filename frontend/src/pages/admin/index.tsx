import { GetServerSideProps } from "next";
import { FC } from "react";
import { AUTH_COOKIE_KEY } from "../../common/constants";
import { Drawer } from "../../components/drawer/Drawer";
import Layout from "../../components/Layout";

const DRAWER_OPTIONS = [{ title: "Blog Submissions", id: "blog_submission" }];

const AdminPage: FC = () => {
  return (
    <Layout title="Admin | Engineering Blogs" className="p-0">
      <Drawer onOptionSelected={() => {}} options={DRAWER_OPTIONS}></Drawer>
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
