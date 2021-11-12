import useSWR from "swr";
import { EngiviaType } from "src/types/interface";

export const useEngivias = (broadcastId: string) => {
  const { data, error } = useSWR(`/api/engivia/${broadcastId}`);
  const engivias: EngiviaType[] = data?.engivias;

  return {
    engivias,
    error,
    isLoading: !error && !engivias,
    isEmpty: engivias && engivias.length === 0,
  };
};
