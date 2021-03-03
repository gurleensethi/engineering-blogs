import React, { FC } from "react";

type Props = { size?: number } & React.HTMLAttributes<HTMLDivElement>;

const Loading: FC<Props> = ({ size, className, ...rest }) => {
  const loadingSize = size || 3;
  const boundarySize = loadingSize + 1;

  return (
    <div
      className={`animate-spin w-${boundarySize} h-${boundarySize} border-gray-500 border-2 flex justify-center items-center
      dark:border-white ${className}`}
      style={{ background: "transparent" }}
      {...rest}
    ></div>
  );
};

export default Loading;
