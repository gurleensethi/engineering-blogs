const useDebounce = (callback: () => void, time: number) => {
  const ref = setTimeout(() => callback(), time);
  clearTimeout(ref);
};

export default useDebounce;
