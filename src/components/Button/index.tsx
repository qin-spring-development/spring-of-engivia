import type { FC, ReactNode, MouseEventHandler } from "react";

export interface Props {
  isSubmitting: boolean;
  type: "button" | "submit" | "reset";
  onClick: MouseEventHandler<HTMLButtonElement>;
  primary: boolean;
  children?: ReactNode;
}

export const Button: FC<Props> = ({
  isSubmitting,
  type,
  onClick,
  primary,
  children,
}) => {
  return (
    <>
      <button
        disabled={isSubmitting}
        type={type}
        onClick={onClick}
        className={`py-2 px-4 mr-2 rounded-md
          ${
            primary
              ? "bg-light-blue-600 text-white"
              : "bg-light-blue-100 text-light-blue-700"
          } 
        `}
      >
        {children}
      </button>
    </>
  );
};
