import { BaseLayout } from "src/components/Layouts/BaseLayout";

export default function Custom404() {
  return (
    <BaseLayout title="404:ページが見つかりません">
      <div className="flex justify-center ">
        <h1 className="flex items-center h-screen text-3xl font-bold">
          ページが見つかりません
        </h1>
        {/* <link rel="" href="">Topに戻る</link> */}
      </div>
    </BaseLayout>
  );
}
