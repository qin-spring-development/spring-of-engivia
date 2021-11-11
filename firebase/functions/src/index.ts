import * as functions from "firebase-functions";
// eslint-disable-next-line @typescript-eslint/no-var-requires
const firebase_tools = require("firebase-tools");

// // Start writing Firebase Functions
// // https://firebase.google.com/docs/functions/typescript
//
export const helloWorld = functions.https.onRequest((request, response) => {
  functions.logger.info("Hello logs!", { structuredData: true });
  response.send("Hello from Firebase here ok!");
});

export const deleteEngiviasSubCollection = functions
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
