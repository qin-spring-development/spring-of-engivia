import type { GetServerSideProps, NextPage } from "next";
import { useCallback, useState, Fragment } from "react";
import { useRouter } from "next/router";
import { useForm, SubmitHandler } from "react-hook-form";
import { Dialog, Transition } from "@headlessui/react";
import { BaseLayout } from "src/components/Layouts/BaseLayout";
import { BroadcastTitle } from "src/components/Broadcast/BroadcastTitle";
import { useSubscribeBroadcast } from "src/hooks/useSubscribe";
import { EngiviaList } from "src/components/Engivia/EngiviaList";
import { deleteBroadcast, setYoutubeURL } from "src/lib/db";
import { convertEmbedURL } from "src/lib/convertEmbedURL";
import { Button } from "src/components/Button";
import { InputFiled } from "src/components/Form/InputFiled";
import { getEngivias } from "src/lib/db-admin";
import { BroadcastType, EngiviaType } from "src/types/interface";
import { useSession } from "next-auth/client";

type Props = {
  broadcast: BroadcastType;
  engivias: EngiviaType[];
};

type UrlForm = {
  url: string;
};

const BroadcastDone: NextPage<Props> = ({ engivias }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [session] = useSession();

  const router = useRouter();
  const broadcastId = router.query.id as string;
  const broadcast = useSubscribeBroadcast(broadcastId);

  const { register, handleSubmit } = useForm<UrlForm>();

  const onDeleteBroadcast = useCallback(() => {
    deleteBroadcast(broadcastId);
    router.push("/broadcasts");
  }, [broadcastId, router]);

  const onSubmitURL: SubmitHandler<UrlForm> = useCallback(
    async (data) => {
      const convertedUrl = convertEmbedURL(data.url);
      setYoutubeURL(broadcastId, convertedUrl);
    },
    [broadcastId]
  );

  const onOpenModal = () => {
    setIsOpen(true);
  };

  return (
    <BaseLayout title="放送済み">
      <BroadcastTitle broadcast={broadcast} />
      <div className="flex flex-col items-center text-center">
        {broadcast?.broadCastUrl && (
          <iframe
            width="896"
            height="504"
            src={broadcast.broadCastUrl}
            title="YouTube video"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
            className="mb-5 w-full max-w-4xl"
          ></iframe>
        )}
        {session?.user.isAdmin && (
          <div className="w-full max-w-4xl">
            <form onSubmit={handleSubmit(onSubmitURL)}>
              <InputFiled
                id="url"
                type="text"
                value={broadcast?.broadCastUrl}
                placeholder="URLを入力する"
                register={register("url")}
              />
              <Button
                type="submit"
                isSubmitting={false}
                isPrimary
                className="my-5 text-center"
              >
                保存する
              </Button>
              <Button
                type="button"
                isSubmitting={false}
                onClick={onOpenModal}
                isPrimary={false}
                className="my-5 text-center"
              >
                放送を削除する
              </Button>
            </form>
          </div>
        )}
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
                <p className="text-2xl">本当に放送を削除しますか？</p>
                <div className="mt-6 text-center">
                  <Button
                    type="button"
                    isSubmitting={false}
                    isPrimary={true}
                    onClick={onDeleteBroadcast}
                  >
                    削除する
                  </Button>
                </div>
              </div>
            </Transition.Child>
          </div>
        </Dialog>
      </Transition>

      {engivias && (
        <div className="pb-10">
          <EngiviaList engivias={engivias} />
        </div>
      )}
    </BaseLayout>
  );
};

export default BroadcastDone;

export const getServerSideProps: GetServerSideProps = async (context) => {
  const broadcastId = context.query.id as string;
  const engivias = await getEngivias(broadcastId);
  return { props: { engivias } };
};
