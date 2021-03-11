import { FC, useEffect } from "react";
import { BaseDialog } from "./BaseDialog";

type Props = { isOpen: boolean; onClose: () => void };

const SimpleDialog: FC<Props> = ({ isOpen, children, onClose }) => {
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
      <div className="h-full overflow-scroll dark:text-white">{children}</div>
    </BaseDialog>
  );
};

export default SimpleDialog;
