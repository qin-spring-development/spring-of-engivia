import { FC } from "react";

export type Props = {
  label: string;
};

export const Label: FC<Props> = ({ label }) => {
  return (
    <>
      <span
        className={`py-1 px-3 text-sm rounded-full ${
          label === "放送前・エンジビア募集中"
            ? "text-orange-700 bg-orange-100"
            : label === "放送中"
            ? "text-green-700 bg-green-100"
            : "text-gray-900 bg-gray-200"
        }`}
      >
        {label}
      </span>
    </>
  );
};
