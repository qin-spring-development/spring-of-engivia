import type { NextPage } from "next";
import { useState, useEffect } from "react";
import { db } from "src/lib/firebase";
import { useRouter } from "next/router";
import { BaseLayout } from "src/components/Layouts/BaseLayout";
import { updateBroadcastFeatureId } from "src/lib/db";
import { EngiviaType } from "src/types/interface";

const Settings: NextPage = () => {
  const [engivias, setEngivias] = useState<EngiviaType[]>();
  const router = useRouter();
  const broadcastId = router.query.id as string;

  useEffect(() => {
    const unsubscribe = db
      .collection("broadcasts")
      .doc(broadcastId)
      .collection("engivias")
      .onSnapshot((snapshots) => {
        const engivias = snapshots.docChanges().map((snapshot) => {
          return snapshot.doc.data() as EngiviaType;
        });
        setEngivias(engivias);
      });
    return () => unsubscribe();
  }, []);

  const onDisplay = async (broadcastId: string, engiviaId: string) => {
    console.log("表示したよ");
    updateBroadcastFeatureId(broadcastId, engiviaId, true);
  };

  const onSetNull = (broadcastId: string, engiviaId: string) => {
    console.log("消したよ");
    updateBroadcastFeatureId(broadcastId, engiviaId, false);
  };

  const onGoToEditPage = () => {
    router.push({
      pathname: "/admin/edit-broadcast",
      query: { id: broadcastId },
    });
  };

  return (
    <BaseLayout title="管理画面">
      <h1 className="text-2xl font-bold">管理画面だよ</h1>
      <button
        onClick={onGoToEditPage}
        className="py-2 px-4 mr-2 mb-10 text-white bg-green-500 rounded-lg"
      >
        編集
      </button>
      {engivias?.map((engivia) => {
        return (
          <div key={engivia.id} className="mb-5">
            <p>{engivia.body}</p>
            <button
              onClick={() => onDisplay(broadcastId, engivia.id)}
              className="py-2 px-4 mr-2 text-white bg-red-500 rounded-lg"
            >
              エンジビア表示
            </button>
            <button
              onClick={() => onSetNull(broadcastId, engivia.id)}
              className="py-2 px-4 text-white bg-blue-500 rounded-lg"
            >
              null
            </button>
          </div>
        );
      })}
    </BaseLayout>
  );
};

export default Settings;
