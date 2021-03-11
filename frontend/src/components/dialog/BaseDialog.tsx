import { FC, useEffect } from "react";

type Props = { isOpen: boolean; onClose: () => void };

export const BaseDialog: FC<Props> = ({ isOpen, children, onClose }) => {
  useEffect(() => {
    if (isOpen) {
      document.body.style.position = "fixed";
    } else {
      document.body.style.position = "";
    }
  }, [isOpen]);

  if (!isOpen) {
    return null;
  }

  return (
    <div
      className="transition-opacity fixed bg-gray-700 bg-opacity-30 top-0 bottom-0 left-0 right-0 z-50 flex flex-col justify-center items-center"
      onClick={(e) => {
        e.preventDefault();
        e.stopPropagation();
        onClose();
      }}
    >
      <div
        className="zoom-in overflow-scroll fade-in flex flex-col bg-white dark:bg-gray-900 max-h-full p-4 sm:p-8 m-8 sm:m-16 md:m-24 lg:m-32 rounded-lg shadow-xl"
        onClick={(e) => {
          e.preventDefault();
          e.stopPropagation();
        }}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          className="h-6 ml-auto mb-2 text-gray-400 hover:text-gray-800 dark:hover:text-gray-100 transition cursor-pointer"
          onClick={() => onClose()}
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M6 18L18 6M6 6l12 12"
          />
        </svg>
        {children}
      </div>
    </div>
  );
};
