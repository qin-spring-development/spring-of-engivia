import { BaseLayout } from "src/components/Layouts/BaseLayout";
import { Label } from "src/components/Label";

const BroadcastEntry = () => {
  // Todo: BEFORE|IN_PROGRESS|DONEいずれかが入る Hooks導入次第変更
  const status = "BEFORE";

  return (
    <BaseLayout title="エンジビアを入力">
      <Label status={status} />
    </BaseLayout>
  );
};

export default BroadcastEntry;
