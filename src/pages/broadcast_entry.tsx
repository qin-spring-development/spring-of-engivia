import { BaseLayout } from "src/components/Layouts/BaseLayout";
import { Label } from "src/components/Label";
import { ChangeEvent, useState } from "react";
import { TextArea } from "src/components/Form/TextArea";
import { Button } from "src/components/Button";

const BroadcastEntry = () => {
  // Todo: BEFORE|IN_PROGRESS|DONEいずれかが入る Hooks導入次第変更
  const status = "BEFORE";
  const maxlength = 100;
  const [length, setLength] = useState(0);

  // Todo: React Hooks Form を導入次第変更
  const [entry, setEntry] = useState({
    title: "",
  });

  const onChangeEntryHandler = (e: ChangeEvent<HTMLTextAreaElement>) => {
    console.log(e.target.value);
    console.log(e.target.value.length);

    // エンジビアは100文字以内の文字数制限

    const setLength = e.target.value.replace(/\n/g, "").length;
    if (setLength > 10) alert("10文字以内にしてください");
    return;
  };

  console.log(length);

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
              maxlength={maxlength}
              onChange={onChangeEntryHandler}
              classNameAlert=""
              length={length}
            />
            <div className="w-full text-center">
              <Button
                isSubmitting={false}
                type="button"
                onClick={() => console.log("テスト")}
                isPrimary={true}
              >
                保存する
              </Button>
            </div>
          </div>
        </form>
      </div>
    </BaseLayout>
  );
};

export default BroadcastEntry;
