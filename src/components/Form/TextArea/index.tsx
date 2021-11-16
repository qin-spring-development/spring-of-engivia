import { FC, ChangeEventHandler } from "react";

export type Props = {
  className?: string;
  value: string;
  id?: string;
  name?: string;
  placeholder?: string;
  rows: number;
  cols?: number;
  onChange: ChangeEventHandler<HTMLTextAreaElement>;
};

export const TextArea: FC<Props> = ({
  className,
  value,
  id,
  name,
  placeholder,
  rows,
  cols,
  onChange,
}) => {
  return (
    <div className={className}>
      <textarea
        id={id}
        defaultValue={value}
        name={name}
        className="py-2 px-3 w-full text-base leading-8 text-gray-500 bg-white rounded-md border border-gray-300 focus:ring outline-none"
        placeholder={placeholder}
        rows={rows}
        cols={cols}
        onChange={onChange}
      />
    </div>
  );
};
