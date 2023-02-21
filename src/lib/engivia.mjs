import admin from "firebase-admin";

// 直接値を入れる
const clientEmail = "";
const privateKey = "";
const projectId = "";

if (!admin.apps.length) {
  admin.initializeApp({
    credential: admin.credential.cert({
      clientEmail,
      privateKey,
      projectId,
    }),
  });
}

const db = admin.firestore();

const createEngivia = async () => {
  const collection = await db.collection("broadcasts");
  const newDocId = await collection.doc().id;
  const newBroadcast = {
    broadCastUrl: "",
    broadCastingDate: new Date().toISOString(),
    engiviaCount: 10,
    engiviaCurrentCount: 10,
    featureId: null,
    id: newDocId,
    status: "BEFORE",
    title: "第一回エンジビアの泉",
  };
  await collection.doc(newDocId).set({ ...newBroadcast });

  const engivias = [
    "カレントディレクトリを移動するコマンドには、cd以外にpushdというコマンドがある",
    "右クリックとドラッグ＆ドロップを開発したのは日本人プログラマー",
    "foo,barの由来は、「何から何までめちゃくちゃ」である",
    "CPU製品のグレード分類は、野菜や果物の等級と同じ",
    "部屋で独り言を言いがち",
  ];

  await Promise.all(
    engivias.map(async (engivia) => {
      const engiviaCollection = await db
        .collection("broadcasts")
        .doc(newDocId)
        .collection("engivias");
      const newEngiviaDocId = await engiviaCollection.doc().id;
      const newEngivia = {
        body: engivia,
        createdAt: new Date().toISOString(),
        engivianumber: 1,
        featureStatus: "BEFORE",
        id: newEngiviaDocId,
        joinUserCount: 1,
        postUser: {
          id: "U04R2AUHARW",
          image:
            "https://secure.gravatar.com/avatar/526eb3566d13bd64b54bc7a082a28ff3.jpg?s=512&d=https%3A%2F%2Fa.slack-edge.com%2Fdf10d%2Fimg%2Favatars%2Fava_0010-512.png",
          name: "test",
        },
        totalLikes: 0,
      };
      await engiviaCollection.doc(newEngiviaDocId).set({ ...newEngivia });
    })
  );
};

createEngivia();
