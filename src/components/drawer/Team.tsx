import Image from "next/image";

import { FileSvg } from "../svg";
import ProfilePic from "../../../public/profilepic.jpg";
import { Button } from "../commons";

export default function Team({}) {
  return (
    <div className="members my-2">
      <div className="flex items-center fill-gray-400 font-poppins text-2xs  font-semibold text-gray-400">
        <FileSvg className="h-4 w-4" />
        <p className="ml-2  ">Team</p>
      </div>
      <div>
        <div className="my-4 flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <Image className="h-8 w-8 rounded-lg" src={ProfilePic} alt="Profile Picture" />
            <p className="text-xs font-bold">Xanthe Neal</p>
          </div>
          <p className=" w-16  text-center text-xs font-semibold text-gray-400">admin</p>
        </div>
        <div className="my-4 flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <Image className="h-7 w-7 rounded-lg" src={ProfilePic} alt="Profile Picture" />
            <p className="text-xs font-bold">Xanthe Neal</p>
          </div>
          <Button btnType="danger-outlined">Remove</Button>
        </div>
        <div className="my-4 flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <Image className="h-7 w-7 rounded-lg" src={ProfilePic} alt="Profile Picture" />
            <p className="text-xs font-bold">Xanthe Neal</p>
          </div>
          <Button btnType="danger-outlined">Remove</Button>
        </div>
      </div>
    </div>
  );
}
