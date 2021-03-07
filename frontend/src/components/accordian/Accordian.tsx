import { FC } from "react";
import { joinClassNames } from "../../utils/join-class-names";

export type AccordianProps = {
  isOpen: boolean;
  onToggle: () => void;
  header?: string | (() => React.ReactNode);
  duration?:
    | "duration-100"
    | "duration-150"
    | "duration-300"
    | "duration-500"
    | "duration-700"
    | "duration-1000";
} & React.HTMLAttributes<HTMLDivElement>;

export const Accordian: FC<AccordianProps> = ({
  isOpen,
  children,
  onToggle,
  header,
  className,
  duration,
  ...rest
}) => {
  return (
    <div
      className={joinClassNames(
        className,
        "shadow rounded-md overflow-hidden dark:bg-gray-800 dark:text-white"
      )}
      {...rest}
    >
      <div
        className="transition p-4 text-xl flex items-center cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-700"
        onClick={onToggle}
      >
        <div className="flex-1">{header}</div>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          className={joinClassNames(
            "h-5 transform transition",
            isOpen ? "-rotate-180" : "",
            duration || "duration-200"
          )}
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M19 9l-7 7-7-7"
          />
        </svg>
      </div>
      <div
        className={joinClassNames(
          "transition-all ease-linear overflow-hidden",
          isOpen ? "max-h-96" : "max-h-0",
          duration || "duration-200"
        )}
      >
        <div className="h-px bg-gray-100" />
        {children}
      </div>
    </div>
  );
};
