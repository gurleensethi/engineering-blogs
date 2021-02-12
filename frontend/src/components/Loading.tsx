import { FC } from "react";

const Loading: FC = () => {
  return (
    <div className="animate-spin w-4 h-4 bg-gray-500 flex justify-center items-center">
      <div className="w-3 h-3 bg-white" />
    </div>
  );
};

export default Loading;
