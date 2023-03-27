import React from "react";
import Link from "next/link";

import { LogoSvg } from "../svg";

const Logo = () => {
  return (
    <Link href="/" aria-label="Link to Home Page">
      <LogoSvg className="w-24 h-7"/>
    </Link>
  );
};

export default Logo;
