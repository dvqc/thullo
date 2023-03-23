import React from "react";

import Header from "../header";

const Layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="min-h-screen">
      <Header />
      <main className="container mx-auto py-10">{children}</main>
    </div>
  );
};

export default Layout;
