import { UserIcon } from "@heroicons/react/solid";
import { signOut, useSession } from "next-auth/client";
import Image from "next/image";

export const Header = () => {
  const [session] = useSession();

  return (
    <header>
      <div className="flex items-center py-5 px-4 bg-white shadow-sm">
        <div className="flex flex-grow gap-2 items-center">
          <Image
            src="/engivia_logo.png"
            alt="エンジビアの泉"
            loading="eager"
            width={30}
            height={32}
          />

          <Image
            src="/logo.png"
            alt="エンジビアの泉"
            loading="eager"
            width={126}
            height={22.5}
            priority
          />
        </div>
        <button
          onClick={() => signOut({ callbackUrl: "/" })}
          className="py-2 px-4 hover:bg-gray-100 rounded-md border-2"
        >
          ログアウト
        </button>
        {session?.user ? (
          /* Todo: next.jsのImageが使えないので一旦このまま */
          <img
            className="h-10 rounded-full"
            src={session && session.user.image}
            alt="avatar"
          />
        ) : (
          /* Todo: next.jsのImageが使えないので一旦このまま */
          <UserIcon className="p-1 h-10 text-gray-500 bg-gray-200 rounded-full" />
        )}
      </div>
    </header>
  );
};
