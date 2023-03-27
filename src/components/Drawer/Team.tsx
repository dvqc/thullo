import Image from "next/image";

import { FileSvg } from "../svg";
import ProfilePic from "../../../public/profilepic.jpg";

export default function Team({}) {
  return (
    <div className="members my-2">
      <div className="flex items-center space-x-2 text-[10px] text-gray-500">
        <FileSvg className="h-5 w-5" />
        <p className="text-xs font-bold">Team</p>
      </div>
      <div>
        <div className="my-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <Image className="h-8 w-8 rounded-lg" src={ProfilePic} alt="Profile Picture" />
              <p className="text-xs font-bold">Xanthe Neal</p>
            </div>
            <div className="pr-4">
              <p className="text-xs font-bold text-gray-500">admin</p>
            </div>
          </div>
        </div>
        <div className="mt-6 flex flex-col space-y-2">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <Image className="h-7 w-7 rounded-lg" src={ProfilePic} alt="Profile Picture" />
              <p className="text-xs font-bold">Xanthe Neal</p>
            </div>
            <button className="btn w-15 rounded-lg border-2 border-red-500 text-red-500">Remove</button>
          </div>
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <Image className="h-7 w-7 rounded-lg" src={ProfilePic} alt="Profile Picture" />
              <p className="text-xs font-bold">Xanthe Neal</p>
            </div>
            <button className="btn w-15 rounded-lg border-2 border-red-500 text-red-500">Remove</button>
          </div>
        </div>
      </div>
    </div>
  );
}
