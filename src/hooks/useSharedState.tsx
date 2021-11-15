import useSWR from "swr";
import { users } from "src/constant/users";

export const useSharedState = (key: string, fallbackData: any) => {
  const { data, mutate } = useSWR(key, { fallbackData });
  return [data, mutate];
};

export const useBroadcast = () => {
  const [broadcast, setBroadcast] = useSharedState("broadcast", {});
  return { broadcast, setBroadcast };
};

export const useBroadcastId = () => {
  const [broadcastId, setBroadcastId] = useSharedState("broadcastId", "");
  return { broadcastId, setBroadcastId };
};

export const useIsBroadcastEditScreen = () => {
  const [isBroadcastEditScreen, setIsBroadcastEditScreen] = useSharedState(
    "isBroadcastEditScreen",
    false
  );
  return { isBroadcastEditScreen, setIsBroadcastEditScreen };
};

export const useEngivias = () => {
  const [engivias, setEngivias] = useSharedState("engivias", []);
  return { engivias, setEngivias };
};

export const useUserEngivia = () => {
  const [userEngivia, setUserEngivia] = useSharedState("userEngivia", null);
  return { userEngivia, setUserEngivia };
};

export const useFeatureEngivia = () => {
  const [featureEngivia, setFeatureEngivia] = useSharedState(
    "featureEngivia",
    null
  );
  return { featureEngivia, setFeatureEngivia };
};

export const useIsEngiviaCreateScreen = () => {
  const [isEngiviaCreateScreen, setIsEngiviaCreateScreen] = useSharedState(
    "isEngiviaCreateScreen",
    false
  );
  return { isEngiviaCreateScreen, setIsEngiviaCreateScreen };
};

export const useIsEngiviaEditScreen = () => {
  const [isEngiviaEditScreen, setIsEngiviaEditScreen] = useSharedState(
    "isEngiviaEditScreen",
    false
  );
  return { isEngiviaEditScreen, setIsEngiviaEditScreen };
};

export const useUser = () => {
  const [user, setUser] = useSharedState("user", users[1]);
  return { user, setUser };
};
