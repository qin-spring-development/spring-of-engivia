import { useEffect } from "react";
import { useRouter } from "next/router";
import { useSession } from "next-auth/client";

type props = {
  children: any;
  pathname: string;
};

/**ログインチェックをしないPath */
const isNotAuthPaths = ["/"];
const loginPath = "/";
const loggedInRedirect = "/broadcast";

export const Auth = ({ children, pathname }: props) => {
  const [session, loading] = useSession();
  const router = useRouter();
  const isUser = session?.user;

  useEffect(() => {
    if (loading) return;
    if (!isUser) router.push(loginPath);
  }, [isUser, loading]);

  if (isUser && pathname === loginPath) {
    router.push(loggedInRedirect);
  }
  if (isUser || isNotAuthPaths.includes(pathname)) {
    return children;
  }
  return <div>Loading...</div>;
};
