import colors from "tailwindcss/colors";

export const shortenText = (text: string, length = 200): string => {
  const end = Math.min(length, text.length);
  let result = text.substring(0, end);
  if (text.length > end) result += "...";
  return result;
};

export const addPropertyIfExists = (obj: object, key: string, value: any) => {
  if (!!value) {
    obj[key] = value;
  }
};
