import useSWR from "swr";
import { users } from "src/constant/users";

export const useSharedState = (key: string, fallbackData: any) => {
  const { data, mutate } = useSWR(key, { fallbackData });
  return [data, mutate];
};

export const useEngivias = () => {
  const [engivias, setEngivias] = useSharedState("engivias", []);
  return { engivias, setEngivias };
};

export const useFeatureEngivia = () => {
  const [featureEngivia, setFeatureEngivia] = useSharedState(
    "featureEngivia",
    null
  );
  return { featureEngivia, setFeatureEngivia };
};

export const useUser = () => {
  const [user, setUser] = useSharedState("user", users[1]);
  return { user, setUser };
};
