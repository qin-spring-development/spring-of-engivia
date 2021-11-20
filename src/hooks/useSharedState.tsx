import useSWR from "swr";
import { users } from "src/constant/users";

export const useSharedState = (key: string, fallbackData: any) => {
  const { data, mutate } = useSWR(key, { fallbackData });
  return [data, mutate];
};

export const useUser = () => {
  const [user, setUser] = useSharedState("user", users[1]);
  return { user, setUser };
};
