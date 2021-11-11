import { FC } from "react";

export type Props = {
  className?: string;
  status: string;
};

export const Label: FC<Props> = ({ className, status }) => {
  return (
    <div className={className}>
      <span
        className={`py-1 px-3 text-sm rounded-full ${
          status === "BEFORE"
            ? "text-orange-700 bg-orange-100"
            : status === "IN_PROGRESS"
            ? "text-green-700 bg-green-100"
            : "text-gray-900 bg-gray-200"
        }`}
      >
        {status === "BEFORE"
          ? "放送前・エンジビア募集中"
          : status === "IN_PROGRESS"
          ? "放送中"
          : "放送済"}
      </span>
    </div>
  );
};
