/* eslint-disable @typescript-eslint/no-unsafe-call */
import React from "react";

import { CloseSvg } from "../Svg";

export default function Drawer({ isOpen, setIsOpen }: { isOpen: boolean; setIsOpen: any }) {
  return (
    <main
      className={
        "fixed inset-0 z-10 mt-16 transform overflow-hidden bg-gray-900 bg-opacity-25 ease-in-out" +
        (isOpen
          ? " translate-x-0 opacity-100 transition-opacity duration-500  "
          : " translate-x-full opacity-0 transition-all delay-500  ")
      }
    >
      <section
        className={
          " delay-400 absolute right-0 h-full w-screen max-w-sm transform bg-white shadow-xl transition-all duration-500 ease-in-out  " +
          (isOpen ? " translate-x-0 " : " translate-x-full ")
        }
      >
        <article className="relative flex h-full w-screen max-w-sm flex-col space-y-6 pb-10">
          <header className="flex items-center justify-between p-4">
            <p>Devchallenges Board</p>
            <button
              onClick={() => {
                setIsOpen(false);
              }}
            >
              <CloseSvg className="h-7 w-7" />
            </button>
          </header>
          <div className="divide-red mx-4 divide-y-8 divide-solid" />
        </article>
      </section>
      <section
        className=" h-full w-screen cursor-pointer "
        onClick={() => {
          setIsOpen(false);
        }}
      ></section>
    </main>
  );
}
