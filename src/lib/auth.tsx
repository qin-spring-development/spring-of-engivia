import { useRouter } from "next/router";
import {
  useState,
  useEffect,
  createContext,
  useContext,
  ReactNode,
  VFC,
} from "react";
import Cookies from "js-cookie";
import { auth, firebase } from "src/lib/firebase";
import { createUser } from "src/lib/db";

type Props = {
  children: ReactNode;
};

type FormatUser = {
  email: string | null;
  emailVerified: boolean;
  name: string | null;
  photoURL: string | undefined;
  provider: string | undefined;
  token: string | undefined;
  uid: string;
};

type AuthContextProps = {
  user: FormatUser | undefined;
  signInWithGithub: () => void;
  signOut: () => void;
};

const authContext = createContext<AuthContextProps | undefined>(undefined);

const useProviderAuth = () => {
  const [user, setUser] = useState<FormatUser | undefined>(undefined);

  const router = useRouter();

  const formatUser = async (user: firebase.User) => {
    const token = await firebase.auth().currentUser?.getIdToken(true);

    return {
      email: user.email,
      emailVerified: user.emailVerified,
      name: user.displayName,
      photoURL: user.photoURL as string | undefined,
      provider: user.providerData[0]?.providerId,
      token: token,
      uid: user.uid,
    };
  };

  const handleUser = async (rawUser: firebase.User | undefined | null) => {
    if (rawUser) {
      const user = await formatUser(rawUser);
      const { token, emailVerified, ...withOutToken } = user;

      createUser(user.uid, withOutToken);

      setUser(user);
      return user;
    } else {
      setUser(undefined);
      return false;
    }
  };

  const signInWithGithub = () => {
    const provider = new firebase.auth.GithubAuthProvider();
    firebase
      .auth()
      .signInWithPopup(provider)
      .then((result) => {
        handleUser(result.user as firebase.User);
        Cookies.set("spring-of-engivia", "true");
        router.push("/broadcast");
      });
  };

  const signOut = () => {
    firebase
      .auth()
      .signOut()
      .then(() => {
        handleUser(undefined);
        Cookies.remove("spring-of-engivia");
        // router.push("/auth/login");
      });
  };

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      handleUser(user);
    });

    return () => unsubscribe();
  }, []);

  return {
    user,
    signInWithGithub,
    signOut,
  };
};

export const AuthProvider: VFC<Props> = ({ children }) => {
  const auth = useProviderAuth();
  return <authContext.Provider value={auth}>{children}</authContext.Provider>;
};

export const useAuth = () => {
  return useContext(authContext);
};
