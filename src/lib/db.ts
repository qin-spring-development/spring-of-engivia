import { db } from "src/lib/firebase";
import { WithOutToken, BroadcastFormType } from "src/types/interface";

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

export const deleteBroadcast = (broadcastId: string) => {
  db.collection("broadcasts").doc(broadcastId).delete();
};

export const beginBroadcast = async (broadcastId: string) => {
  const broadcastRef = await db.collection("broadcasts").doc(broadcastId);
  broadcastRef.set({ status: "IN_FEATURE" }, { merge: true });
};

export const endBroadcast = async (broadcastId: string) => {
  const broadcastRef = await db.collection("broadcasts").doc(broadcastId);
  broadcastRef.set({ status: "AFTER" }, { merge: true });
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

export const createEngivia = (broadcastId: string, engiviaBody: string) => {
  const engiviaRef = db
    .collection("broadcasts")
    .doc(broadcastId)
    .collection("engivias")
    .doc();
  const engivia = {
    body: engiviaBody,
    createdAt: new Date().toISOString(),
    engiviaNumber: 0,
    featureStatus: "BEFORE",
    id: engiviaRef.id,
    joinUser: [],
    postUser: {
      name: "spring-development",
      photoUrl: "https://avatars.githubusercontent.com/u/92626637?v=4",
      uid: "0VdnReeUhHOkonTR3EFmRb3UO4v1",
    },
    totalLikes: 0,
  };
  engiviaRef.set(engivia);
  return engivia;
};

export const updateEngivia = async (
  broadcastId: string,
  engiviaId: string,
  body: string
) => {
  const engiviaRef = await db
    .collection("broadcasts")
    .doc(broadcastId)
    .collection("engivias")
    .doc(engiviaId);

  engiviaRef.set({ body }, { merge: true });
};

export const deleteEngivia = async (broadcastId: string, engiviaId: string) => {
  await db
    .collection("broadcasts")
    .doc(broadcastId)
    .collection("engivias")
    .doc(engiviaId)
    .delete();
};
