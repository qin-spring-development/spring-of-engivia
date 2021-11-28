import { FC } from "react";

export type Props = {
  className?: string;
  // status: "BEFORE" | "IN_PROGRESS" | "DONE";
  status: string | undefined;
};

export const Label: FC<Props> = ({ className, status }) => {
  let broadcastStatus = "";
  let textColor = "";

  switch (status) {
    case "BEFORE":
      broadcastStatus = "放送前・エンジビア募集中";
      textColor = "text-orange-700 bg-orange-100";
      break;
    case "IN_PROGRESS":
      broadcastStatus = "放送中";
      textColor = "text-green-700 bg-green-100";
      break;
    case "DONE":
      broadcastStatus = "放送済";
      textColor = "text-gray-900 bg-gray-200";
      break;
    default:
      break;
  }
  return (
    <div className={className}>
      <span className={`py-1 px-3 text-sm rounded-full ${textColor}`}>
        {broadcastStatus}
      </span>
    </div>
  );
};
