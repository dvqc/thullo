/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-unsafe-call */
import { useEffect, useRef } from "react";

import Header from "./Header";
import Owner from "./Owner";
import Description from "./Description";
import Team from "./Team";

export default function Drawer({ setIsOpen }: { setIsOpen: (isOpen: boolean) => void }) {
  const drawerRef = useRef<HTMLElement>(null);

  const handleBlur = (e: MouseEvent) => {
    console.log(drawerRef.current);
    if (!e.target || (drawerRef.current && !drawerRef.current.contains(e.target as Node))) setIsOpen(false);
  };

  useEffect(() => {
    document.addEventListener("click", handleBlur);
    return () => document.removeEventListener("click", handleBlur);
  }, []);
  return (
    <aside className="  bg-white p-5" ref={drawerRef}>
      <Header setIsOpen={setIsOpen} />
      <hr className="my-1 h-[1.5px] bg-gray-100"></hr>
      <Owner />
      <Description />
      <Team />
    </aside>
  );
}
