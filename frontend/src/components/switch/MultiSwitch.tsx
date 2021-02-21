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
          className="flex-col justify-center items-center cursor-pointer px-4 py-2"
          onClick={() => onOptionSelect(item.id)}
        >
          <div
            className={`transition ${
              selectedId === item.id ? "text-gray-700" : "text-gray-400"
            }`}
          >
            {item.name}
          </div>
          {selectedId === item.id && (
            <div className="h-0.5 bg-gray-700 w-full fade-in" />
          )}
        </div>
      ))}
    </div>
  );
};

export default MultiSwitch;
