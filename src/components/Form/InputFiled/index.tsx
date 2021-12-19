import type { FC, ComponentProps } from "react";
import { UseFormRegisterReturn } from "react-hook-form";

export type Props = {
  className?: string;
  value?: string;
  register: UseFormRegisterReturn;
} & ComponentProps<"input">;

export const InputFiled: FC<Props> = ({
  className,
  value,
  register,
  ...rest
}) => {
  return (
    <div className={className}>
      <input
        type="text"
        defaultValue={value}
        className="py-1 px-3 w-full text-base leading-8 text-gray-500 bg-white rounded-md border border-gray-300 focus:ring outline-none"
        {...rest}
        {...register}
      />
    </div>
  );
};
