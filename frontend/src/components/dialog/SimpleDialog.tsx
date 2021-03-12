import { FC, useEffect } from "react";
import { BaseDialog } from "./BaseDialog";

type Props = { isOpen: boolean; onClose: () => void };

const SimpleDialog: FC<Props> = ({ isOpen, children, onClose }) => {
  return (
    <BaseDialog isOpen={isOpen} onClose={onClose}>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
        className="h-6 ml-auto text-gray-400 hover:text-gray-800 dark:hover:text-gray-100 transition cursor-pointer"
        onClick={() => onClose()}
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M6 18L18 6M6 6l12 12"
        />
      </svg>
      <div className="h-full overflow-scroll dark:text-white">{children}</div>
    </BaseDialog>
  );
};

export default SimpleDialog;
