import { db } from "src/lib/firebase";

type WithOutToken = {
  email: string | null;
  name: string | null;
  photoURL: string | undefined;
  provider: string | undefined;
  uid: string;
};

export const createUser = (uid: string, user: WithOutToken) => {
  return db.collection("users").doc(uid).set(user, { merge: true });
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
