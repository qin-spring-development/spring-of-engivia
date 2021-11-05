import type { NextPage } from "next";
import { db } from "src/lib/firebase";
import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import { EngiviaType } from "src/types/interface";
import { BaseLayout } from "src/components/Layouts/BaseLayout";
import { BroadcastTitle } from "src/components/Broadcast/BroadcastTitle";
import { getEngivia } from "src/lib/db";

const Broadcast: NextPage = () => {
  const [engivia, setEngivia] = useState<EngiviaType | null>();
  const router = useRouter();
  const broadcastId = router.query.id as string;

  useEffect(() => {
    db.collection("broadcasts")
      .doc(broadcastId)
      .onSnapshot(async (doc) => {
        const broadcast = doc.data();
        if (broadcast?.featureId === null) {
          setEngivia(null);
        } else {
          const engivia = (await getEngivia(
            broadcastId,
            broadcast?.featureId
          )) as EngiviaType;
          setEngivia(engivia);
        }
      });
  }, []);

  console.log({ engivia });

  return (
    <BaseLayout title="放送中">
      <BroadcastTitle broadcastId={broadcastId} />
      {engivia === null ? (
        <div className="mx-auto max-w-4xl">
          <div className="py-10 px-10 mb-2 bg-white rounded-lg">
            <span className="text-3xl">次のエンジビアをお待ちください</span>
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
      {/* {broadcast?.featureId === null ? (
        <h1>次のエンジビアをお待ちください</h1>
      ) : (
        <h1>{broadcast.id}</h1>
      )} */}
    </BaseLayout>
  );
};

export default Broadcast;
