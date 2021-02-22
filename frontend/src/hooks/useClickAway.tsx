import { useEffect } from "react";

function useClickAway<T extends HTMLElement>(
  ref: React.MutableRefObject<T> | React.MutableRefObject<T>[],
  onClick: () => void,
  visible: boolean
) {
  useEffect(() => {
    function handleClose(e: MouseEvent) {
      if (Array.isArray(ref)) {
        const index = ref.findIndex((el) => {
          if (el.current && el.current.contains(e.target as any)) {
            return true;
          }
          return false;
        });

        if (index !== -1) {
          return;
        }
      } else {
        if (ref.current && ref.current.contains(e.target as any)) {
          return;
        }
      }

      onClick();
    }

    if (visible) {
      document.addEventListener("mousedown", handleClose, false);

      return () => {
        document.removeEventListener("mousedown", handleClose, false);
      };
    }
  }, [visible]);
}

export default useClickAway;
