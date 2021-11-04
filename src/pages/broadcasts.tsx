import { NextPage } from "next";
import { BaseLayout } from "src/components/Layouts/BaseLayout";
import { BroadCastList } from "src/components/Broadcast/BroadcastList";

const Broadcast: NextPage = () => {
  return (
    <BaseLayout title="放送一覧">
      <BroadCastList />
    </BaseLayout>
  );
};

export default Broadcast;
