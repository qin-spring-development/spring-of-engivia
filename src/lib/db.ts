import { firebase, db } from "src/lib/firebase";
import {
  WithOutToken,
  BroadcastFormType,
  featureStatusType,
} from "src/types/interface";
import { ReqUser } from "src/lib/users";
import { User } from "next-auth";

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
    broadCastingDate: new Date(data.broadCastingDate).toISOString(),
    engiviaCount: 0,
    engiviaCurrentCount: null,
    featureId: null,
    id: broadcastRef.id,
    status: "BEFORE",
    title: data.title,
  };

  broadcastRef.set(broadcast);
  return broadcast;
};

export const updateBroadcast = async (
  data: BroadcastFormType,
  broadcastId: string
) => {
  const broadcastRef = await db.collection("broadcasts").doc(broadcastId);

  const updateBroadcast = {
    title: data.title,
    broadCastingDate: new Date(data.broadCastingDate).toISOString(),
  };

  broadcastRef.set(updateBroadcast, { merge: true });
};

export const deleteBroadcast = (broadcastId: string) => {
  db.collection("broadcasts").doc(broadcastId).delete();
};

export const beginBroadcast = async (broadcastId: string) => {
  const broadcastRef = await db.collection("broadcasts").doc(broadcastId);
  broadcastRef.set({ status: "IN_PROGRESS" }, { merge: true });
};

export const endBroadcast = async (broadcastId: string) => {
  const broadcastRef = await db.collection("broadcasts").doc(broadcastId);
  broadcastRef.set({ status: "DONE" }, { merge: true });
};

export const updateBroadcastFeatureId = async (
  broadcastId: string,
  engiviaId?: string
) => {
  const broadcastRef = db.collection("broadcasts").doc(broadcastId);
  await broadcastRef.set(
    { featureId: engiviaId ? engiviaId : null },
    { merge: true }
  );
};

export const updateEngiviaFeatureStatus = async (
  broadcastId: string,
  engiviaId: string,
  featureStatus: featureStatusType
) => {
  const engiviaRef = db
    .collection("broadcasts")
    .doc(broadcastId)
    .collection("engivias")
    .doc(engiviaId);

  await engiviaRef.set({ featureStatus: featureStatus }, { merge: true });
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

export const createEngivia = async (
  broadcastId: string,
  engiviaBody: string,
  user: User
) => {
  const engiviaRef = await db
    .collection("broadcasts")
    .doc(broadcastId)
    .collection("engivias")
    .doc();
  const engivia = {
    body: engiviaBody,
    createdAt: new Date().toISOString(),
    engiviaNumber: null,
    featureStatus: "BEFORE",
    id: engiviaRef.id,
    postUser: {
      name: user.name,
      image: user.image,
      id: user.id,
    },
    totalLikes: 0,
  };
  engiviaRef.set(engivia);

  const engiviaLengthRef = await db
    .collection("broadcasts")
    .doc(broadcastId)
    .collection("engivias")
    .get();

  const engiviaLength = engiviaLengthRef.docs.length;
  const broadcastRef = await db.collection("broadcasts").doc(broadcastId);
  broadcastRef.set({ engiviaCount: engiviaLength }, { merge: true });
  return engivia;
};

export const createJoinUsers = async (
  broadcastId: string,
  engiviaId: string,
  user: ReqUser
) => {
  db.collection("broadcasts")
    .doc(broadcastId)
    .collection("engivias")
    .doc(engiviaId)
    .collection("joinUsers")
    .doc(user.id)
    .set({
      likes: 0,
      name: user.name,
      image: user.image,
      iid: user.id,
    });
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

export const updateTotalLikes = async (
  broadcastId: string,
  engiviaId: string | undefined
) => {
  const snapshot = await db
    .collection("broadcasts")
    .doc(broadcastId)
    .collection("engivias")
    .doc(engiviaId)
    .collection("joinUsers")
    .get();

  const totalLikes = snapshot.docs
    .map((doc) => doc.data().likes)
    .reduce((prev, current) => prev + current, 0);

  const engiviaRef = await db
    .collection("broadcasts")
    .doc(broadcastId)
    .collection("engivias")
    .doc(engiviaId);

  engiviaRef.set({ totalLikes }, { merge: true });
};

export const deleteEngivia = async (broadcastId: string, engiviaId: string) => {
  await db
    .collection("broadcasts")
    .doc(broadcastId)
    .collection("engivias")
    .doc(engiviaId)
    .delete();

  const engiviaLengthRef = await db
    .collection("broadcasts")
    .doc(broadcastId)
    .collection("engivias")
    .get();
  const engiviaLength = engiviaLengthRef.docs.length;
  const broadcastRef = await db.collection("broadcasts").doc(broadcastId);
  broadcastRef.set({ engiviaCount: engiviaLength }, { merge: true });
};

export const voteLikes = async (
  broadcastId: string,
  engiviaId: string | undefined,
  user: User
) => {
  const likesRef = db
    .collection("broadcasts")
    .doc(broadcastId)
    .collection("engivias")
    .doc(engiviaId)
    .collection("joinUsers")
    .doc(user.id);
  likesRef.set(
    { likes: firebase.firestore.FieldValue.increment(1) },
    { merge: true }
  );
};

export const incrementEngiviaNumber = async (
  broadcastId: string,
  engiviaId: string
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

  /**エンジビアNoが登録済みなら処理スキップ */
  if (engivia?.engiviaNumber) return;

  const broadcastRef = await db.collection("broadcasts").doc(broadcastId);
  broadcastRef.set(
    { engiviaCurrentCount: firebase.firestore.FieldValue.increment(1) },
    { merge: true }
  );

  const broadcast = await db
    .collection("broadcasts")
    .doc(broadcastId)
    .get()
    .then((snapshot) => {
      return snapshot.data();
    });

  const engiviaRef = await db
    .collection("broadcasts")
    .doc(broadcastId)
    .collection("engivias")
    .doc(engiviaId);
  if (broadcast) {
    engiviaRef.set(
      { engiviaNumber: broadcast.engiviaCurrentCount },
      { merge: true }
    );
  }
};

export const setYoutubeURL = async (broadcastId: string, url: string) => {
  db.collection("broadcasts")
    .doc(broadcastId)
    .set({ broadCastUrl: url }, { merge: true });
};

export const addJoinUser = async (
  broadcastId: string,
  engiviaId: string | undefined,
  user: ReqUser
) => {
  const joinUserRef = await db
    .collection("broadcasts")
    .doc(broadcastId)
    .collection("engivias")
    .doc(engiviaId)
    .collection("joinUsers");

  const itemRef = joinUserRef.doc(user.id);
  const doc = await itemRef.get();
  if (doc.exists) {
    return;
  }

  db.collection("broadcasts")
    .doc(broadcastId)
    .collection("engivias")
    .doc(engiviaId)
    .collection("joinUsers")
    .doc(user.id)
    .set({
      likes: 0,
      name: user.name,
      image: user.image,
      id: user.id,
    });
};
