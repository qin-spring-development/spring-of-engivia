import { FC } from "react";
import { UseFormRegisterReturn } from "react-hook-form";

export type Props = {
  className?: string;
  value?: string;
  id?: string;
  placeholder?: string;
  rows: number;
  maxlength: number;
  cols?: number;
  register: UseFormRegisterReturn;
};

export const TextArea: FC<Props> = ({
  className,
  value,
  id,
  placeholder,
  rows,
  cols,
  maxlength,
  register,
}) => {
  return (
    <div>
      <textarea
        id={id}
        value={value}
        className={`py-2 px-3 w-full text-base leading-8 text-gray-500 border border-gray-300 bg-white rounded-md focus:ring outline-none ${className}`}
        placeholder={placeholder}
        rows={rows}
        cols={cols}
        maxLength={maxlength}
        {...register}
      />
    </div>
  );
};
