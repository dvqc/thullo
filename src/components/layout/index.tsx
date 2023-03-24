import React from "react";

import Header from "../header";
import Content from "./content";
import Drawer from "../Drawer";

const Layout = ({ children }: { children: React.ReactNode }) => {
  const [isOpen, setIsOpen] = React.useState(false);

  return (
    <div>
      <Header />
      <main className="container mx-auto flex flex-col">
        <Content setIsOpen={setIsOpen} />
        <Drawer isOpen={isOpen} setIsOpen={setIsOpen} />
        <div className="m-4 h-screen rounded-xl bg-[#F8F9FD] p-5">{children}</div>
      </main>
    </div>
  );
};

export default Layout;
