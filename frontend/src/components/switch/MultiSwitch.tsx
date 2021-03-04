import { createContext, FC, useContext, useState } from "react";

export interface MultiSwitchItemProps {
  id: string;
  name: string;
}

interface MultiSwitchContextData {
  selectedOption: string;
  setSelectedOption: (id: string) => void;
}

const MultiSwitchContext = createContext<MultiSwitchContextData>(null!);

type MultiSwitchProps = {
  selectedId: string;
  onOptionSelect: (id: string) => void;
} & React.HTMLAttributes<HTMLDivElement>;

const MultiSwitch: FC<MultiSwitchProps> = ({
  className,
  selectedId,
  onOptionSelect,
  children,
  ...rest
}) => {
  return (
    <MultiSwitchContext.Provider
      value={{
        selectedOption: selectedId,
        setSelectedOption: onOptionSelect,
      }}
    >
      <div className={`${className} flex w-full`} {...rest}>
        {children}
      </div>
    </MultiSwitchContext.Provider>
  );
};

export const MultiSwitchItem: FC<MultiSwitchItemProps> = ({ id, name }) => {
  const { selectedOption, setSelectedOption } = useContext(MultiSwitchContext);
  const isOptionSelected = selectedOption === id;

  return (
    <div
      key={id}
      className="flex-col justify-center items-center cursor-pointer py-2 pr-4"
      onClick={() => setSelectedOption(id)}
    >
      <div
        className={`transition ${
          isOptionSelected
            ? "text-gray-700 dark:text-gray-100"
            : "text-gray-400 dark:text-gray-400"
        }`}
      >
        {name}
      </div>
      {isOptionSelected && (
        <div className="h-0.5 bg-gray-700 dark:bg-gray-100 w-full fade-in" />
      )}
    </div>
  );
};

export default MultiSwitch;
