import { FC } from "react";
import { UseFormRegisterReturn } from "react-hook-form";

export type Props = {
  className?: string;
  type: string;
  value?: string;
  id?: string;
  min?: string;
  placeholder?: string;
  register: UseFormRegisterReturn;
};

export const InputFiled: FC<Props> = ({
  className,
  type = "text",
  value,
  id,
  min,
  placeholder,
  register,
}) => {
  return (
    <div className={className}>
      <input
        type={type}
        id={id}
        defaultValue={value}
        min={min}
        className="py-1 px-3 w-full text-base leading-8 text-gray-500 bg-white rounded-md border border-gray-300 focus:ring outline-none"
        placeholder={placeholder}
        {...register}
      />
    </div>
  );
};
