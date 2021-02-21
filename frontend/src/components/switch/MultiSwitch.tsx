import { FC } from "react";

export interface Option {
  id: string;
  name: string;
}

type Props = {
  options: Option[];
  selectedId: string;
  onOptionSelect: (id: string) => void;
} & React.HTMLAttributes<HTMLDivElement>;

const MultiSwitch: FC<Props> = ({
  options,
  className,
  selectedId,
  onOptionSelect,
  ...rest
}) => {
  return (
    <div className={`${className} flex w-full sm:justify-end`} {...rest}>
      {options.map((item, index) => (
        <div
          key={item.id}
          className="flex items-center cursor-pointer"
          onClick={() => onOptionSelect(item.id)}
        >
          <div
            className={`transition p-2 text-lg ${
              selectedId === item.id ? "text-gray-700" : "text-gray-400"
            }`}
          >
            {item.name}
          </div>
          {index !== options.length - 1 && (
            <div className="h-4 bg-gray-300 mx-2" style={{ width: "1.5px" }} />
          )}
        </div>
      ))}
    </div>
  );
};

export default MultiSwitch;
