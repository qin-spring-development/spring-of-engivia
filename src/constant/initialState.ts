import { firebase } from "src/lib/firebase";

export const initialBroadcastInfo = {
  broadCastUrl: "",
  broadCastingDate: firebase.firestore.FieldValue.serverTimestamp(),
  engiviaCount: 0,
  id: "",
  status: "",
  title: "",
};
