import { db } from "src/lib/firebase";
import { WithOutToken, Broadcast } from "src/types/interface";

export const createUser = (uid: string, user: WithOutToken) => {
  return db.collection("users").doc(uid).set(user, { merge: true });
};

export const createBroadcast = (data: Broadcast) => {
  const broadcast = db.collection("broadcasts").doc();
  data.id = broadcast.id;
  return broadcast.set(data);
};

export const getUser = async (uid: string) => {
  const data = await db
    .collection("users")
    .doc(uid)
    .get()
    .then((snapshot) => {
      return snapshot.data();
    });
  return data;
};

export const getEngivia = async (broadcastId: string, engiviaId: string) => {
  const engivia = await db
    .collection("broadcasts")
    .doc(broadcastId)
    .collection("engivias")
    .doc(engiviaId)
    .get()
    .then((snapshot) => {
      return snapshot.data();
    });
  return engivia;
};

export const updateBroadcastFeatureId = async (
  broadcastId: string,
  engiviaId: string,
  isNull: boolean
) => {
  const engivia = await db
    .collection("broadcasts")
    .doc(broadcastId)
    .collection("engivias")
    .doc(engiviaId)
    .get()
    .then((snapshot) => {
      return snapshot.data();
    });

  const broadcastRef = db.collection("broadcasts").doc(broadcastId);
  if (!isNull) {
    await broadcastRef.set({ featureId: null }, { merge: true });
  } else {
    await broadcastRef.set({ featureId: engivia?.id }, { merge: true });
  }
};
