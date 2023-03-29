/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-unsafe-call */
import React from "react";

import Header from "./Header";
import Owner from "./Owner";
import Description from "./Description";
import Team from "./Team";
// import Divider from "../commons/Divider";
// import Head from "next/head";

export default function Drawer({ setIsOpen }: { setIsOpen: any }) {
  return (
    <nav className="fixed top-16 right-0 z-50 h-screen w-80 overflow-y-auto bg-white p-4 transition-transform">
      <Header setIsOpen={setIsOpen} />
      {/* <Divider /> */}
      <hr className="my-2 h-[3px] bg-gray-200"></hr>
      <Owner />
      <Description />
      <Team />
    </nav>
  );
}
