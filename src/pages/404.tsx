import type { NextPage } from "next";
import { BaseLayout } from "src/components/Layouts/BaseLayout";
import Link from "next/link";

const Custom404: NextPage = () => {
  return (
    <BaseLayout title="404:ページが見つかりません">
      <div className="flex justify-center ">
        <div className="flex items-center h-screen text-3xl font-bold">
          <ul>
            <li className="text-gray-900">
              お探しのページは見つかりませんでした。
            </li>
            <li className="text-gray-900">
              URLをご確認の上、再度お試しください。
            </li>
            <Link href="/broadcasts">
              <button className="text-xl text-light-blue-600">
                トップへ戻る
              </button>
            </Link>
          </ul>
        </div>
      </div>
    </BaseLayout>
  );
};

export default Custom404;
