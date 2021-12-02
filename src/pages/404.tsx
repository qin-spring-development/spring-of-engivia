import type { NextPage } from "next";
import Link from "next/link";
import Image from "next/image";
import Head from "next/head";

const Custom404: NextPage = () => {
  return (
    <>
      <Head>
        <title>ページが見つかりません</title>
      </Head>
      <div className="flex flex-col justify-center items-center h-screen">
        <div className="mb-3">
          <Image
            src="/engivia_logo.png"
            alt="エンジビアの泉"
            loading="eager"
            width={56}
            height={60}
          />
        </div>
        <div className="mb-4">
          <Image
            src="/logo.png"
            alt="エンジビアの泉"
            loading="eager"
            width={206}
            height={36}
            priority
          />
        </div>
        <p className="p-4 text-2xl font-bold text-gray-900">
          お探しのページは見つかりませんでした。
        </p>
        <p className="p-4 text-2xl font-bold text-gray-900">
          URLをご確認の上、再度お試しください。
        </p>
        <Link href="/broadcasts">
          <a className="p-4 text-xl text-light-blue-600">トップへ戻る</a>
        </Link>
      </div>
    </>
  );
};

export default Custom404;
