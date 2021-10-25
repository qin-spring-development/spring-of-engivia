import type { FC } from "react";
import { useRouter } from "next/router";
import { AcademicCapIcon, CalendarIcon } from "@heroicons/react/solid";
import { format, parseISO } from "date-fns";
import { BroadcastType } from "src/types/interface";

type Props = {
  broadcast: BroadcastType;
};

export const BroadcastItem: FC<Props> = (props) => {
  const { title, broadCastingDate, engiviaCount, status, id } = props.broadcast;
  const router = useRouter();
  const date = format(
    parseISO(broadCastingDate.toDate().toISOString()),
    "yyyy年MM月dd日"
  );

  const onBroadcastState = () => {
    if (status === "BEFORE") {
      router.push({
        pathname: "/broadcast/before",
        query: { id: id },
      });
    } else if (status === "IN_FEATURE") {
      router.push({
        pathname: "/broadcast/feature",
        query: { id: id },
      });
    } else {
      router.push({
        pathname: "/broadcast/done",
        query: { id: id },
      });
    }
  };

  return (
    <div className="py-5 px-7 mx-auto max-w-3xl text-[#6B7280] bg-white rounded-md border-b">
      <div className="flex justify-between">
        <div>
          <button
            onClick={onBroadcastState}
            className="text-[#0284C7]"
          >{`${title}`}</button>

          <div className="flex items-center mt-2">
            <CalendarIcon className="mr-1 h-5" />
            <span>{date}</span>
          </div>
        </div>
        <div className="inline text-right">
          <span
            className={`py-1 px-3 text-sm rounded-full ${
              status === "BEFORE"
                ? "bg-[#FFEDD5] text-[#C2410C]"
                : status === "IN_FEATURE"
                ? "bg-[#D1FAE5] text-[#047857]"
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
