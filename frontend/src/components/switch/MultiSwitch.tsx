import { createContext, FC, useContext, useState } from "react";

export interface Option {
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
      <div className={`${className} flex w-full sm:justify-end`} {...rest}>
        {children}
      </div>
    </MultiSwitchContext.Provider>
  );
};

export const MultiSwitchItem: FC<Option> = ({ id, name }) => {
  const { selectedOption, setSelectedOption } = useContext(MultiSwitchContext);
  const isOptionSelected = selectedOption === id;

  return (
    <div
      key={id}
      className="flex-col justify-center items-center cursor-pointer px-4 py-2"
      onClick={() => setSelectedOption(id)}
    >
      <div
        className={`transition ${
          isOptionSelected ? "text-gray-700" : "text-gray-400"
        }`}
      >
        {name}
      </div>
      {isOptionSelected && <div className="h-0.5 bg-gray-700 w-full fade-in" />}
    </div>
  );
};

export default MultiSwitch;
