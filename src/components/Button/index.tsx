import type { FC, ReactNode, MouseEventHandler } from "react";

export type Props = {
  isSubmitting: boolean;
  type: "button" | "submit" | "reset";
  onClick?: MouseEventHandler<HTMLButtonElement>;
  isPrimary: boolean;
  className?: string;
  children: ReactNode;
};

export const Button: FC<Props> = ({
  isSubmitting,
  type,
  onClick,
  isPrimary,
  className,
  children,
}) => {
  return (
    <button
      disabled={isSubmitting}
      type={type}
      onClick={onClick}
      className={`py-3 px-6 mr-2 rounded-md ${className}
          ${
            isPrimary
              ? "bg-light-blue-600 text-white hover:bg-light-blue-500"
              : "bg-light-blue-100 text-light-blue-700 hover:bg-light-blue-200 "
          } 
        `}
    >
      {children}
    </button>
  );
};
