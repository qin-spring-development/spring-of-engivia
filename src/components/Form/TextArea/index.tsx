import { FC, ChangeEventHandler } from "react";

export type Props = {
  className?: string;
  value: string;
  id?: string;
  name?: string;
  placeholder?: string;
  rows: number;
  length: number;
  maxlength: number;
  cols?: number;
  onChange: ChangeEventHandler<HTMLTextAreaElement>;
  classNameAlert: string;
};

export const TextArea: FC<Props> = ({
  className,
  value,
  id,
  name,
  placeholder,
  rows,
  cols,
  length,
  maxlength,
  onChange,
  classNameAlert,
}) => {
  return (
    <div>
      <textarea
        id={id}
        value={value}
        name={name}
        className={`py-2 px-3 w-full text-base leading-8 bg-white rounded-md text-gray-500 border border-gray-300 bg-white rounded-md focus:ring outline-none ${className}`}
        placeholder={placeholder}
        rows={rows}
        cols={cols}
        maxLength={maxlength}
        onChange={onChange}
      />
      <div className={`float-right ${classNameAlert}`}>
        {length}/{maxlength}
      </div>
    </div>
  );
};
