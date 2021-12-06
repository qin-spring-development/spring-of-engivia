import type { NextPage } from "next";
import Image from "next/image";
import Head from "next/head";

const Custom500: NextPage = () => {
  return (
    <>
      <Head>
        <title>システムエラー</title>
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
          システムエラーが発生しました。
        </p>
        <p className="p-4 text-2xl font-bold text-gray-900">
          管理者へお問い合わせください。
        </p>
      </div>
    </>
  );
};

export default Custom500;
