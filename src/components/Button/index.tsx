import { FC, ReactNode } from "react";

export interface Props {
  isSubmitting: boolean;
  type: "button" | "submit" | "reset";
  children?: ReactNode;
}

export const Button: FC<Props> = ({ isSubmitting, type, children }) => {
  return (
    <>
      <button disabled={isSubmitting} type={type}>
        {children}
      </button>
    </>
  );
};
