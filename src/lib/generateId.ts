import { customAlphabet } from "nanoid";

export const generateId = () => {
  const nanoid = customAlphabet(
    "1234567890abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ",
    22
  );
  return nanoid();
};
