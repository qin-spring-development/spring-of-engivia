import type { FC } from "react";
import { useRouter } from "next/router";
import { AcademicCapIcon, CalendarIcon } from "@heroicons/react/solid";
import { format, parseISO } from "date-fns";
import { BroadcastType } from "src/types/interface";
import { useBroadcastId, useBroadcast } from "src/hooks/useSharedState";

type Props = {
  broadcast: BroadcastType;
  isAdmin: boolean;
};

export const BroadcastItem: FC<Props> = ({ broadcast, isAdmin }) => {
  const { title, broadCastingDate, engiviaCount, status, id } = broadcast;
  const { setBroadcastId } = useBroadcastId();
  const { setBroadcast } = useBroadcast();

  const router = useRouter();
  const date = format(parseISO(broadCastingDate), "yyyy年MM月dd日");

  const onClickHandler = () => {
    if (status === "AFTER") {
      router.push({
        pathname: "/broadcast-after",
        query: { id: id },
      });
    } else if (status === "IN_FEATURE") {
      router.push({
        pathname: "/broadcasting",
        query: { id: id },
      });
    } else if (isAdmin) {
      router.push({
        pathname: "/admin/settings",
        query: { id: id },
      });
    } else if (status === "BEFORE") {
      setBroadcast(broadcast);
      setBroadcastId(id);
    }
  };

  return (
    <div className="py-5 px-7 text-gray-500 bg-white rounded-md border-b">
      <div className="flex justify-between">
        <div>
          <button onClick={onClickHandler} className="text-light-blue-600">
            {title}
          </button>

          <div className="flex items-center mt-2">
            <CalendarIcon className="mr-1 h-5" />
            <span>{date}</span>
          </div>
        </div>
        <div className="inline text-right">
          <span
            className={`py-1 px-3 text-sm rounded-full ${
              status === "BEFORE"
                ? "bg-orange-100 text-orange-700"
                : status === "IN_FEATURE"
                ? "bg-green-100 text-green-700"
                : "bg-gray-200"
            }`}
          >
            {status === "BEFORE"
              ? "放送前・エンジビア募集中"
              : status === "IN_FEATURE"
              ? "放送中"
              : "放送済み"}
          </span>
          <div className="flex items-center mt-2">
            <span className="flex items-center ml-auto">
              <AcademicCapIcon className="h-5" />
              <span>{`エンジビア数 ${engiviaCount}`}</span>
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};
