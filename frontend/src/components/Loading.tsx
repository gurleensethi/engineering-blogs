import { FC } from "react";

type Props = { size?: number };

const Loading: FC<Props> = ({ size }) => {
  const loadingSize = size || 3;
  const boundarySize = loadingSize + 1;

  return (
    <div
      className={`animate-spin w-${boundarySize} h-${boundarySize} bg-gray-500 flex justify-center items-center`}
    >
      <div className={`w-${loadingSize} h-${loadingSize} bg-white`} />
    </div>
  );
};

export default Loading;
