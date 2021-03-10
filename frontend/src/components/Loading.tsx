import React, { FC } from "react";

type LoadingSize = "small" | "normal" | "large";

type Props = {
  size?: LoadingSize;
  progressColor?: string;
} & React.HTMLAttributes<HTMLDivElement>;

const loadingSizes: { [key: string]: string } = {
  small: "w-3 h-3",
  normal: "w-4 h-4",
  large: "w-5 h-5",
};

const Loading: FC<Props> = ({ size, progressColor, className, ...rest }) => {
  const loadingSize: LoadingSize = size || "normal";
  const borderColor = progressColor || "border-gray-500";

  return (
    <div
      className={`animate-spin ${loadingSizes[loadingSize]} ${loadingSizes[loadingSize]} ${borderColor} border-2 flex justify-center items-center
      dark:border-white ${className}`}
      style={{ background: "transparent" }}
      {...rest}
    ></div>
  );
};

export default Loading;
