import { FC } from "react";

type Props = {
  text: string;
  onTextChange: (text: string) => void;
  onTextReset: () => void;
} & React.HTMLAttributes<HTMLDivElement>;

const Search: FC<Props> = ({
  onTextChange,
  onTextReset,
  text,
  className,
  ...rest
}) => {
  return (
    <div
      className={`${className} flex items-center transition w-full rounded-md border border-gray-200 dark:border-gray-500 p-3 focus-within:border-gray-400 dark:focus-within:border-gray-200 focus-within:shadow`}
      {...rest}
    >
      <input
        className="outline-none text-xl sm:text-2xl text-gray-500 dark:text-white flex-1 dark:bg-gray-900"
        placeholder="Search"
        onChange={(event) => onTextChange(event.target.value)}
        value={text}
      />
      <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
        className="w-6 text-gray-200 dark:text-gray-500 hover:text-gray-500 dark:hover:text-gray-200 cursor-pointer"
        onClick={onTextReset}
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z"
        />
      </svg>
    </div>
  );
};

export default Search;
