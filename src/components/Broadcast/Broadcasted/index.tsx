import type { FC } from "react";
import { useSubscribeBroadcast } from "src/hooks/useSubscribe";
import { useBroadcastId, useUserEngivia } from "src/hooks/useSharedState";

export const Broadcasted: FC = () => {
  const { broadcastId, setBroadcastId } = useBroadcastId();
  const { setUserEngivia } = useUserEngivia();

  const broadcast = useSubscribeBroadcast(broadcastId);

  const onBackBroadcasts = () => {
    setBroadcastId("");
    setUserEngivia(null);
  };

  return (
    <>
      <div className="mx-auto max-w-4xl">
        <div className="py-10 px-10 mb-2 bg-white rounded-lg">
          <span className="text-3xl">{`${broadcast.title}は終了しました`}</span>
        </div>
        <button
          onClick={onBackBroadcasts}
          className="py-2 px-4 mr-2 text-white bg-light-blue-600 rounded-md"
        >
          戻る
        </button>
      </div>
    </>
  );
};
