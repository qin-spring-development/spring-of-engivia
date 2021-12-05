import { NextPage } from "next";
import { useSession } from "next-auth/client";
import { useRouter } from "next/router";
import { useEffect } from "react";
import axios from "axios";
import { auth } from "src/lib/firebase";

const Login: NextPage = () => {
  const [session] = useSession();
  const router = useRouter();

  useEffect(() => {
    const getToken = async () => {
      const result = await axios.post(
        `${process.env.NEXT_PUBLIC_BASE_URL}/api/auth/firebaseAuth`,
        { userId: session?.user.id }
      );
      return result.data.token;
    };

    getToken()
      .then((token) => {
        auth.signInWithCustomToken(token);
      })
      .then(() => {
        router.push("/broadcasts");
      })
      .catch((e) => {
        console.log(e);
        router.push("/");
      });
  }, []);

  return <div></div>;
};

export default Login;
