import useSWR from "swr";
import { BroadcastType } from "src/types/interface";

export const useBroadcasts = () => {
  const { data, error } = useSWR("/api/broadcasts", {
    revalidateOnMount: true,
  });
  const broadcasts: BroadcastType[] = data?.broadcasts;

  return {
    broadcasts,
    error,
    isLoading: !error && !broadcasts,
    isEmpty: broadcasts && broadcasts.length === 0,
  };
};
