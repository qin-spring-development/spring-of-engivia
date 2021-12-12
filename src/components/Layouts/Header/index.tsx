import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import { Menu, Transition } from "@headlessui/react";
import { Fragment } from "react";
import { UserIcon } from "@heroicons/react/solid";
import { LogoutIcon, IdentificationIcon } from "@heroicons/react/outline";
import { signOut, useSession } from "next-auth/client";
import { auth } from "src/lib/firebase";

export const Header = () => {
  const [session] = useSession();
  const router = useRouter();

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
          <p>test</p>
        </div>
        {session?.user ? (
          <div>
            <Menu as="div">
              <div className="flex items-center">
                <Menu.Button>
                  <img
                    className="h-10 rounded-full"
                    src={session.user.image}
                    alt="avatar"
                  />
                </Menu.Button>
              </div>
              <Transition
                as={Fragment}
                enter="transition ease-out duration-100"
                enterFrom="transform opacity-0 scale-95"
                enterTo="transform opacity-100 scale-100"
                leave="transition ease-in duration-75"
                leaveFrom="transform opacity-100 scale-100"
                leaveTo="transform opacity-0 scale-95"
              >
                <Menu.Items className="absolute right-0 z-10 mt-2 w-56 bg-white rounded-md divide-y divide-gray-100 ring-1 ring-black ring-opacity-5 shadow-lg origin-top-right focus:outline-none">
                  <div className="py-1 px-1">
                    <Menu.Item>
                      {({ active }) => (
                        <button
                          onClick={() =>
                            router.push({
                              pathname: "/users/user-account",
                              query: { id: session.user.id },
                            })
                          }
                          className={`${
                            active
                              ? "bg-light-blue-600 text-white"
                              : "text-gray-600"
                          } group flex rounded-md items-center w-full px-2 py-2 text-sm`}
                        >
                          {active ? (
                            <IdentificationIcon
                              className="mr-2 w-5 h-5"
                              aria-hidden="true"
                            />
                          ) : (
                            <IdentificationIcon
                              className="mr-2 w-5 h-5"
                              aria-hidden="true"
                            />
                          )}
                          アカウント編集
                        </button>
                      )}
                    </Menu.Item>
                  </div>
                  <div className="py-1 px-1">
                    <Menu.Item>
                      {({ active }) => (
                        <button
                          onClick={() => {
                            auth.signOut();
                            signOut({ callbackUrl: "/" });
                          }}
                          className={`${
                            active
                              ? "bg-light-blue-600 text-white"
                              : "text-gray-600"
                          } group flex rounded-md items-center w-full px-2 py-2 text-sm`}
                        >
                          {active ? (
                            <LogoutIcon
                              className="mr-2 w-5 h-5"
                              aria-hidden="true"
                            />
                          ) : (
                            <LogoutIcon
                              className="mr-2 w-5 h-5"
                              aria-hidden="true"
                            />
                          )}
                          ログアウト
                        </button>
                      )}
                    </Menu.Item>
                  </div>
                </Menu.Items>
              </Transition>
            </Menu>
          </div>
        ) : (
          /* Todo: next.jsのImageが使えないので一旦このまま */
          <UserIcon className="p-1 h-10 text-gray-500 bg-gray-200 rounded-full" />
        )}
      </div>
    </header>
  );
};
