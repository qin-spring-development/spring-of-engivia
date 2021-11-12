import { firebase, db } from "src/lib/firebase";
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
  return broadcast;
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
  engiviaBody: string
) => {
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
    joinUsers: [],
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

export const voteLikes = async (broadcastId: string, engiviaId: string) => {
  const uid = "e3eqU6k13hhDuZe1BiusnkQ4LkD3";

  const joinUserRef = await db
    .collection("broadcasts")
    .doc(broadcastId)
    .collection("engivias")
    .doc(engiviaId)
    .collection("joinUsers");

  const itemRef = joinUserRef.doc(uid);
  const doc = await itemRef.get();
  if (doc.exists) {
    console.log("あるよ", doc.data());
  } else {
    db.collection("broadcasts")
      .doc(broadcastId)
      .collection("engivias")
      .doc(engiviaId)
      .collection("joinUsers")
      .doc(uid)
      .set({
        likes: 1,
        name: "osamu",
        photoUrl: "https://avatars.githubusercontent.com/u/15007672?v=4",
        uid,
      });
    console.log("新規作成したよ");
  }

  // const engiviaDoc = await engiviaRef.get();
  // const engivia = engiviaDoc.data();
  // const joinUserRef = db
  //   .collection("broadcasts")
  //   .doc(broadcastId)
  //   .collection("engivias")
  //   .doc(engivia?.id)
  //   .collection("joinUsers")
  //   .doc(uid)
  //   .set({
  //     likes: 1,
  //     name: "osamu",
  //     photoUrl: "https://avatars.githubusercontent.com/u/15007672?v=4",
  //     uid,
  //   });

  // console.log(await joinUserRef);

  // const engiviaDoc = await engiviaRef.get();
  // const engivia = engiviaDoc.data();

  // const isExist = engivia?.joinUsers.find((joinUser) => joinUser.uid === uid);
  // if (isExist) {
  //   console.log(isExist);

  // engiviaRef.set(
  //   {
  //     joinUsers: [
  //       {
  //         likes: firebase.firestore.FieldValue.increment(1),
  //       },
  //     ],
  //   },
  //   { merge: true }
  // );
  // } else {
  //   engiviaRef.set(
  //     {
  //       joinUsers: [
  //         {
  //           likes: 1,
  //           name: "osamu",
  //           photoUrl: "https://avatars.githubusercontent.com/u/15007672?v=4",
  //           uid: "e3eqU6k13hhDuZe1BiusnkQ4LkD3",
  //         },
  //       ],
  //     },
  //     { merge: true }
  //   );
  // }
};
