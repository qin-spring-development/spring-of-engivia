import useSWR from "swr";
import { EngiviaType } from "src/types/interface";

export const useSharedState = (key: string, fallback: any) => {
  const { data, mutate } = useSWR(key, null, { fallback });
  return [data, mutate];
};

export const useBroadcast = () => {
  const [broadcast, setBroadcast] = useSharedState("broadcast", {});
  return { broadcast, setBroadcast };
};

export const useBroadcasts = () => {
  const [broadcasts, setBroadcasts] = useSharedState("broadcasts", []);
  return { broadcasts, setBroadcasts };
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

export const useEngivia = () => {
  const [engivia, setEngivia] = useSharedState("engivia", {});
  return { engivia, setEngivia };
};

export const useEngivias = () => {
  const [engivias, setEngivias] = useSharedState("engivias", []);
  return { engivias, setEngivias };
};

export const useUserEngivias = () => {
  const [userEngivias, setUserEngivias] = useSharedState("userEngivias", []);
  return { userEngivias, setUserEngivias };
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