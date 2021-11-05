import type { NextPage } from "next";
import { useRouter } from "next/router";
import { BaseLayout } from "src/components/Layouts/BaseLayout";
import { updateBroadcastFeatureId } from "src/lib/db";
import { useSubscribeEngivias } from "src/hooks/useSubscribeEngivias";

const Settings: NextPage = () => {
  const router = useRouter();
  const broadcastId = router.query.id as string;
  const engivias = useSubscribeEngivias(broadcastId);

  const onDisplay = async (broadcastId: string, engiviaId: string) => {
    updateBroadcastFeatureId(broadcastId, engiviaId, true);
  };

  const onSetNull = (broadcastId: string, engiviaId: string) => {
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
