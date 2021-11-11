import { useState, useEffect } from "react";
import { db } from "src/lib/firebase";
import { BroadcastType } from "src/types/interface";
import { EngiviaType } from "src/types/interface";
import { getEngivia } from "src/lib/db";
import {
  useBroadcast,
  useBroadcasts,
  useEngivia,
  useEngivias,
  useUserEngivias,
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

export const useSubscribeEngivia = (broadcastId: string) => {
  const { engivia, setEngivia } = useEngivia();

  useEffect(() => {
    const unsubscribe = db
      .collection("broadcasts")
      .doc(broadcastId)
      .onSnapshot(async (doc) => {
        const broadcast = doc.data();
        if (broadcast?.featureId === null) {
          setEngivia(null);
        } else {
          const engivia = (await getEngivia(
            broadcastId,
            broadcast?.featureId
          )) as EngiviaType;
          setEngivia(engivia);
        }
      });
    return () => unsubscribe();
  }, []);

  return engivia;
};

export const useSubscribeEngivias = (broadcastId: string) => {
  const { engivias, setEngivias } = useEngivias();

  useEffect(() => {
    const unsubscribe = db
      .collection("broadcasts")
      .doc(broadcastId)
      .collection("engivias")
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

export const useSubscribeUserEngivia = (
  broadcastId: string,
  userId: string
) => {
  const { userEngivias, setUserEngivias } = useUserEngivias();
  const [engivia, setEngivia] = useState<EngiviaType>();

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
          (engivia) => engivia.postUser.uid === userId
        );
        setUserEngivias(engivia);
      });
    return () => unsubscribe();
  }, []);

  return userEngivias;
};
