import { UserIcon } from "@heroicons/react/solid";
import { useAuth } from "src/lib/auth";

export const Header = () => {
  const auth = useAuth();

  return (
    <header>
      <div className="flex items-center py-5 px-4 bg-white shadow-sm">
        <div className="flex flex-grow items-center">
          {/* Todo: next.jsのImageが使えないので一旦このまま */}
          <img className="h-10" src="/engivia_logo.png" alt="logo" />
          <h1 className="ml-4 text-xl font-bold text-light-blue-600">
            エンジビアの泉
          </h1>
        </div>
        {auth?.user ? (
          /* Todo: next.jsのImageが使えないので一旦このまま */
          <img
            className="h-10 rounded-full"
            src={auth.user.photoURL}
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
