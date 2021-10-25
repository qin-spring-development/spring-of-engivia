import { UserIcon } from "@heroicons/react/solid";
import { useSession } from "next-auth/client";

const Broadcast = () => {
  const [session] = useSession();

  return (
    <div className="h-screen bg-gray-100">
      <div className="flex items-center py-5 px-4 bg-white shadow-sm">
        <div className="flex flex-grow items-center">
          <img className="h-10" src="/engivia_logo.png" alt="logo" />
          <h1 className="ml-4 text-xl font-bold text-[#0284C7]">
            エンジビアの泉
          </h1>
        </div>
        {session?.user ? (
          <img
            className="h-10 rounded-full"
            src={session && session.user.image}
            alt="avatar"
          />
        ) : (
          <UserIcon className="p-1 h-10 text-gray-500 bg-gray-200 rounded-full" />
        )}
      </div>
      <p>{session && session.user.name}</p>
      <p>{session && session.user.email}</p>
      <p>{session && session.user.id}</p>
    </div>
  );
};

export default Broadcast;
