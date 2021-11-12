import useSWR from "swr";
import { BroadcastType } from "src/types/interface";

export const useBroadcast = (broadcastId: string) => {
  const { data, error, mutate } = useSWR(`/api/broadcast/${broadcastId}`);
  const broadcast: BroadcastType = data?.broadcast;

  return {
    broadcast,
    error,
    isLoading: !error && !broadcast,
    mutate,
  };
};
