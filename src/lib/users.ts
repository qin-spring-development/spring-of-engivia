import { db } from "src/lib/firebase";

export type ReqUser = {
  id: string;
  email: string;
  name: string;
  image: string;
  provider: string;
};

export type userTokens = {
  id: string;
  firebaseUid: string;
};

export type ResUser = ReqUser & {
  isAdmin: boolean;
};

const adminUsers = ["U01FE9AJ4A2"];

export const createUser = async (user: ReqUser) => {
  const isAdmin = adminUsers.includes(user.id);
  await db
    .collection("users")
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

export const createUserToken = async (userToken: userTokens) => {
  await db
    .collection("userTokens")
    .doc(userToken.id)
    .set(
      { firebaseUid: userToken.firebaseUid, id: userToken.id },
      { merge: true }
    );
};

export const updateUsername = async (uid: string, name: string) => {
  await db.collection("users").doc(uid).set({ name }, { merge: true });
};

export const deleteUser = async (uid: string) => {
  await db.collection("users").doc(uid).delete();
};
