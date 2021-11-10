import { db } from "src/lib/firebase/config";

export type ReqUser = {
  uid: string;
  email: string;
  name: string;
  image: string;
  provider: string;
};

export type ResUser = {
  uid: string;
  email: string;
  name: string;
  isAdmin: boolean;
  image: string;
  provider: string;
};

const adminUsers = [""];

export const createUser = (user: ReqUser) => {
  const isAdmin = adminUsers.includes(user.uid);
  db.collection("users")
    .doc(user.uid)
    .set({ ...user, isAdmin }, { merge: true });
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
