/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-unsafe-call */
import { useEffect, useRef } from "react";

import Header from "./Header";
import Owner from "./Owner";
import Description from "./Description";
import Team from "./Team";
// import Divider from "../commons/Divider";
// import Head from "next/head";

export default function Drawer({ setIsOpen }: { setIsOpen: (isOpen: boolean) => void }) {
  const drawerRef = useRef<HTMLElement>(null);

  const handleBlur = (e: MouseEvent) => {
    if (!e.target || (drawerRef.current && !drawerRef.current.contains(e.target as Node))) setIsOpen(false);
  };

  useEffect(() => {
    document.addEventListener("click", handleBlur);
  }, []);
  return (
    <aside className="  bg-white p-5" ref={drawerRef}>
      <Header setIsOpen={setIsOpen} />
      {/* <Divider /> */}
      <hr className="my-2 h-[1px] bg-gray-200"></hr>
      <Owner />
      <Description />
      <Team />
    </aside>
  );
}