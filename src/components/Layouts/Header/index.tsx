import Image from "next/image";
import Link from "next/link";
import { UserIcon } from "@heroicons/react/solid";
import { signOut, useSession } from "next-auth/client";
import { useUser } from "src/hooks/useSharedState";
import { users } from "src/constant/users";
import { UserType } from "src/types/interface";

export const Header = () => {
  const [session] = useSession();
  const { user, setUser } = useUser();

  const changeUserHandler = (user: UserType) => {
    setUser(user);
  };

  return (
    <header>
      <div className="flex items-center py-3 px-6 bg-white shadow-sm">
        <div className="flex flex-grow gap-2 items-center">
          <Link href="/broadcasts">
            <a>
              <Image
                src="/engivia_logo_with_title.png"
                alt="エンジビアの泉"
                loading="eager"
                width={160}
                height={25}
              />
            </a>
          </Link>
        </div>
        <span className="mr-5">{user.name}</span>
        <button
          onClick={() => changeUserHandler(users[0])}
          className="py-1 px-2 mr-3 bg-gray-300 hover:bg-gray-200 rounded-md"
        >
          管理者
        </button>
        <button
          onClick={() => changeUserHandler(users[1])}
          className="py-1 px-2 mr-3 bg-gray-300 hover:bg-gray-200 rounded-md"
        >
          userA
        </button>
        <button
          onClick={() => changeUserHandler(users[2])}
          className="py-1 px-2 mr-3 bg-gray-300 hover:bg-gray-200 rounded-md"
        >
          userB
        </button>
        <button
          onClick={() => changeUserHandler(users[3])}
          className="py-1 px-2 mr-3 bg-gray-300 hover:bg-gray-200 rounded-md"
        >
          userC
        </button>

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
