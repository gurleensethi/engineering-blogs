import { FC } from "react";

type Props = { size?: number };

const Loading: FC<Props> = ({ size }) => {
  const loadingSize = size || 3;
  const boundarySize = loadingSize + 1;

  return (
    <div
      className={`animate-spin w-${boundarySize} h-${boundarySize} border-gray-500 border-2 flex justify-center items-center
      dark:border-white`}
      style={{ background: "transparent" }}
    ></div>
  );
};

export default Loading;
