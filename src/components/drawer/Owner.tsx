import Image from "next/image";

import { AccountSvg } from "../svg";
import ProfilePic from "../../../public/profilepic.jpg";
import type { Member } from "~/types";

export default function Owner({ owner, createdAt }: { owner: Member; createdAt: Date }) {
  const creationDate = new Intl.DateTimeFormat("en", { day: "numeric", month: "long", year: "numeric" }).format(
    createdAt
  );

  return (
    <div className="owner my-4 space-y-2 font-semibold ">
      <div className="flex items-center text-gray-400">
        <AccountSvg className="h-3 w-3 fill-gray-400" />
        <p className="ml-2 font-poppins text-2xs ">Made by</p>
      </div>
      <div className="flex items-center">
        <Image
          className="h-8 w-8 rounded-lg"
          width={32}
          height={32}
          src={owner.image ?? ProfilePic}
          alt="User Avatar"
        />
        <div className="ml-2 flex flex-col">
          <p className="font-poppins  text-xs text-neutral-800 ">{owner.name}</p>
          <p className="text text-2xs text-gray-400">on {creationDate}</p>
        </div>
      </div>
    </div>
  );
}
