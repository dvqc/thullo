/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-unsafe-call */
import { useEffect, useRef } from "react";

import Header from "./Header";
import Owner from "./Owner";
import Description from "./Description";
import Team from "./Team";
import { Board } from "~/types";

export default function Drawer({
  board,
  setIsOpen,
  handleDescription
}: {
  board: Board;
  setIsOpen: (isOpen: boolean) => void;
  handleDescription: (description: string) => void;
}) {
  const drawerRef = useRef<HTMLElement>(null);

  const handleBlur = (e: MouseEvent) => {
    if (!e.target || (drawerRef.current && !drawerRef.current.contains(e.target as Node))) setIsOpen(false);
  };

  useEffect(() => {
    document.addEventListener("click", handleBlur);
    return () => document.removeEventListener("click", handleBlur);
  }, []);
  return (
    <aside className="min-h-full  bg-white p-5" ref={drawerRef}>
      <Header title={board.title} setIsOpen={setIsOpen} />
      <hr className="my-1 h-[1.5px] bg-gray-100"></hr>
      <Owner owner={board.owner} createdAt={board.createdAt} />
      <Description description={board.description ?? ""} handleDescription={handleDescription} />
      <Team owner={board.owner} team={board.team} />
    </aside>
  );
}
