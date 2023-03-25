import Head from "next/head";
import React from "react";

import Header from "../header";
import Content from "./Content";
import Drawer from "../Drawer";

const Layout = ({ children }: { children: React.ReactNode }) => {
  const [isOpen, setIsOpen] = React.useState(false);

  return (
    <>
      <Head>
        <title>Thullo</title>
        <link rel="icon" href="/favicon.svg" />
      </Head>
      <div>
        <Header />
        <main className="container mx-auto flex flex-col">
          {/* <Content /> */}
          <Drawer isOpen={isOpen} setIsOpen={setIsOpen} />
          <div className="m-4 h-screen rounded-xl bg-[#F8F9FD] p-5">{children}</div>
        </main>
      </div>
    </>
  );
};
