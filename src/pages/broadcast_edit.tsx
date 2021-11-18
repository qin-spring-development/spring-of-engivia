import { Button } from "src/components/Button";
import { BaseLayout } from "src/components/Layouts/BaseLayout";
import { Label } from "src/components/Label";

const status = "BEFORE";

const handelEdit = {};

export const Broadcast_Edit = () => {
  return (
    <BaseLayout title="エンジビアを編集">
      <div className="flex flex-col mx-auto text-center">
        <Label className="mt-10" status={status} />
        <div>
          <h1 className="mt-5 text-3xl font-bold">第4回エンジビアの泉</h1>
        </div>
        <div className="py-6 px-8 mx-auto mt-10 max-w-screen-sm h-auto bg-white">
          <div>
            <p className="text-4xl text-left ">
              HTMLにはポータルという便利な要素がある
            </p>
          </div>
          <div className="flex my-5">
            <div className="mr-2">アイコン</div>
            <div className="text-gray-700">松平 ケン</div>
          </div>
        </div>
        <div className="mt-7">
          <Button
            isSubmitting={false}
            type="button"
            onClick={() => console.log("テスト")}
            isPrimary={true}
          >
            編集する
          </Button>
          <Button
            isSubmitting={false}
            type="button"
            onClick={() => console.log("テスト")}
            isPrimary={false}
          >
            削除する
          </Button>
        </div>
      </div>
    </BaseLayout>
  );
};

export default Broadcast_Edit;
