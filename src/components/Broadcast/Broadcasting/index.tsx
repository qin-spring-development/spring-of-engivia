import type { FC } from "react";
import {
  useSubscribeFeatureEngivia,
  useSubscribeLikes,
  useSubscribeTotalLikes,
  useSubscribeJoinUsers,
} from "src/hooks/useSubscribe";
import { useBroadcastId, useUser } from "src/hooks/useSharedState";
import { voteLikes, updateTotalLikes } from "src/lib/db";
import { Label } from "src/components/Label";

export const Broadcasting: FC = () => {
  const { user } = useUser();
  const { broadcastId } = useBroadcastId();
  const featureEngivia = useSubscribeFeatureEngivia(broadcastId);
  const likes = useSubscribeLikes(broadcastId, featureEngivia?.id, user.uid);
  const totalLikes = useSubscribeTotalLikes(broadcastId, featureEngivia?.id);
  const joinUsers = useSubscribeJoinUsers(broadcastId, featureEngivia?.id);

  const handleClick = async () => {
    voteLikes(broadcastId, featureEngivia.id, user);
    updateTotalLikes(broadcastId, featureEngivia.id);
  };

  return (
    <>
      {featureEngivia === null ? (
        <div className="mx-auto max-w-4xl">
          <div className="py-10 px-10 mb-2 bg-white rounded-lg">
            <span className="text-3xl">次のエンジビアをお待ちください</span>
          </div>
        </div>
      ) : (
        <div>
          <div className="absolute right-0">
            <div className="mb-3 divide-y">
              {joinUsers.map((joinUser) => (
                <div key={joinUser.uid}>
                  <div className="flex justify-between items-center my-3">
                    <div className="flex items-center">
                      <img
                        className="mr-2 h-10 rounded-full"
                        src={joinUser.image}
                        alt="avatar"
                      />
                      <h1>{joinUser.name}</h1>
                    </div>
                    <span className="py-1 px-3 text-sm text-gray-700 bg-white rounded-full border-2">
                      {`${joinUser.likes} へえ`}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
          <div className="mx-auto max-w-4xl">
            <div className="py-7 px-10 mb-2 bg-white rounded-lg">
              <div className="flex flex-col items-center mb-10">
                <p className="mb-5 text-xl font-bold text-[#0284C7]">
                  {`エンジビア${featureEngivia?.engiviaNumber}`}
                </p>
                <p className="text-4xl">{featureEngivia?.body}</p>
              </div>
              <div className="flex justify-between items-end">
                <div className="flex items-center">
                  <img
                    className="mr-2 h-8 rounded-full"
                    src={featureEngivia?.postUser?.image}
                    alt="avatar"
                  />
                  <span>
                    {featureEngivia.postUser?.name
                      ? featureEngivia.postUser?.name
                      : "No name"}
                  </span>
                </div>
                <div className="inline py-3 px-10 text-4xl font-bold text-[#0284C7] bg-[#FEF3C7] rounded-lg">
                  <span>{totalLikes}</span>
                  <span className="text-xl">へえ</span>
                </div>
              </div>
            </div>
            <div className="flex items-center my-10">
              <button
                disabled={likes >= 20 && true}
                className="py-2 px-4 text-white bg-red-500 active:bg-red-900 rounded-lg"
                onClick={handleClick}
              >
                へえボタン
              </button>
              <div className="inline ml-10 text-4xl font-bold text-[#0284C7]">
                <span>{likes}</span>
                <span className="text-xl">へえ</span>
              </div>
              <p>{user.name}</p>
            </div>
          </div>
        </div>
      )}
    </>
  );
};
