import Image from "next/image";

import { AccountSvg } from "../svg";
import ProfilePic from "../../../public/profilepic.jpg";

export default function Owner({}) {
  return (
    <div className="owner my-4 space-y-2 font-semibold ">
      <div className="flex items-center text-gray-400">
        <AccountSvg className="h-3 w-3 fill-gray-400" />
        <p className="ml-2 font-poppins text-2xs ">Made by</p>
      </div>
      <div className="flex items-center">
        <Image className="h-8 w-8 rounded-lg" src={ProfilePic} alt="Profile Picture" />
        <div className="ml-2 flex flex-col">
          <p className="font-poppins  text-xs text-neutral-800 ">Xanthe Neal</p>
          <p className="text text-2xs text-gray-400">on 4 July, 2020</p>
        </div>
      </div>
    </div>
  );
}
