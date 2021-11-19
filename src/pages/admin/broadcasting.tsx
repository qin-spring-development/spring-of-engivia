import type { GetServerSideProps, NextPage } from "next";
import { useRouter } from "next/router";
import { BaseLayout } from "src/components/Layouts/BaseLayout";
import {
  updateBroadcastFeatureId,
  beginBroadcast,
  endBroadcast,
} from "src/lib/db";
import { BroadcastTitle } from "src/components/Broadcast/BroadcastTitle";
import { useSubscribeEngivias } from "src/hooks/useSubscribe";
import { BroadcastType, EngiviaType } from "src/types/interface";
import { Button } from "src/components/Button";
import { getBroadcast } from "src/lib/db-admin";

type Props = {
  broadcast: BroadcastType;
};

const Broadcasting: NextPage<Props> = ({ broadcast }) => {
  const router = useRouter();
  const broadcastId = broadcast.id;
  const engivias = useSubscribeEngivias(broadcastId);

  const onDisplay = async (broadcastId: string, engiviaId: string) => {
    updateBroadcastFeatureId(broadcastId, engiviaId, true);
  };

  const onSetNull = (broadcastId: string, engiviaId: string) => {
    updateBroadcastFeatureId(broadcastId, engiviaId, false);
  };

  const handleBeginBroadcast = () => {
    beginBroadcast(broadcastId);
  };

  const onEndBroadcast = () => {
    endBroadcast(broadcastId);
    router.push("/broadcasts");
  };

  const handleEditBroadcast = () => {
    router.push({
      pathname: "/admin/broadcast-registration",
      query: { id: router.query.id },
    });
  };

  return (
    <BaseLayout title="管理画面">
      <div className="mx-auto max-w-6xl">
        <div className="flex relative justify-center items-center">
          <BroadcastTitle broadcast={broadcast} />
          <div className="absolute right-0">
            {broadcast?.status === "BEFORE" ? (
              <div>
                <Button
                  isSubmitting={false}
                  isPrimary={true}
                  type="button"
                  onClick={handleBeginBroadcast}
                >
                  放送を開始する
                </Button>
                <Button
                  isSubmitting={false}
                  isPrimary={false}
                  type="button"
                  onClick={handleEditBroadcast}
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
    </BaseLayout>
  );
};

export default Broadcasting;

export const getServerSideProps: GetServerSideProps = async (context) => {
  const broadcastId = context.query.id as string;
  const broadcast = await getBroadcast(broadcastId);
  return { props: { broadcast } };
};
