import type { NextPage } from "next";
import { useRouter } from "next/router";
import { useEffect, useState, useCallback } from "react";
import toast from "react-hot-toast";
import { BaseLayout } from "src/components/Layouts/BaseLayout";
import { Modal } from "src/components/Modal";
import { deleteEngivia } from "src/lib/db";
import { BroadcastTitle } from "src/components/Broadcast/BroadcastTitle";
import { Button } from "src/components/Button";
import { EngiviaCard } from "src/components/Engivia/EngiviaCard";
import { EngiviaInput } from "src/components/Engivia/EngiviaInput";
import {
  useSubscribeBroadcast,
  useSubscribeUserEngivia,
} from "src/hooks/useSubscribe";
import { useSession } from "next-auth/client";

const EngiviaRegistration: NextPage = () => {
  const [session] = useSession();
  const user = session?.user;
  const router = useRouter();
  const broadcastId = router.query.id as string;
  const broadcast = useSubscribeBroadcast(broadcastId);
  const userEngivia = useSubscribeUserEngivia(broadcastId, user?.id as string);
  const [confirm, setConfirm] = useState<boolean>(true);
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    if (broadcast?.status === "IN_PROGRESS") {
      router.push(`/users/broadcasting?id=${broadcastId}`);
    }
    if (user?.isAdmin) {
      router.push(`/admin/broadcasting?id=${broadcastId}`);
    }
  }, [broadcast?.status, broadcastId, router, user]);

  const handleDeleteEngivia = useCallback(() => {
    deleteEngivia(broadcastId, userEngivia.id);
    router.push("/broadcasts");
    toast("エンジビアを削除しました", {
      duration: 4000,
      position: "top-center",
      icon: "🗑️",
    });
  }, [broadcastId, router, userEngivia.id]);

  const handleEditEngivia = useCallback(() => setConfirm(false), []);

  return (
    <BaseLayout title="放送一覧">
      <div className="flex relative justify-center items-center">
        <BroadcastTitle broadcast={broadcast} />
      </div>
      {userEngivia.id !== "" && confirm ? (
        <div>
          <EngiviaCard engivia={userEngivia} />
          <div className="flex justify-center">
            <Button type="button" isPrimary onClick={handleEditEngivia}>
              編集する
            </Button>
            <Button
              type="button"
              isPrimary={false}
              onClick={() => setIsOpen(true)}
            >
              削除する
            </Button>
          </div>
          <Modal isOpen={isOpen} onClose={() => setIsOpen(false)}>
            <div className="inline-block overflow-hidden py-6 px-12 my-8 text-left align-middle bg-white rounded-md shadow-xl transition-all transform">
              <p className="text-2xl">本当に放送を削除しますか？</p>
              <div className="mt-6 text-center">
                <Button type="button" isPrimary onClick={handleDeleteEngivia}>
                  削除する
                </Button>
              </div>
            </div>
          </Modal>
        </div>
      ) : (
        <EngiviaInput
          userEngivia={userEngivia}
          broadcastId={broadcastId}
          setConfirm={setConfirm}
        />
      )}
    </BaseLayout>
  );
};

export default EngiviaRegistration;
