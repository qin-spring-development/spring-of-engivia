import type { NextPage } from "next";
import { useEffect } from "react";
import { useRouter } from "next/router";
import {
  useSubscribeBroadcast,
  useSubscribeFeatureEngivia,
  useSubscribeLikes,
  useSubscribeTotalLikes,
  useSubscribeJoinUsers,
} from "src/hooks/useSubscribe";
import { BaseLayout } from "src/components/Layouts/BaseLayout";
import { BroadcastTitle } from "src/components/Broadcast/BroadcastTitle";
import { EngiviaCardWithTotalLikes } from "src/components/Engivia/EngiviaCardWithTotalLikes";
import { EngiviaJoinUsers } from "src/components/Engivia/EngiviaJoinUsers";
import { SwitchButton } from "src/components/SwitchButton";
import { addJoinUser } from "src/lib/db";
import { useSession } from "next-auth/client";
import useWindowSize from "react-use/lib/useWindowSize";
import Confetti from "react-confetti";
import useSound from "use-sound";

const Broadcasting: NextPage = () => {
  const [session] = useSession();
  const user = session?.user;
  const router = useRouter();
  const broadcastId = router.query.id as string;
  const { width, height } = useWindowSize();
  const [play] = useSound("/kansei.mp3");

  const broadcast = useSubscribeBroadcast(broadcastId);
  const featureEngivia = useSubscribeFeatureEngivia(broadcastId);
  const likes = useSubscribeLikes(
    broadcastId,
    featureEngivia?.id,
    user?.id as string
  );
  const totalLikes = useSubscribeTotalLikes(broadcastId, featureEngivia?.id);
  const joinUsers = useSubscribeJoinUsers(broadcastId, featureEngivia?.id);
  const currentTotalLikes =
    joinUsers.length != 0 && totalLikes
      ? Math.round((totalLikes / joinUsers.length) * 5 * 10) / 10
      : 0;

  useEffect(() => {
    if (broadcast?.status === "DONE") {
      setTimeout(() => router.push("/broadcasts"), 5000);
    }
    if (featureEngivia?.id && user) {
      addJoinUser(broadcastId, featureEngivia.id, user);
    }
  }, [
    broadcast?.status,
    featureEngivia,
    broadcastId,
    user,
    router,
    session?.user.isAdmin,
  ]);

  useEffect(() => {
    if (currentTotalLikes === 100) {
      play();
    }
  }, [currentTotalLikes, play]);

  return (
    <BaseLayout title="放送中">
      {currentTotalLikes === 100 && <Confetti width={width} height={height} />}
      <div className="flex relative justify-center items-center">
        <BroadcastTitle broadcast={broadcast} />
        <EngiviaJoinUsers joinUsers={joinUsers} />
      </div>
      {broadcast?.status === "DONE" ? (
        <div className="mx-auto text-3xl text-center">
          <p className="mb-2">本日のエンジビアの泉は終了しました。</p>
          <p>ご視聴ありがとうございました！</p>
        </div>
      ) : featureEngivia === undefined ? (
        <div className="mx-auto max-w-2xl">
          <div className="py-10 px-10 mb-2 bg-white rounded-lg">
            <span className="text-3xl">次のエンジビアをお待ちください</span>
          </div>
        </div>
      ) : (
        <div>
          <EngiviaCardWithTotalLikes
            engivia={featureEngivia}
            currentTotalLikes={currentTotalLikes}
          />
          <div className="mx-auto max-w-2xl">
            <div className="flex justify-center items-center mt-40">
              <SwitchButton
                broadcastId={broadcastId}
                featureEngivia={featureEngivia}
                likes={likes}
              />
              <div className="inline ml-10 text-4xl font-bold text-[#0284C7]">
                <span>{likes === undefined ? 0 : likes}</span>
                <span className="text-xl">へえ</span>
              </div>
            </div>
          </div>
        </div>
      )}
    </BaseLayout>
  );
};

export default Broadcasting;
