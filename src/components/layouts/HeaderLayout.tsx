import Head from "next/head";
import React from "react";

import Header from "../header";

const HeaderLayout = ({ boardTitle,children }: { boardTitle?:string; children: React.ReactNode }) => {
  return (
    <>
      <Head>
        <title>Thullo</title>
        <meta name="description" content="Generated by create-t3-app" />
        <link rel="icon" href="/favicon.svg" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin={"anonymous"} />
        <link
          href="https://fonts.googleapis.com/css2?family=Noto+Sans:wght@400;500;600;700&family=Poppins:wght@400;500;600;700&display=swap"
          rel="stylesheet"
        />
      </Head>
      <div className="flex h-screen flex-col">
        <Header boardTitle={boardTitle}/>
        {children}
      </div>
    </>
  );
};

export default HeaderLayout;
