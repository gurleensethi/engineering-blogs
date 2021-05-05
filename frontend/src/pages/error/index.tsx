import { FC } from "react";

export interface ErrorPageProps {}

const ErrorPage: FC = () => {
  return (
    <div className="flex flex-col justify-center items-center h-80">
      <h1 className="text-2xl mb-2 dark:text-white">
        OOPS Some Error Occurred!
      </h1>
      <p className="text-lg dark:text-white">Don't worry we are on it!</p>
    </div>
  );
};

export default ErrorPage;
