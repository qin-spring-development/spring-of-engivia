import type { AppProps } from "next/app";
import "../styles/globals.css";
import { Provider } from "next-auth/client";
import { SWRConfig } from "swr";
// import { fetcher } from "src/utils/fetcher";
import { Auth } from "src/lib/auth/AuthCheck";

function MyApp({ Component, pageProps, router }: AppProps) {
  return (
    <Provider session={pageProps.session}>
      <Auth pathname={router.pathname}>
        {/* <SWRConfig value={{ fetcher }}> */}
        <Component {...pageProps} />
        {/* </SWRConfig> */}
      </Auth>
    </Provider>
  );
}

export default MyApp;
