import axios from "axios";
import { FC, useState } from "react";
import useDataFetch from "../../hooks/useDataFetch";
import { Publication } from "../../types";
import Loading from "../Loading";

type Props = { onPublicationsModified: () => void };

const PublicationsEditor: FC<Props> = ({ onPublicationsModified }) => {
  const [selectedPubIds, setSelectedPubIds] = useState<Set<string>>(new Set());

  const userPub = useDataFetch<Publication[]>(
    () => fetch("/api/users/publications"),
    {
      onSuccess: (data) =>
        setSelectedPubIds(new Set(data.map((item) => item.id))),
    }
  );

  const allPubs = useDataFetch<Publication[]>(() => fetch("/api/publications"));

  const handleRetry = () => {
    userPub.retry();
    allPubs.retry();
  };

  const handlePublicationClick = (publication: Publication) => {
    const isInMyFeed = selectedPubIds.has(publication.id);

    axios({
      url: "/api/users/publications",
      method: isInMyFeed ? "DELETE" : "PUT",
      data: { publicationId: publication.id },
    })
      .then((response) => {
        onPublicationsModified();

        if (isInMyFeed) {
          const newIds = [...selectedPubIds.values()].filter(
            (item) => item != publication.id
          );
          setSelectedPubIds(new Set(newIds));
        } else {
          setSelectedPubIds(
            new Set([...selectedPubIds.values(), publication.id])
          );
        }
      })
      .catch((err) => {});
  };

  if (userPub.isLoading || allPubs.isLoading) {
    return (
      <div className="flex justify-center items-center h-full w-full">
        <Loading size={4} />
        <p className="ml-4 text-gray-700 text-xl dark:text-white">
          Bringing publications...
        </p>
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
    <div className="overflow-auto pb-4">
      <div className="underline text-xl text-gray-700 text-md tracking-wider my-4 dark:text-white">
        All Publications
      </div>
      <div className="text-gray-400 dark:text-gray-300">
        (Click on a publication to add it in your feed)
      </div>
      <div>
        {allPubs?.data?.map((item) => {
          const isSelected = selectedPubIds.has(item.id);

          return (
            <div
              className={`transition flex items-center ring-1 rounded mt-4 mx-1 p-2 text-lg cursor-pointer ${
                isSelected
                  ? "bg-blue-500 text-white ring-blue-500"
                  : "text-gray-700 ring-gray-300 dark:text-gray-200"
              }`}
              key={item.id}
              onClick={() => handlePublicationClick(item)}
            >
              <div className="flex-grow">{item.name}</div>
              {isSelected && (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  className="h-6"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M5 13l4 4L19 7"
                  />
                </svg>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default PublicationsEditor;
