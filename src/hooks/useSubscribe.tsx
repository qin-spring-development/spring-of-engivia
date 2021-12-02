import { useState, useEffect } from "react";
import { db } from "src/lib/firebase";
import { EngiviaType, BroadcastType, JoinUserType } from "src/types/interface";
import { getEngivia } from "src/lib/db";
import { initialEngiviaInfo } from "src/constant/initialState";

export const useSubscribeBroadcast = (broadcastId?: string) => {
  const [broadcast, setBroadcast] = useState<BroadcastType>();

  useEffect(() => {
    const unsubscribe = db
      .collection("broadcasts")
      .doc(broadcastId)
      .onSnapshot((snapshot) => {
        const broadcastRef = snapshot.data() as BroadcastType;
        setBroadcast(broadcastRef);
      });
    return () => unsubscribe();
  }, [broadcastId, setBroadcast]);

  return broadcast;
};

export const useSubscribeBroadcasts = () => {
  const [broadcasts, setBroadcasts] = useState<BroadcastType[]>([]);

  useEffect(() => {
    const unsubscribe = db
      .collection("broadcasts")
      .limit(5)
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
  const [featureEngivia, setFeatureEngivia] = useState<EngiviaType>();

  useEffect(() => {
    const unsubscribe = db
      .collection("broadcasts")
      .doc(broadcastId)
      .onSnapshot(async (doc) => {
        const broadcast = doc.data();
        if (broadcast?.featureId === null) {
          setFeatureEngivia(undefined);
        } else {
          const engivia = (await getEngivia(
            broadcastId,
            broadcast?.featureId
          )) as EngiviaType;
          setFeatureEngivia(engivia);
        }
      });
    return () => unsubscribe();
  }, [broadcastId, setFeatureEngivia]);
  return featureEngivia;
};

export const useSubscribeEngivias = (broadcastId: string) => {
  const [engivias, setEngivias] = useState<EngiviaType[]>();

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
  }, [broadcastId, setEngivias]);

  return engivias;
};

export const useSubscribeUserEngivia = (broadcastId: string, uid: string) => {
  const [userEngivia, setUserEngivia] =
    useState<EngiviaType>(initialEngiviaInfo);
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
          (engivia) => engivia.postUser?.id === uid
        );

        if (engivia === undefined) {
          setUserEngivia(initialEngiviaInfo);
        } else {
          setUserEngivia(engivia);
        }
      });
    return () => unsubscribe();
  }, [broadcastId, uid]);

  return userEngivia;
};

export const useSubscribeLikes = (
  broadcastId: string,
  engiviaId: string | undefined,
  uid: string
) => {
  const [likes, setLikes] = useState<number>(0);
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

export const useSubscribeTotalLikes = (
  broadcastId: string,
  engiviaId: string | undefined
) => {
  const [totalLikes, setTotalLikes] = useState<number>(0);

  useEffect(() => {
    const unsubscribe = db
      .collection("broadcasts")
      .doc(broadcastId)
      .collection("engivias")
      .doc(engiviaId)
      .onSnapshot(async (snapshot) => {
        const totalLikesDoc = await snapshot.data();
        if (totalLikesDoc) {
          setTotalLikes(totalLikesDoc?.totalLikes);
        }
      });

    return () => unsubscribe();
  }, [broadcastId, engiviaId, totalLikes]);

  return totalLikes;
};

export const useSubscribeJoinUsers = (
  broadcastId: string,
  engiviaId: string | undefined
) => {
  const [joinUsers, setJoinUsers] = useState<JoinUserType[]>([]);

  useEffect(() => {
    const unsubscribe = db
      .collection("broadcasts")
      .doc(broadcastId)
      .collection("engivias")
      .doc(engiviaId)
      .collection("joinUsers")
      // .orderBy("createdAt", "asc")
      .onSnapshot((snapshots) => {
        const joinUsers = snapshots.docs.map((snapshot) => {
          return snapshot.data() as JoinUserType;
        });
        setJoinUsers(joinUsers);
      });
    return () => unsubscribe();
  }, [broadcastId, engiviaId]);

  return joinUsers;
};
