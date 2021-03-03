import React, { FC } from "react";

type Props = { onSubmit?: () => void } & React.HTMLAttributes<HTMLFormElement>;

export const SubmitPublicationForm: FC<Props> = ({ className }) => {
  const handleFormSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
  };

  return (
    <form
      onSubmit={handleFormSubmit}
      className={`${className} shadow-md rounded-md p-4 flex flex-col max-w-xl dark:ring-1 dark:ring-gray-700`}
    >
      <div className="text-gray-700 font-bold text-lg dark:text-white">
        Want a blog to be included? Submit a Feed Url
      </div>
      <div className="mb-6 text-gray-500 text-base dark:text-gray-200">
        (No spam please 💁‍♀️)
      </div>
      <input type="text" placeholder="Name" className="input" />
      <input type="text" placeholder="Feed Url" className="input" />
      <button className="btn mb-4" type="submit">
        Submit
      </button>
      <div className="text-gray-500 text-sm dark:text-gray-200">
        *You can only make 3 submissions per month
      </div>
    </form>
  );
};
