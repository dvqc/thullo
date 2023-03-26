/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-unsafe-call */
import React from "react";

import Header from "./Header";
import Owner from "./Owner";
import Description from "./Description";
import Team from "./Team";
import Divider from "../commons/Divider";

export default function Drawer({ isOpen, setIsOpen }: { isOpen: boolean; setIsOpen: any }) {
  return (
    <aside
      className={
        " fixed inset-0 z-10 mt-16 transform overflow-hidden bg-opacity-25 ease-in-out" +
        (isOpen
          ? " translate-x-0 opacity-100 transition-opacity duration-500  "
          : " translate-x-full opacity-0 transition-all delay-500  ")
      }
    >
      <section
        className={
          " delay-400 absolute right-0 h-full w-screen max-w-xs transform bg-white shadow-xl transition-all duration-500 ease-in-out  " +
          (isOpen ? " translate-x-0 " : " translate-x-full ")
        }
      >
        <div className="scroll-hidden relative flex h-full flex-col space-y-4 overflow-y-auto p-4">
          <Header setIsOpen={setIsOpen} />
          <Divider className="h-[0.9px] w-full bg-gray-200" />
          <Owner />
          <Description />
          <Team />
        </div>
      </section>
      <section
        className=" h-full w-screen cursor-pointer "
        onClick={() => {
          setIsOpen(false);
        }}
      ></section>
    </aside>
  );
}
