import { BaseLayout } from "src/components/Layouts/BaseLayout";

// pages/404.js
export default function Custom404() {
  return (
    <BaseLayout title="404:ページが見つかりません">
      <div className="flex justify-center items-center h-1/4">
        <h1 className="text-3xl font-bold">ページが見つかりません</h1>
        {/* <link rel="" href="">Topに戻る</link> */}
      </div>
    </BaseLayout>
  );
}
