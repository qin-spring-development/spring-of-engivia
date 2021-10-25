import { UserIcon } from "@heroicons/react/solid";
import { useAuth } from "src/lib/auth";
import { BroadCastList } from "src/components/BroadcastList";

const Broadcast = () => {
  const auth = useAuth();

  return (
    <div className="h-screen bg-gray-100">
      <div className="flex items-center py-5 px-4 bg-white shadow-sm">
        <div className="flex flex-grow items-center">
          <img className="h-10" src="/engivia_logo.png" alt="logo" />
          <h1 className="ml-4 text-xl font-bold text-[#0284C7]">
            エンジビアの泉
          </h1>
        </div>
        {auth?.user ? (
          <img
            className="h-10 rounded-full"
            src={auth.user.photoURL}
            alt="avatar"
          />
        ) : (
          <UserIcon className="p-1 h-10 text-gray-500 bg-gray-200 rounded-full" />
        )}
      </div>
      <div>
        <BroadCastList />
      </div>
    </div>
  );
};

export default Broadcast;
