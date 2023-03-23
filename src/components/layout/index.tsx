import React from "react";

import Header from "../header";
import Content from "./content";

const Layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <>
      <Header />
      <main className="container mx-auto flex flex-col py-5">
        <Content />
        <div className="m-4 h-screen rounded-xl bg-[#F8F9FD] p-5">{children}</div>
      </main>
    </>
  );
};

export default Layout;
