import { FC, useRef, useState } from "react";
import useClickAway from "../../hooks/useClickAway";
import { joinClassNames } from "../../utils/join-class-names";

type DrawerProps = {
  options: { title: string; id: string }[];
  onOptionSelected: (id: string) => void;
};

export const Drawer: FC<DrawerProps> = ({
  children,
  options,
  onOptionSelected,
}) => {
  const menuRef = useRef<HTMLDivElement | null>(null);
  const [isOpen, setOpen] = useState(false);
  const [optionId, setOptionId] = useState(() =>
    options[0] ? options[0].id : ""
  );

  const handleDrawerClick = () => {
    setOpen((val) => !val);
  };

  const handleOptionClick = (id: string) => {
    setOptionId(id);
    setOpen(false);
    onOptionSelected(id);
  };

  useClickAway(menuRef, () => setOpen(false), isOpen);

  return (
    <div>
      <div
        className="fixed bottom-4 sm:bottom-8 right-4 sm:right-8 flex flex-col items-end"
        ref={menuRef}
      >
        <div
          className={joinClassNames(
            "shadow-lg rounded-md m-2 w-60 sm:w-80 right-0 bg-white dark:bg-gray-700 dark:text-white overflow-hidden",
            isOpen ? "visible fade-in" : "invisible"
          )}
        >
          {options.map((item) => {
            return (
              <button
                key={item.id}
                className={joinClassNames(
                  "text-xl p-4 w-full border-b-2 last:border-b-0 outline-none focus:outline-none text-left",
                  item.id === optionId ? "bg-gray-800" : ""
                )}
                onClick={() => handleOptionClick(item.id)}
              >
                {item.title}
              </button>
            );
          })}
        </div>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          onClick={handleDrawerClick}
          className="h-12 text-white dark:text-white rounded-full bg-gray-700 dark:bg-gray-700 p-2 shadow-md"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M4 6h16M4 12h16M4 18h7"
          />
        </svg>
      </div>
      {children}
    </div>
  );
};
