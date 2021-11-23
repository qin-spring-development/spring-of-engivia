import { firebase, db } from "src/lib/firebase";
import { WithOutToken, BroadcastFormType, UserType } from "src/types/interface";

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

export const createEngivia = async (
  broadcastId: string,
  engiviaBody: string,
  user: UserType
) => {
  const engiviaRef = await db
    .collection("broadcasts")
    .doc(broadcastId)
    .collection("engivias")
    .doc();
  const engivia = {
    body: engiviaBody,
    createdAt: new Date().toISOString(),
    // engiviaNumber: 0, // なぜか初期値が0で取得してしまう
    featureStatus: "BEFORE",
    id: engiviaRef.id,
    postUser: {
      name: user.name,
      image: user.image,
      uid: user.uid,
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
  engiviaRef.set({ engiviaNumber: engiviaLength }, { merge: true });

  const broadcastRef = await db.collection("broadcasts").doc(broadcastId);

  broadcastRef.set({ engiviaCount: engiviaLength }, { merge: true });
  return engivia;
};

export const createJoinUsers = async (
  broadcastId: string,
  engiviaId: string,
  user: UserType
) => {
  db.collection("broadcasts")
    .doc(broadcastId)
    .collection("engivias")
    .doc(engiviaId)
    .collection("joinUsers")
    .doc(user.uid)
    .set({
      likes: 0,
      name: user.name,
      image: user.image,
      uid: user.uid,
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

  const totalJoinUsersLength = snapshot.docs.length;

  const sumTotalLikes =
    (Math.round((totalLikes / totalJoinUsersLength) * 5) * 10) / 10;

  const engiviaRef = await db
    .collection("broadcasts")
    .doc(broadcastId)
    .collection("engivias")
    .doc(engiviaId);

  engiviaRef.set({ totalLikes: sumTotalLikes }, { merge: true });
};

export const deleteEngivia = async (broadcastId: string, engiviaId: string) => {
  await db
    .collection("broadcasts")
    .doc(broadcastId)
    .collection("engivias")
    .doc(engiviaId)
    .delete();
};

export const voteLikes = async (
  broadcastId: string,
  engiviaId: string | undefined,
  user: UserType
) => {
  const joinUserRef = await db
    .collection("broadcasts")
    .doc(broadcastId)
    .collection("engivias")
    .doc(engiviaId)
    .collection("joinUsers");

  const itemRef = joinUserRef.doc(user.uid);
  const doc = await itemRef.get();
  if (doc.exists) {
    const likesRef = db
      .collection("broadcasts")
      .doc(broadcastId)
      .collection("engivias")
      .doc(engiviaId)
      .collection("joinUsers")
      .doc(user.uid);
    likesRef.set(
      { likes: firebase.firestore.FieldValue.increment(1) },
      { merge: true }
    );
  } else {
    db.collection("broadcasts")
      .doc(broadcastId)
      .collection("engivias")
      .doc(engiviaId)
      .collection("joinUsers")
      .doc(user.uid)
      .set({
        likes: 1,
        name: user.name,
        image: user.image,
        uid: user.uid,
      });
  }
};

export const setYoutubeURL = async (broadcastId: string, url: string) => {
  db.collection("broadcasts")
    .doc(broadcastId)
    .set({ broadCastUrl: url }, { merge: true });
};
