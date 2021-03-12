import { FC, useEffect } from "react";

type Props = { isOpen: boolean; onClose: () => void };

export const BaseDialog: FC<Props> = ({ isOpen, children, onClose }) => {
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
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
        className="zoom-in overflow-scroll fade-in flex flex-col bg-white dark:bg-gray-900 max-h-full p-4 sm:px-8 sm:py-8 m-8 sm:m-16 md:m-24 lg:m-32 rounded-lg shadow-xl"
        onClick={(e) => {
          e.preventDefault();
          e.stopPropagation();
        }}
      >
        <div className="mt-2">{children}</div>
      </div>
    </div>
  );
};
