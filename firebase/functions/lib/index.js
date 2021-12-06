"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteBroadcastSubCollection = void 0;
// eslint-disable-next-line @typescript-eslint/no-var-requires
const functions = require("firebase-functions");
// eslint-disable-next-line @typescript-eslint/no-var-requires
const firebase_tools = require("firebase-tools");
// // Start writing Firebase Functions
// // https://firebase.google.com/docs/functions/typescript
//
exports.deleteBroadcastSubCollection = functions
  .region("asia-northeast1")
  .firestore.document("broadcasts/{id}")
  .onDelete(async (snapshot) => {
    try {
      const path = snapshot.ref.path;
      await firebase_tools.firestore.delete(path, {
        project: process.env.GCLOUD_PROJECT,
        recursive: true,
        yes: true,
        token: functions.config().fb.token,
      });
    } catch (error) {
      console.log(error);
      throw error;
    }
  });
//# sourceMappingURL=index.js.map
