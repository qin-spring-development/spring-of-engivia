import type { GetServerSideProps, NextPage } from "next";
import { useRouter } from "next/router";
import { BaseLayout } from "src/components/Layouts/BaseLayout";
import { EngiviaType, BroadcastType } from "src/types/interface";
import { deleteEngivia } from "src/lib/db";
import { getUserEngivia, getBroadcast } from "src/lib/db-admin";
import { BroadcastTitle } from "src/components/Broadcast/BroadcastTitle";
import { Button } from "src/components/Button";
import { useSession } from "next-auth/client";

type Props = {
  userEngivia: EngiviaType;
  broadcast: BroadcastType;
};

const EngiviaConfirm: NextPage<Props> = ({ userEngivia, broadcast }) => {
  const [session] = useSession();
  const user = session?.user;
  const router = useRouter();

  const handleDeleteEngivia = () => {
    deleteEngivia(broadcast.id, userEngivia.id);
    router.push("/broadcasts");
  };
  const handleEditEngivia = () => {
    router.push({
      pathname: "/users/engivia-registration",
      query: { id: router.query.id, uid: user?.id },
    });
  };

  return (
    <BaseLayout title="放送一覧">
      <div>
        <BroadcastTitle broadcast={broadcast} />
        <div>
          <div className="flex justify-center">
            <Button type="button" isPrimary onClick={handleEditEngivia}>
              編集する
            </Button>
            <Button
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
