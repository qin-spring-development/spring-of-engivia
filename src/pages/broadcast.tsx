import { BaseLayout } from "src/components/Layouts/BaseLayout";
import { BroadcastList } from "src/components/BroadcastList";
const Broadcast = () => {
  return (
    <BaseLayout title="放送一覧">
      <BroadcastList />
    </BaseLayout>
  );
};

export default Broadcast;
