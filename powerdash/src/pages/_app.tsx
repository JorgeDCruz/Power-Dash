import { AppProps } from "next/app";
import { Session } from "next-auth";
import { SessionProvider } from "next-auth/react";
import { api } from "~/utils/api";
import "~/styles/globals.css";

type ExtendedAppProps = AppProps & {
  Component: AppProps["Component"] & {
    getLayout?: (page: JSX.Element) => JSX.Element;
  };
  pageProps: { session: Session | null };
};

const MyApp = ({
  Component,
  pageProps: { session, ...pageProps },
}: ExtendedAppProps) => {
  // Default layout
  const getLayout = Component.getLayout || ((page) => page);

  return (
    <SessionProvider session={session}>
      {getLayout(<Component {...pageProps} />)}
    </SessionProvider>
  );
};

export default api.withTRPC(MyApp);
