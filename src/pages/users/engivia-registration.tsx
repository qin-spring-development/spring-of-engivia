import type { GetServerSideProps, NextPage } from "next";
import { ChangeEvent } from "react";
import { useRouter } from "next/router";
import { useState } from "react";
import { BaseLayout } from "src/components/Layouts/BaseLayout";
import { EngiviaType, BroadcastType } from "src/types/interface";
import { createEngivia, updateEngivia, createJoinUsers } from "src/lib/db";
import { getUserEngivia, getBroadcast } from "src/lib/db-admin";
import { BroadcastTitle } from "src/components/Broadcast/BroadcastTitle";
import { useUser } from "src/hooks/useSharedState";
import { initialEngiviaInfo } from "src/constant/initialState";
import { Button } from "src/components/Button";

type Props = {
  userEngivia: EngiviaType;
  broadcast: BroadcastType;
};

const EngiviaRegistration: NextPage<Props> = ({ userEngivia, broadcast }) => {
  const { user } = useUser();
  const router = useRouter();
  const [engiviaBody, setEngiviaBody] = useState<string>(userEngivia?.body);

  const handleOnChangeInput = (e: ChangeEvent<HTMLTextAreaElement>) => {
    setEngiviaBody(e.target.value);
  };

  const HandleCreateEngivia = async () => {
    const engivia = await createEngivia(broadcast.id, engiviaBody, user);
    createJoinUsers(broadcast.id, engivia.id, user);
    router.push({
      pathname: "/users/engivia-confirm",
      query: { id: router.query.id, uid: user.uid },
    });
  };

  const HandleUpdateEngivia = async () => {
    updateEngivia(broadcast.id, userEngivia.id, engiviaBody);
    setTimeout(() => {
      router.push({
        pathname: "/users/engivia-confirm",
        query: { id: router.query.id, uid: user.uid },
      });
    }, 300);
  };

  return (
    <BaseLayout title="放送一覧">
      <div className="flex relative justify-center items-center">
        <BroadcastTitle broadcast={broadcast} />
      </div>
      <div className="flex flex-col justify-center items-center">
        <textarea
          name="body"
          id="body"
          cols={60}
          rows={3}
          placeholder="エンジビアを入力する"
          value={engiviaBody}
          className="p-4 mb-10 focus:outline-none"
          onChange={handleOnChangeInput}
        />
        <div className="flex justify-center">
          <Button
            isSubmitting={false}
            type="button"
            isPrimary={true}
            onClick={
              userEngivia?.id === "" ? HandleCreateEngivia : HandleUpdateEngivia
            }
          >
            保存する
          </Button>
        </div>
      </div>
    </BaseLayout>
  );
};

export default EngiviaRegistration;

export const getServerSideProps: GetServerSideProps = async (context) => {
  const broadcastId = context.query.id as string;
  const uid = context.query.uid as string;
  const userEngivia = await getUserEngivia(broadcastId, uid);
  const broadcast = await getBroadcast(broadcastId);
  if (!userEngivia) {
    return { props: { initialEngiviaInfo, broadcast } };
  } else {
    return { props: { userEngivia, broadcast } };
  }
};
