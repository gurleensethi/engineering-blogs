import { FC, useEffect, useRef } from "react";
import useClickAway from "../../hooks/useClickAway";

type TooltipProps = {
  visible: boolean;
  onClose?: () => void;
  text?: string;
  render?: () => React.ReactNode;
};

const Tooltip: FC<TooltipProps> = ({
  children,
  visible,
  onClose,
  text,
  render,
}) => {
  const divRef = useRef<HTMLDivElement | null>(null);

  useClickAway(divRef, () => onClose(), visible);

  return (
    <div ref={divRef}>
      <div>{children}</div>
      {visible && text && (
        <div className="z-10 enter-top absolute bg-gray-800 text-sm tracking-widee text-white p-4 rounded-lg shadow-lg w-52">
          {text}
        </div>
      )}
      {visible && render && (
        <div className="enter-top absolute bg-gray-800 text-sm tracking-widee text-white p-4 rounded-lg shadow-lg w-52">
          {render()}
        </div>
      )}
    </div>
  );
};

export default Tooltip;
