import React, { useEffect, useRef, useState } from "react";

type Props = { isLoading: boolean };

const Loading: React.FC<Props> = ({ isLoading }) => {
  const [width, setWidth] = useState(100);
  const loadingInterval = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    const loadProgress = () => {
      setWidth((w) => {
        return Math.min(w + 0.25, 90);
      });
    };

    if (isLoading) {
      loadingInterval.current = setInterval(loadProgress, 0);
    } else {
      setWidth(100);
      clearInterval(loadingInterval.current);
      setTimeout(() => setWidth(0), 300);
    }
  }, [isLoading]);

  return (
    <div className="fixed w-full">
      <div
        className={`bg-blue-500 rounded-r-xl opacity-0 transition ${
          isLoading ? "opacity-100" : ""
        }`}
        style={{ height: "2px", width: `${width}%` }}
      />
    </div>
  );
};

export default Loading;
