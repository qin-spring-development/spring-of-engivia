import type { NextPage } from "next";
import { useState } from "react";
import { useRouter } from "next/router";
import { BaseLayout } from "src/components/Layouts/BaseLayout";
import useSWR from "swr";
import { BroadcastTitle } from "src/components/Broadcast/BroadcastTitle";
import { useSubscribeBroadcast } from "src/hooks/useSubscribe";
import { EngiviaList } from "src/components/Engivia/EngiviaList";
import { deleteBroadcast, setYoutubeURL } from "src/lib/db";
import { convertEmbedURL } from "src/lib/convertEmbedURL";
import { Button } from "src/components/Button";
import { Form } from "src/components/Form";
import { useSession } from "next-auth/client";
import { fetcher } from "src/lib/fetcher";

const BroadcastDone: NextPage = () => {
  const [session] = useSession();
  const [url, setUrl] = useState<string>("");
  const router = useRouter();
  const broadcastId = router.query.id as string;
  const broadcast = useSubscribeBroadcast(broadcastId);
  const { data, error } = useSWR(
    `/api/engivias?broadcastId=${broadcastId}`,
    fetcher
  );

  const onDeleteBroadcast = () => {
    deleteBroadcast(broadcastId);
    router.push("/broadcasts");
  };

  const onSetYoutubeURL = async () => {
    const convertedUrl = convertEmbedURL(url);
    setYoutubeURL(broadcastId, convertedUrl);
  };

  console.log({ data });

  if (error) return <div>failed to load</div>;
  if (!data) return <div>loading...</div>;

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
            <Form
              type="text"
              value={url}
              onChange={(e) => setUrl(e.target.value)}
              placeholder="URLを入力する"
            />
            <Button
              type="button"
              isSubmitting={false}
              onClick={onSetYoutubeURL}
              isPrimary={true}
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
          </div>
        )}
      </div>
      <EngiviaList engivias={data.engivias} />
    </BaseLayout>
  );
};

export default BroadcastDone;
