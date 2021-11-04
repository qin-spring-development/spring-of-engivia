import type { AppProps } from "next/app";
import "../styles/globals.css";
import { Provider } from "next-auth/client";
import { SWRConfig } from "swr";
import { fetcher } from "src/utils/fetcher";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <Provider session={pageProps.session}>
      <SWRConfig value={{ fetcher }}>
        <Component {...pageProps} />
      </SWRConfig>
    </Provider>
  );
}

export default MyApp;
