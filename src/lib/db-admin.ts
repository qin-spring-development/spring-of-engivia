import { db } from "./firebase-admin";
import { initialEngiviaInfo } from "src/constant/initialState";

export const getAllBroadcasts = async () => {
  const snapshot = await db
    .collection("broadcasts")
    .orderBy("broadCastingDate", "desc")
    .get();
  const broadcasts = snapshot.docs.map((doc) => doc.data());
  return broadcasts;
};

export const getBroadcast = async (broadcastId: string) => {
  const docRef = await db.collection("broadcasts").doc(broadcastId).get();
  const broadcast = docRef.data();
  return broadcast;
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

export const getUserEngivia = async (broadcastId: string, uid: string) => {
  const snapshot = db
    .collection("broadcasts")
    .doc(broadcastId)
    .collection("engivias")
    .get();

  const engivias = (await snapshot).docs.map((doc) => doc.data());

  if (engivias.length === 0) {
    return initialEngiviaInfo;
  } else {
    const engivia = engivias.find((engivia) => engivia.postUser?.uid === uid);
    return engivia;
  }
};
