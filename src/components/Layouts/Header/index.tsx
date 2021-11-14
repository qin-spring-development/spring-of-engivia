import { UserIcon } from "@heroicons/react/solid";
import { signOut, useSession } from "next-auth/client";
import { useUser } from "src/hooks/useSharedState";
import Image from "next/image";
import { users } from "src/constant/users";
import { UserType } from "src/types/interface";
import { useUserEngivia } from "src/hooks/useSharedState";

export const Header = () => {
  const [session] = useSession();
  const { user, setUser } = useUser();
  const { setUserEngivia } = useUserEngivia();

  const changeUserHandler = (user: UserType) => {
    setUser(user);
    setUserEngivia(null);
  };

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
