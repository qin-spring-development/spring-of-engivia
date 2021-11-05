import { db } from "src/lib/firebase";
import { WithOutToken, BroadcastFormType } from "src/types/interface";

export const createUser = (uid: string, user: WithOutToken) => {
  return db.collection("users").doc(uid).set(user, { merge: true });
};

export const createBroadcast = (data: BroadcastFormType) => {
  const broadcastRef = db.collection("broadcasts").doc();
  const broadcast = {
    broadCastUrl: "",
    broadCastingDate: new Date(data.date).toISOString(),
    engiviaCount: 0,
    featureId: null,
    id: broadcastRef.id,
    status: "BEFORE",
    title: data.title,
  };

  broadcastRef.set(broadcast);
};

export const updateBroadcast = async (
  data: BroadcastFormType,
  broadcastId: string
) => {
  const broadcastRef = await db.collection("broadcasts").doc(broadcastId);

  const updateBroadcast = {
    title: data.title,
    broadCastingDate: new Date(data.date).toISOString(),
  };

  broadcastRef.set(updateBroadcast, { merge: true });
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

export const getEngivias = async (broadcastId: string) => {
  const snapshot = db
    .collection("broadcasts")
    .doc(broadcastId)
    .collection("engivias")
    .get();
  const engivias = (await snapshot).docs.map((doc) => doc.data());
  return engivias;
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
