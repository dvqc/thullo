import React from "react";

import Header from "../header";
import Content from "./content";

const Layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div>
      <Header />
      <main className="container mx-auto flex flex-col">
        <Content />
        <div className="m-4 h-screen rounded-xl bg-[#F8F9FD] p-5">{children}</div>
      </main>
    </div>
  );
};

export default Layout;
