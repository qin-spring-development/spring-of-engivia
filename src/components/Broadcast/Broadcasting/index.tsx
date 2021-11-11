import type { FC } from "react";
import { BaseLayout } from "src/components/Layouts/BaseLayout";
import { BroadcastTitle } from "src/components/Broadcast/BroadcastTitle";
import {
  useSubscribeEngivia,
  useSubscribeBroadcast,
} from "src/hooks/useSubscribe";

type Props = {
  broadcastId: string;
};

const Broadcasting: FC<Props> = ({ broadcastId }) => {
  const engivia = useSubscribeEngivia(broadcastId);
  const broadcast = useSubscribeBroadcast(broadcastId);

  return (
    <BaseLayout title="放送">
      <BroadcastTitle />
      {engivia === null ? (
        <div className="mx-auto max-w-4xl">
          <div className="py-10 px-10 mb-2 bg-white rounded-lg">
            <span className="text-3xl">
              {broadcast?.status === "AFTER"
                ? `${broadcast.title}は終了しました`
                : "次のエンジビアをお待ちください"}
            </span>
          </div>
        </div>
      ) : (
        <div className="mx-auto max-w-4xl">
          <div className="py-7 px-10 mb-2 bg-white rounded-lg">
            <div className="flex flex-col items-center mb-10">
              <p className="mb-5 text-xl font-bold text-[#0284C7]">
                {`エンジビア???`}
              </p>
              <p className="text-4xl">{engivia?.body}</p>
            </div>
            <div className="flex justify-between items-end">
              <div className="flex items-center">
                <img
                  className="mr-2 h-8 rounded-full"
                  src={engivia?.postUser?.photoUrl}
                  alt="avatar"
                />
                <span>
                  {engivia?.postUser.name ? engivia?.postUser.name : "No name"}
                </span>
              </div>
              <div className="inline py-3 px-10 text-4xl font-bold text-[#0284C7] bg-[#FEF3C7] rounded-lg">
                <span>{engivia?.totalLikes}</span>
                <span className="text-xl">へえ</span>
              </div>
            </div>
          </div>
          <div className="flex items-center my-10">
            <button
              className="py-2 px-4 text-white bg-red-500 rounded-lg"
              // onClick={handleClick}
            >
              へえボターン
            </button>
            <div className="inline ml-10 text-4xl font-bold text-[#0284C7]">
              <span>{engivia?.totalLikes}</span>
              <span className="text-xl">へえ</span>
            </div>
          </div>
        </div>
      )}
    </BaseLayout>
  );
};

export default Broadcasting;
