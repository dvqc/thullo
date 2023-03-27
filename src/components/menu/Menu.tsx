/* eslint-disable @typescript-eslint/no-unsafe-return */
import Image from "next/image";

import ProfilePic from "../../../public/profilepic.jpg";
import { Button, Collapsible } from "../commons";
import { LockSvg, MoreHorizSvg } from "../svg";
import VisibilityCard from "./VisibilityCard";
import Drawer from "../Drawer";
import { useState } from "react";

const users = [{ name: "A" }, { name: "B" }, { name: "C" }];

const Menu = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="flex justify-between space-x-4 p-4">
      <div className="flex items-center gap-4">
        <Collapsible
          toggler={
            <Button btnType="secondary">
              <LockSvg className="h-3 w-3" />
              Private
            </Button>
          }
          content={<VisibilityCard setIsPrivate={() => {}} />}
        />

        <div className="flex gap-3">
          {users.map((user, index) => (
            <Image className="h-8 w-8 rounded-lg" src={ProfilePic} alt={user.name} key={index} />
          ))}
        </div>
      </div>
      {/* <Button btnType="secondary-outlined" className="w-32" onClick={() => setIsOpen(true)}>
        <MoreHorizSvg className="h-6 w-6" />
        Show Menu
      </Button>
      <Drawer isOpen={isOpen} setIsOpen={setIsOpen} /> */}
      <Collapsible
        toggler={
          <Button btnType="secondary">
            <MoreHorizSvg className="h-6 w-6" />
            Show Menu
          </Button>
        }
        content={<Drawer setIsDrawer={() => {}} />}
      />
    </div>
  );
};

export default Menu;
