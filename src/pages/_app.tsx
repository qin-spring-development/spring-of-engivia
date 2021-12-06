import type { AppProps } from "next/app";
import "../styles/globals.css";
import { Provider } from "next-auth/client";
import { Auth } from "src/lib/auth/AuthCheck";
import { Toaster } from "react-hot-toast";

function MyApp({ Component, pageProps, router }: AppProps) {
  return (
    <Provider session={pageProps.session}>
      <Auth pathname={router.pathname}>
        <Component {...pageProps} />
        <Toaster />
      </Auth>
    </Provider>
  );
}

export default MyApp;
