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
