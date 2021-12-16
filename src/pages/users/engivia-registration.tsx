import type { NextPage } from "next";
import { useRouter } from "next/router";
import { useEffect, useState, Fragment } from "react";
import { Dialog, Transition } from "@headlessui/react";
import toast from "react-hot-toast";
import { BaseLayout } from "src/components/Layouts/BaseLayout";
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

  const handleDeleteEngivia = () => {
    deleteEngivia(broadcastId, userEngivia.id);
    router.push("/broadcasts");
    toast("エンジビアを削除しました", {
      duration: 4000,
      position: "top-center",
      icon: "🗑️",
    });
  };
  const handleEditEngivia = () => {
    setConfirm(false);
  };

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

          <Transition appear show={isOpen} as={Fragment}>
            <Dialog
              as="div"
              className="overflow-y-auto fixed inset-0 z-10"
              onClose={() => setIsOpen(false)}
            >
              <div className="px-4 min-h-screen text-center">
                <Transition.Child
                  as={Fragment}
                  enter="ease-out duration-300"
                  enterFrom="opacity-0"
                  enterTo="opacity-100"
                  leave="ease-in duration-200"
                  leaveFrom="opacity-100"
                  leaveTo="opacity-0"
                >
                  <Dialog.Overlay className="fixed inset-0 bg-gray-800 bg-opacity-75" />
                </Transition.Child>

                <span
                  className="inline-block h-screen align-middle"
                  aria-hidden="true"
                >
                  &#8203;
                </span>
                <Transition.Child
                  as={Fragment}
                  enter="ease-out duration-300"
                  enterFrom="opacity-0 scale-95"
                  enterTo="opacity-100 scale-100"
                  leave="ease-in duration-200"
                  leaveFrom="opacity-100 scale-100"
                  leaveTo="opacity-0 scale-95"
                >
                  <div className="inline-block overflow-hidden py-6 px-12 my-8 text-left align-middle bg-white rounded-md shadow-xl transition-all transform">
                    <p className="text-2xl">本当にエンジビアを削除しますか？</p>
                    <div className="mt-6 text-center">
                      <Button
                        type="button"
                        isPrimary
                        onClick={handleDeleteEngivia}
                      >
                        削除する
                      </Button>
                    </div>
                  </div>
                </Transition.Child>
              </div>
            </Dialog>
          </Transition>
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
