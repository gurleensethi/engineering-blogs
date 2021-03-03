import React, { FC } from "react";

type Props = {
  size?: number;
  progressColor?: string;
} & React.HTMLAttributes<HTMLDivElement>;

const Loading: FC<Props> = ({ size, progressColor, className, ...rest }) => {
  const boundarySize = ((!isNaN(size) && size) || 3) + 1;
  const borderColor = progressColor || "border-gray-500";

  return (
    <div
      className={`animate-spin w-${boundarySize} h-${boundarySize} ${borderColor} border-2 flex justify-center items-center
      dark:border-white ${className}`}
      style={{ background: "transparent" }}
      {...rest}
    ></div>
  );
};

export default Loading;
