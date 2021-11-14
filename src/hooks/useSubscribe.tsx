import { useEffect } from "react";
import { db } from "src/lib/firebase";
import { BroadcastType } from "src/types/interface";
import { EngiviaType } from "src/types/interface";
import { getEngivia } from "src/lib/db";
import {
  useBroadcast,
  useBroadcasts,
  useEngivias,
  useUserEngivia,
  useLikes,
  useFeatureEngivia,
} from "src/hooks/useSharedState";

export const useSubscribeBroadcast = (broadcastId?: string) => {
  const { broadcast, setBroadcast } = useBroadcast();

  useEffect(() => {
    const unsubscribe = db
      .collection("broadcasts")
      .doc(broadcastId)
      .onSnapshot((snapshot) => {
        const broadcastRef = snapshot.data() as BroadcastType;
        setBroadcast(broadcastRef);
      });
    return () => unsubscribe();
  }, []);

  return broadcast;
};

export const useSubscribeBroadcasts = () => {
  const { broadcasts, setBroadcasts } = useBroadcasts();

  useEffect(() => {
    const unsubscribe = db
      .collection("broadcasts")
      .orderBy("broadCastingDate", "desc")
      .onSnapshot((snapshots) => {
        const broadcasts = snapshots.docs.map((snapshot) => {
          return snapshot.data() as BroadcastType;
        });
        setBroadcasts(broadcasts);
      });
    return () => unsubscribe();
  }, []);

  return broadcasts;
};

export const useSubscribeFeatureEngivia = (broadcastId: string) => {
  const { featureEngivia, setFeatureEngivia } = useFeatureEngivia();

  useEffect(() => {
    const unsubscribe = db
      .collection("broadcasts")
      .doc(broadcastId)
      .onSnapshot(async (doc) => {
        const broadcast = doc.data();
        if (broadcast?.featureId === null) {
          setFeatureEngivia(null);
        } else {
          const engivia = (await getEngivia(
            broadcastId,
            broadcast?.featureId
          )) as EngiviaType;
          setFeatureEngivia(engivia);
        }
      });
    return () => unsubscribe();
  }, []);

  return featureEngivia;
};

export const useSubscribeEngivias = (broadcastId: string) => {
  const { engivias, setEngivias } = useEngivias();

  useEffect(() => {
    const unsubscribe = db
      .collection("broadcasts")
      .doc(broadcastId)
      .collection("engivias")
      .orderBy("createdAt", "asc")
      .onSnapshot((snapshots) => {
        const engivias = snapshots.docs.map((snapshot) => {
          return snapshot.data() as EngiviaType;
        });
        setEngivias(engivias);
      });
    return () => unsubscribe();
  }, []);

  return engivias;
};

export const useSubscribeUserEngivia = (broadcastId: string, uid: string) => {
  const { userEngivia, setUserEngivia } = useUserEngivia();

  useEffect(() => {
    const unsubscribe = db
      .collection("broadcasts")
      .doc(broadcastId)
      .collection("engivias")
      .onSnapshot((snapshots) => {
        const engivias = snapshots.docs.map((snapshot) => {
          return snapshot.data() as EngiviaType;
        });
        const engivia = engivias.find(
          (engivia) => engivia.postUser?.uid === uid
        );

        if (engivia === null) {
          setUserEngivia(null);
        } else {
          setUserEngivia(engivia);
        }
      });
    return () => unsubscribe();
  }, []);

  return userEngivia;
};

export const useSubscribeLikes = (
  broadcastId: string,
  engiviaId: string,
  uid: string
) => {
  const { likes, setLikes } = useLikes();

  useEffect(() => {
    const unsubscribe = db
      .collection("broadcasts")
      .doc(broadcastId)
      .collection("engivias")
      .doc(engiviaId)
      .collection("joinUsers")
      .doc(uid)
      .onSnapshot((snapshot) => {
        const likesDoc = snapshot.data();
        setLikes(likesDoc?.likes);
      });
    return () => unsubscribe();
  }, [broadcastId, engiviaId, uid, setLikes, likes]);

  return likes;
};
