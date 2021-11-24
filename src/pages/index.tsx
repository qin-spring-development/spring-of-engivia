import Head from "next/head";
import SlackIcon from "src/svg/slack-icon.svg";
import { signIn, signOut } from "next-auth/client";
import Image from "next/image";

export default function Home() {
  return (
    <div>
      <Head>
        <title>エンジビアの泉</title>
        <meta
          name="description"
          content="気軽にエンジビアの豆知識・ムダ知識を披露する場。Zoomを同時に開きながら楽しむアプリ。"
        />
      </Head>

      <div className="flex">
        <div className="flex flex-col items-center my-auto w-[43%]">
          <Image
            src="/engivia_logo.png"
            alt="エンジビアの泉"
            loading="eager"
            width={56}
            height={60}
          />

          <h1 className="mt-6">
            <Image
              src="/logo.png"
              alt="エンジビアの泉"
              loading="eager"
              width={206}
              height={36}
              priority
            />
          </h1>
          <p className="mt-2 mb-10">
            <Image
              src="/logo_sub.png"
              alt="〜素晴らしきプログラミング豆知識〜"
              loading="eager"
              width={258}
              height={20}
            />
          </p>
          <button
            onClick={() =>
              signIn("slack", {
                callbackUrl: `${process.env.NEXT_PUBLIC_BASE_URL}/broadcasts`,
              })
            }
            className="flex items-center py-2 px-4 hover:bg-gray-100 rounded-md border-2"
          >
            <SlackIcon />
            <p className="ml-2">Sign in with Slack</p>
          </button>
        </div>
        <img
          className="object-cover w-[57%] h-screen"
          src="/AdobeStock_162810993_Preview.jpeg"
          alt="spring"
        />
      </div>
    </div>
  );
}
