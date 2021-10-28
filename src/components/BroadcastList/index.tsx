import type { FC } from "react";
import useSWR from "swr";
import { BroadcastItem } from "src/components/BroadcastItem";
import { BroadcastType } from "src/types/interface";
import fetcher from "utils/fetcher";

export const BroadCastList: FC = () => {
  const { data } = useSWR("/api/broadcasts", fetcher);
  const broadcasts: BroadcastType[] = data?.broadcasts;
  console.log(data);

  if (!data) return <div>Loading...</div>;

  return (
    <div className="mx-auto max-w-3xl">
      <h1 className="py-10 mx-auto text-4xl font-bold">放送一覧</h1>
      {broadcasts?.map((broadcast) => {
        return (
          <div key={broadcast.id}>
            <BroadcastItem broadcast={broadcast} />
          </div>
        );
      })}
    </div>
  );
};
