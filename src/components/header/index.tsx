import React from "react";

import Logo from "./Logo";
import Label from "./label";
import Profile from "./Profile";
import Search from "./Search";

const Header = ({}) => {
  return (
    <header className="border-b bg-white p-2 text-black">
      <nav className="container mx-auto flex items-center justify-between p-2">
        <div className="flex items-center space-x-20">
          <Logo />
          <Label />
        </div>
        <div className="flex items-center space-x-5">
          <Search />
          <Profile />
        </div>
      </nav>
    </header>
  );
};

export default Header;
