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
      <div className="h-screen">
        <Header />
        <main className="min-h-[calc(100vh-68px)] bg-gray-100">{children}</main>
      </div>
    </>
  );
};
