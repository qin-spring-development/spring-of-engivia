import { hashSync } from "bcrypt";

export const toHash = (str: string) => {
  return hashSync(str, `\$2b\$05\$${process.env.SALT_VALUE}` as string);
};
