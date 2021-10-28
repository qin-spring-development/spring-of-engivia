import { db } from "./firebase-admin";

export const getAllBroadcasts = async () => {
  const snapshot = await db.collection("broadcasts").get();
  const broadcasts = snapshot.docs.map((doc) => doc.data());
  return broadcasts;
};
