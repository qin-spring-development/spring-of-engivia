import { db } from "./firebase-admin";

export const getAllBroadcasts = async () => {
  const snapshot = await db
    .collection("broadcasts")
    .orderBy("broadCastingDate", "desc")
    .get();
  const broadcasts = snapshot.docs.map((doc) => doc.data());
  return broadcasts;
};
