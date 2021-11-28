import { FC, ReactNode } from "react";
import Head from "next/head";
import { Header } from "../Header";

type Props = {
  className?: string;
  children: ReactNode;
  title: string;
};

export const BaseLayout: FC<Props> = ({ className, children, title }) => {
  return (
    <>
      <Head>
        <title>{title}</title>
      </Head>
      <div>
        <Header />
        <main className="h-screen bg-gray-100">{children}</main>
      </div>
    </>
  );
};
