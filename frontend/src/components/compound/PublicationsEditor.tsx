import { FC } from "react";
import useDataFetch from "../../hooks/useDataFetch";
import { Publication } from "../../types";
import Loading from "../Loading";

const PublicationsEditor: FC = () => {
  const userPub = useDataFetch<Publication[]>(() =>
    fetch("/api/users/publications")
  );

  const allPubs = useDataFetch<Publication[]>(() => fetch("/api/publications"));

  const handleRetry = () => {
    userPub.retry();
    allPubs.retry();
  };

  if (userPub.isLoading || allPubs.isLoading) {
    return (
      <div className="flex justify-center items-center h-full w-full">
        <Loading size={3} />
        <p className="ml-4 text-gray-700 text-xl">Bringing publications...</p>
      </div>
    );
  }

  if (userPub.error || allPubs.error) {
    return (
      <div className="flex flex-col justify-center items-center h-full w-full">
        <p className="text-xl">
          Unable to fetch publications, please try again!
        </p>
        <button className="btn mt-8" onClick={handleRetry}>
          Try Again
        </button>
      </div>
    );
  }

  return (
    <div className="overflow-auto">
      <div className="underline text-gray-700 text-md tracking-wider mb-4">
        My Feed
      </div>
      {userPub?.data?.length === 0 && (
        <div className="text-gray-500">You have selected no publications.</div>
      )}
      <div>
        {userPub?.data?.map((item) => (
          <div key={item.id}>{item.name}</div>
        ))}
      </div>
      <div className="underline text-gray-700 text-md tracking-wider my-4">
        All Publications
      </div>
      <div>
        {allPubs?.data?.map((item) => (
          <div className="mt-10" key={item.id}>
            {item.name}
          </div>
        ))}
      </div>
    </div>
  );
};

export default PublicationsEditor;
