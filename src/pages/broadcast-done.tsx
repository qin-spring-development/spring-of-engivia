import type { NextPage } from "next";
import { useRouter } from "next/router";
import { BaseLayout } from "src/components/Layouts/BaseLayout";
import { BroadcastTitle } from "src/components/Broadcast/BroadcastTitle";
import { useSubscribeEngivias } from "src/hooks/useSubscribe";
import { useIsAdmin } from "src/hooks/useSharedState";
import { EngiviaList } from "src/components/Engivia/EngiviaList";
import { deleteBroadcast } from "src/lib/db";

const BroadcastDone: NextPage = () => {
  const router = useRouter();
  const broadcastId = router.query.id as string;
  const engivias = useSubscribeEngivias(broadcastId);
  const { isAdmin } = useIsAdmin();

  const onDeleteBroadcast = () => {
    deleteBroadcast(broadcastId);
    router.push("/broadcasts");
  };

  return (
    <BaseLayout title="放送前">
      <div className="flex relative justify-center items-center">
        <BroadcastTitle broadcastId={broadcastId} />
        {isAdmin && (
          <button
            onClick={onDeleteBroadcast}
            className="absolute right-0 py-2 px-4 mr-2 text-blue-600 bg-light-blue-100 rounded-md"
          >
            削除する
          </button>
        )}
      </div>
      {engivias && <EngiviaList engivias={engivias} />}
    </BaseLayout>
  );
};

export default BroadcastDone;
