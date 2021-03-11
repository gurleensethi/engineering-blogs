import { FC, useEffect } from "react";
import { BaseDialog } from "./BaseDialog";

type Props = {
  isOpen: boolean;
  onClose: () => void;
  onCancel?: () => void;
  onDone?: () => void;
};

export const ConfirmationDialog: FC<Props> = ({
  isOpen,
  children,
  onClose,
  onCancel,
  onDone,
}) => {
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
    <BaseDialog isOpen={isOpen} onClose={onClose}>
      <div className="dark:text-white">
        <div className="text-xl mt-4 mb-8">{children}</div>
        <div className="flex justify-end">
          <button className="btn mr-4" onClick={onCancel}>
            Cancel
          </button>
          <button className="btn" onClick={onDone}>
            OK
          </button>
        </div>
      </div>
    </BaseDialog>
  );
};
