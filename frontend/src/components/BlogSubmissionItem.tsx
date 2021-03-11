import { FC, useState } from "react";
import { BlogSubmission } from "../types";
import { BaseDialog } from "./dialog/BaseDialog";
import { ConfirmationDialog } from "./dialog/ConfirmationDialog";
import SimpleDialog from "./dialog/SimpleDialog";

type BlogSubmissionProps = { submission: BlogSubmission };

export const BlogSubmissionItem: FC<BlogSubmissionProps> = ({ submission }) => {
  const [isDialogOpen, setDialogOpen] = useState(false);

  return (
    <div
      key={submission.id}
      className="dark:bg-gray-700 dark:text-white shadow-md rounded-md mb-4 p-4"
    >
      <div className="font-bold text-xl tracking-wider">
        {submission.blogName}
      </div>
      <div>{submission.blogUrl}</div>
      <div>
        <button className="btn mt-4" onClick={() => setDialogOpen(true)}>
          Delete
        </button>
      </div>
      <ConfirmationDialog
        isOpen={isDialogOpen}
        onClose={() => setDialogOpen(false)}
      >
        Are you sure you want to delete this entry?
      </ConfirmationDialog>
    </div>
  );
};
