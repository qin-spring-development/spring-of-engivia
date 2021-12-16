import type { FC, ComponentProps } from "react";
import { UseFormRegisterReturn } from "react-hook-form";

export type Props = {
  className?: string;
  value?: string;
  register: UseFormRegisterReturn;
} & ComponentProps<"textarea">;

export const TextArea: FC<Props> = ({
  className,
  value,
  register,
  ...rest
}) => {
  return (
    <div>
      <textarea
        defaultValue={value}
        className={`py-2 px-3 w-full text-base leading-8 text-gray-500 border border-gray-300 bg-white rounded-md focus:ring outline-none ${className}`}
        {...rest}
        {...register}
      />
    </div>
  );
};
