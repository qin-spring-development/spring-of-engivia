import type { NextPage } from "next";
import { useRouter } from "next/router";
import { BaseLayout } from "src/components/Layouts/BaseLayout";
import {
  updateBroadcastFeatureId,
  beginBroadcast,
  endBroadcast,
} from "src/lib/db";
import { BroadcastTitle } from "src/components/Broadcast/BroadcastTitle";
import { BroadcastEdit } from "src/components/Broadcast/BroadcastEdit";
import {
  useSubscribeBroadcast,
  useSubscribeEngivias,
} from "src/hooks/useSubscribe";
import { useIsBroadcastEditScreen } from "src/hooks/useSharedState";
import { EngiviaType } from "src/types/interface";
import { Button } from "src/components/Button";

const Settings: NextPage = () => {
  const router = useRouter();
  const broadcastId = router.query.id as string;
  const engivias = useSubscribeEngivias(broadcastId);
  const broadcast = useSubscribeBroadcast(broadcastId);
  const { isBroadcastEditScreen, setIsBroadcastEditScreen } =
    useIsBroadcastEditScreen();

  const onDisplay = async (broadcastId: string, engiviaId: string) => {
    updateBroadcastFeatureId(broadcastId, engiviaId, true);
  };

  const onSetNull = (broadcastId: string, engiviaId: string) => {
    updateBroadcastFeatureId(broadcastId, engiviaId, false);
  };

  const onBeginBroadcast = () => {
    beginBroadcast(broadcastId);
  };

  const onEndBroadcast = () => {
    endBroadcast(broadcastId);
    router.push("/broadcasts");
  };

  const onEditBroadcast = () => {
    setIsBroadcastEditScreen(true);
  };

  return (
    <BaseLayout title="管理画面">
      {isBroadcastEditScreen ? (
        <BroadcastEdit />
      ) : (
        <div className="mx-auto max-w-6xl">
          <div className="flex relative justify-center items-center">
            <BroadcastTitle broadcastId={broadcastId} />
            <div className="absolute right-0">
              {broadcast?.status === "BEFORE" ? (
                <div>
                  <Button
                    isSubmitting={false}
                    isPrimary={true}
                    type="button"
                    onClick={onBeginBroadcast}
                  >
                    放送を開始する
                  </Button>
                  <Button
                    isSubmitting={false}
                    isPrimary={false}
                    type="button"
                    onClick={onEditBroadcast}
                  >
                    編集する
                  </Button>
                </div>
              ) : (
                <button
                  onClick={onEndBroadcast}
                  className="py-2 px-4 mr-2 text-light-blue-700 bg-light-blue-100 rounded-md"
                >
                  放送を終了する
                </button>
              )}
            </div>
          </div>
          {engivias?.map((engivia: EngiviaType) => (
            <div key={engivia.id} className="mb-5">
              <div className="inline-flex flex-col">
                <span>{engivia.body}</span>
                <div>
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
              </div>
            </div>
          ))}
        </div>
      )}
    </BaseLayout>
  );
};

export default Settings;
