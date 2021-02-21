import { FC } from "react";

type TooltipProps = { text: string; visible: boolean };

const Tooltip: FC<TooltipProps> = ({ children, text, visible }) => {
  return (
    <div className="">
      <div className="">{children}</div>
      {visible && (
        <div className="enter-top absolute bg-gray-800 text-sm tracking-widee text-white p-4 rounded-lg shadow-lg w-52">
          {text}
        </div>
      )}
    </div>
  );
};

export default Tooltip;
