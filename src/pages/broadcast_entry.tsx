import { BaseLayout } from "src/components/Layouts/BaseLayout";
import { Label } from "src/components/Label";
import { ChangeEvent, useState } from "react";
import { TextArea } from "src/components/Form/TextArea";

const BroadcastEntry = () => {
  // Todo: BEFORE|IN_PROGRESS|DONEいずれかが入る Hooks導入次第変更
  const status = "BEFORE";

  // Todo: React Hooks Form を導入次第変更
  const [entry, setEntry] = useState({
    title: "",
  });

  const onChangeEntryHandler = (e: ChangeEvent<HTMLTextAreaElement>) => {
    console.log(e.target.value);
  };

  return (
    <BaseLayout title="放送を作成">
      <div className="mx-auto max-w-3xl">
        <Label status={status} className="pt-16 text-center" />
        <h1 className="py-10 mx-auto text-4xl font-bold text-center text-gray-900">
          第4回エンジビアの泉
        </h1>
        <form>
          {/* Todo: validationのパターンを検討 */}
          <div className="flex flex-col gap-10 w-full">
            <TextArea
              value={entry.title}
              placeholder="エンジビアを入力する"
              rows={3}
              maxlength={100}
              onChange={onChangeEntryHandler}
              classNameAlert=""
              length={0}
            />
            <div className="space-x-4 w-full text-center">
              <button className="py-3 px-8 text-white bg-light-blue-600 rounded-md">
                保存する
              </button>
            </div>
          </div>
        </form>
      </div>
    </BaseLayout>
  );
};

export default BroadcastEntry;
