import type { GetServerSideProps, NextPage } from "next";
import { useCallback } from "react";
import { useRouter } from "next/router";
import { useForm, SubmitHandler } from "react-hook-form";
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
                onClick={onDeleteBroadcast}
                isPrimary={false}
                className="my-5 text-center"
              >
                放送を削除する
              </Button>
            </form>
          </div>
        )}
      </div>
      {engivias && <EngiviaList engivias={engivias} />}
    </BaseLayout>
  );
};

export default BroadcastDone;

export const getServerSideProps: GetServerSideProps = async (context) => {
  const broadcastId = context.query.id as string;
  const engivias = await getEngivias(broadcastId);
  return { props: { engivias } };
};
