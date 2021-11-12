import useSWR from "swr";
import { fetcher } from "src/utils/fetcher";
import { BroadcastType } from "src/types/interface";

export const useBroadcasts = () => {
  const { data, error, mutate } = useSWR("/api/broadcasts", fetcher);
  const broadcasts: BroadcastType[] = data?.broadcasts;

  return {
    broadcasts,
    error,
    isLoading: !error && !broadcasts,
    isEmpty: broadcasts && broadcasts.length === 0,
    mutate,
  };
};
