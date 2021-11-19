import type { GetServerSideProps, NextPage } from "next";
import { useRouter } from "next/router";
import { BaseLayout } from "src/components/Layouts/BaseLayout";
import { EngiviaType, BroadcastType } from "src/types/interface";
import { deleteEngivia } from "src/lib/db";
import { getUserEngivia, getBroadcast } from "src/lib/db-admin";
import { BroadcastTitle } from "src/components/Broadcast/BroadcastTitle";
import { useUser } from "src/hooks/useSharedState";
import { EngiviaCard } from "src/components/Engivia/EngiviaCard";
import { Button } from "src/components/Button";

type Props = {
  userEngivia: EngiviaType;
  broadcast: BroadcastType;
};

const EngiviaConfirm: NextPage<Props> = ({ userEngivia, broadcast }) => {
  const { user } = useUser();
  const router = useRouter();

  const handleDeleteEngivia = () => {
    deleteEngivia(broadcast.id, userEngivia.id);
    router.push("/broadcasts");
  };
  const handleEditEngivia = () => {
    router.push({
      pathname: "/users/engivia-registration",
      query: { id: router.query.id, uid: user.uid },
    });
  };

  return (
    <BaseLayout title="放送一覧">
      <div>
        <BroadcastTitle broadcast={broadcast} />
        <EngiviaCard engivia={userEngivia} />
        <div>
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
      </div>
    </BaseLayout>
  );
};

export default EngiviaConfirm;

export const getServerSideProps: GetServerSideProps = async (context) => {
  const broadcastId = context.query.id as string;
  const uid = context.query.uid as string;
  const userEngivia = await getUserEngivia(broadcastId, uid);
  const broadcast = await getBroadcast(broadcastId);
  return { props: { userEngivia, broadcast } };
};
