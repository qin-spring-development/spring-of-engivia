import { BaseLayout } from "src/components/Layouts/BaseLayout";

const Setting = () => {
  return (
    <BaseLayout title="放送を作成">
      <div className="mx-auto max-w-3xl">
        <h1 className="py-10 mx-auto text-4xl font-bold text-gray-900">
          放送を作成
        </h1>
        <form>
          <div className="flex flex-col gap-10 w-full">
            <div className="w-full text-left">
              <input
                type="text"
                id=""
                name=""
                className="py-1 px-3 w-full text-base leading-8 text-gray-500 bg-white rounded-sm border border-gray-300 focus:ring outline-none"
                defaultValue="タイトルを入力する"
              />
            </div>
            <div className="w-full text-left ">
              <input
                type="date"
                id=""
                name=""
                className="py-1 px-3 w-full text-base leading-8 text-gray-500 bg-white rounded-sm border border-gray-300 focus:ring outline-none"
                defaultValue="2021/09/03"
              />
            </div>
            <div className=" space-x-4 w-full text-center">
              <button className="py-3 px-8 text-white bg-light-blue-600 rounded-md">
                保存する
              </button>
              <button className="py-3 px-8 ml-8 text-light-blue-700 bg-light-blue-100 rounded-md">
                キャンセル
              </button>
            </div>
          </div>
        </form>
      </div>
    </BaseLayout>
  );
};

export default Setting;
