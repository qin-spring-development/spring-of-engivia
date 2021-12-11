import { useEffect } from "react";
import { useRouter } from "next/router";
import { useSession } from "next-auth/client";
import { Loader } from "src/components/Loader";

type props = {
  children: any;
  pathname: string;
};

/**ログインチェックをしないPath */
const isNotAuthPaths = ["/"];
const loginPath = "/";
const loggedInRedirect = "/broadcasts";

export const Auth = ({ children, pathname }: props) => {
  const [session, loading] = useSession();
  const router = useRouter();
  const isUser = session?.user;

  useEffect(() => {
    if (loading) return;
    if (!isUser) router.push(loginPath);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isUser, loading]);

  if (isUser && pathname === loginPath) {
    router.push(loggedInRedirect);
  }
  if (isUser || isNotAuthPaths.includes(pathname)) {
    return children;
  }
  return (
    <div>
      <Loader />
    </div>
  );
};
