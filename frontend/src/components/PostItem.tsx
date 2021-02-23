import React, { useContext } from "react";
import { shortenText } from "../common/utils";
import { FlairColorsContext } from "../context/FlairColors";
import { Post } from "../types";
import { format } from "date-fns";

type Props = {
  post: Post;
  onPublicationClick: (id: string) => void;
} & React.HTMLAttributes<HTMLDivElement>;

const PostItem: React.FC<Props> = ({ post, onPublicationClick, ...rest }) => {
  const { getFlairColor } = useContext(FlairColorsContext);
  const flairColor = getFlairColor(post.publicationId);

  return (
    <div
      {...rest}
      className="ring-1 ring-gray-200 dark:ring-gray-500 rounded-md overflow-hidden mb-8 transition hover:shadow-xl dark:hover:bg-gray-800 cursor-pointer w-full sm:w-custom/48"
    >
      <a
        className="h-full outline-none"
        href={post.link}
        target="_blank"
        rel="noopener noreferrer"
      >
        <div>
          <img
            src={post.imageUrl || "/images/logo.png"}
            className="w-full h-40 object-cover"
            loading="lazy"
            onError={function (event) {
              const imgElement: HTMLImageElement = event.target as HTMLImageElement;
              imgElement.src = "/images/logo.png";
              imgElement.classList.remove("object-cover");
              imgElement.classList.add("object-contain");
              imgElement.classList.add("p-12");
            }}
          />
          <div className="p-4 flex flex-col h-full">
            <div className="flex w-full mb-2 align-middle">
              <div
                className={`${flairColor} font-semibold tracking-wide px-2 py-1 text-xs rounded`}
                onClick={(event) => {
                  event.preventDefault();
                  event.stopPropagation();
                  onPublicationClick(post.publicationId);
                }}
              >
                {post.publication.name}
              </div>
              <div className="text-xs text-gray-500 dark:text-gray-400 flex-1 text-right">
                {format(new Date(post.pubDate), "dd-MMM-yyyy")}
              </div>
            </div>
            <div className="mb-2 text-lg text-gray-700 dark:text-gray-100 font-medium">
              {post.title}
            </div>
            <div className="mb-2 text-sm text-gray-500 dark:text-gray-400">
              {shortenText(post.description)}
            </div>
          </div>
        </div>
      </a>
    </div>
  );
};

export default PostItem;
