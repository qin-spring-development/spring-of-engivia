import { FC, ChangeEventHandler } from "react";

export type Props = {
  className?: string;
  type: string;
  value?: string;
  id?: string;
  name?: string;
  placeholder?: string;
  onChange: ChangeEventHandler<HTMLInputElement>;
};

export const Form: FC<Props> = ({
  className,
  type = "text",
  value,
  id,
  name,
  placeholder,
  onChange,
}) => {
  return (
    <div className={className}>
      <input
        type={type}
        id={id}
        defaultValue={value}
        name={name}
        className="py-1 px-3 w-full text-base leading-8 text-gray-500 bg-white rounded-md border border-gray-300 focus:ring outline-none"
        placeholder={placeholder}
        onChange={onChange}
      />
    </div>
  );
};
