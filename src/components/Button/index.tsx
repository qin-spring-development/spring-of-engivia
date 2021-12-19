import type { FC, ReactNode, ComponentProps } from "react";

export type Props = {
  isPrimary: boolean;
  className?: string;
  children: ReactNode;
} & ComponentProps<"button">;

export const Button: FC<Props> = ({
  isPrimary,
  className,
  children,
  ...rest
}) => {
  return (
    <button
      type="button"
      {...rest}
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
