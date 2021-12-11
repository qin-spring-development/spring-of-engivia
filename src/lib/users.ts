import { db } from "src/lib/firebase";

export type ReqUser = {
  id: string;
  email: string;
  name: string;
  image: string;
  provider: string;
};

export type ResUser = ReqUser & {
  isAdmin: boolean;
};

const adminUsers = [""];

export const createUser = (user: ReqUser) => {
  const isAdmin = adminUsers.includes(user.id);
  db.collection("users")
    .doc(user.id)
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

export const updateUsername = (uid: string, name: string) => {
  db.collection("users").doc(uid).set({ name }, { merge: true });
};

export const deleteUser = async (uid: string) => {
  await db.collection("users").doc(uid).delete();
};
