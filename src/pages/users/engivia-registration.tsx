import type { GetServerSideProps, NextPage } from "next";
import { useRouter } from "next/router";
import { useState } from "react";
import { BaseLayout } from "src/components/Layouts/BaseLayout";
import { EngiviaType, BroadcastType } from "src/types/interface";
import { deleteEngivia } from "src/lib/db";
import { getUserEngivia, getBroadcast } from "src/lib/db-admin";
import { BroadcastTitle } from "src/components/Broadcast/BroadcastTitle";
import { initialEngiviaInfo } from "src/constant/initialState";
import { Button } from "src/components/Button";
import { EngiviaCard } from "src/components/Engivia/EngiviaCard";
import { EngiviaInput } from "src/components/Engivia/EngiviaInput";

type Props = {
  userEngivia: EngiviaType;
  broadcast: BroadcastType;
};

const EngiviaRegistration: NextPage<Props> = ({ userEngivia, broadcast }) => {
  const router = useRouter();
  const [confirm, setConfirm] = useState<boolean>(true);
  const [engiviaBody, setEngiviaBody] = useState<string>(userEngivia?.body);

  const handleDeleteEngivia = () => {
    deleteEngivia(broadcast.id, userEngivia.id);
    router.push("/broadcasts");
  };
  const handleEditEngivia = () => {
    setConfirm(false);
  };

  return (
    <BaseLayout title="放送一覧">
      <div className="flex relative justify-center items-center">
        <BroadcastTitle broadcast={broadcast} />
      </div>

      {/* {userEngivia.id !== "" && confirm ? ( */}
      {userEngivia !== undefined && confirm ? (
        <div>
          <EngiviaCard engivia={userEngivia} engiviaBody={engiviaBody} />
          <div className="flex justify-center">
            <Button
              isSubmitting={false}
              type="button"
              isPrimary={true}
              onClick={handleEditEngivia}
            >
              編集する
            </Button>
            <Button
              isSubmitting={false}
              type="button"
              isPrimary={false}
              onClick={handleDeleteEngivia}
            >
              削除する
            </Button>
          </div>
        </div>
      ) : (
        <EngiviaInput
          userEngivia={userEngivia}
          broadcast={broadcast}
          engiviaBody={engiviaBody}
          setEngiviaBody={setEngiviaBody}
        />
      )}
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
