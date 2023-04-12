import React from "react";
import Image from "next/image";

import ProfilePic from "../../../public/profilepic.jpg";
import { ArrwoDownSvg } from "../svg";
import { UserImage } from "../commons";
import { useSession } from "next-auth/react";

const Profile = ({}) => {
  const { data: session } = useSession();

  return (
    <div className="flex items-center space-x-2">
      <UserImage url={session?.user.image ?? "/profilepic.jpg"}></UserImage>
      <div className="font-medium">
        <label>{session?.user.name ?? "Anonymous"}</label>
      </div>
      <div>
        <ArrwoDownSvg className="h-6 w-6" />
      </div>
    </div>
  );
};

export default Profile;
