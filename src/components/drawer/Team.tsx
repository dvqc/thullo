import Image from "next/image";

import { FileSvg } from "../svg";
import ProfilePic from "../../../public/profilepic.jpg";
import { Button } from "../commons";
import { Member } from "~/types";

export default function Team({ owner, team }: { owner: Member; team: Member[] }) {
  return (
    <div className="members my-2">
      <div className="flex items-center fill-gray-400 font-poppins text-2xs  font-semibold text-gray-400">
        <FileSvg className="h-4 w-4" />
        <p className="ml-2  ">Team</p>
      </div>
      <div>
        <div className="my-4 flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <Image
              className="h-8 w-8 rounded-lg"
              width={28}
              height={28}
              src={owner.image ?? ProfilePic}
              alt="Profile Picture"
            />
            <p className="text-xs font-bold">{owner.name}</p>
          </div>
          <p className=" w-16  text-center text-xs font-semibold text-gray-400">admin</p>
        </div>
        {team.map((member) => (
          <div className="my-4 flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <Image
                className="h-7 w-7 rounded-lg"
                width={28}
                height={28}
                src={member.image ?? ProfilePic}
                alt="Profile Picture"
              />
              <p className="text-xs font-bold">{member.name}</p>
            </div>
            <Button btnType="danger-outlined">Remove</Button>
          </div>
        ))}
      </div>
    </div>
  );
}
