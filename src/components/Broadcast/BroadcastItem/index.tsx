import type { FC } from "react";
import { useRouter } from "next/router";
import { AcademicCapIcon, CalendarIcon } from "@heroicons/react/solid";
import { format, parseISO } from "date-fns";
import { BroadcastType } from "src/types/interface";
import { useUser } from "src/hooks/useSharedState";
import { Label } from "src/components/Label";

type Props = {
  broadcast: BroadcastType;
};

export const BroadcastItem: FC<Props> = ({ broadcast }) => {
  const { user } = useUser();
  const { title, broadCastingDate, engiviaCount, status, id } = broadcast;

  const router = useRouter();
  const date = format(parseISO(broadCastingDate), "yyyy年MM月dd日");

  const handleClick = () => {
    if (status === "DONE") {
      router.push({
        pathname: "/broadcast-done",
        query: { id: id },
      });
    } else if (user.isAdmin && status === "BEFORE") {
      router.push({
        pathname: "/admin/broadcasting",
        query: { id: id },
      });
    } else if (user.isAdmin && status === "IN_PROGRESS") {
      router.push({
        pathname: "/admin/broadcasting",
        query: { id: id },
      });
    } else if (status === "IN_PROGRESS") {
      router.push({
        pathname: "/users/broadcasting",
        query: { id: id },
      });
    } else if (status === "BEFORE") {
      router.push({
        pathname: "/users/engivia-registration",
        query: { id: id, uid: user.uid },
      });
    }
  };

  return (
    <div className="py-5 px-7 text-gray-500 bg-white rounded-md border-b">
      <div className="flex justify-between">
        <div>
          <button onClick={handleClick} className="text-light-blue-600">
            {title}
          </button>

          <div className="flex items-center mt-2">
            <CalendarIcon className="mr-1 h-5" />
            <span>{date}</span>
          </div>
        </div>
        <div className="inline text-right">
          <Label status={status} />
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
