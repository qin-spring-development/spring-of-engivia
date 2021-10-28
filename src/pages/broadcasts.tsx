import { BaseLayout } from "src/components/Layouts/BaseLayout";
import { BroadCastList } from "src/components/BroadcastList";

const Broadcast = () => {
  return (
    <BaseLayout title="放送一覧">
      <BroadCastList />
    </BaseLayout>
  );
};

export default Broadcast;
