import { db } from "src/lib/firebase/config";

export type FormatUser = {
  uid: string;
  email: string | null;
  name: string | null;
  photoURL: string | undefined;
  provider: string | undefined;
};

const adminUsers = [""];

export const createUser = (user: FormatUser) => {
  const isAdmin = adminUsers.includes(user.uid);
  return db
    .collection("users")
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
