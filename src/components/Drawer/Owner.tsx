import Image from "next/image";

import { AccountSvg } from "../svg";
import ProfilePic from "../../../public/profilepic.jpg";

export default function Owner({}) {
  return (
    <div className="owner space-y-2">
      <div className="flex items-center space-x-2 text-[10px]">
        <AccountSvg className="h-5 w-5 text-gray-900" />
        <p>Made by</p>
      </div>
      <div className="flex items-center space-x-2">
        <Image className="h-8 w-8 rounded-lg" src={ProfilePic} alt="Profile Picture" />
        <div className="flex flex-col">
          <label className="text-xs font-bold">Xanthe Neal</label>
          <p className="text-[10px]">on 4 July, 2020</p>
        </div>
      </div>
    </div>
  );
}
