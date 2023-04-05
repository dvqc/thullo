import React from "react";
import Image from "next/image";

import ProfilePic from "../../../public/profilepic.jpg";
import { ArrwoDownSvg } from "../svg";
import { UserImage } from "../commons";

const Profile = ({}) => {
  return (
    <div className="flex items-center space-x-2">
      <UserImage url={"/profilepic.jpg"}></UserImage>
      <div className="font-medium">
        <label>Xanthe Neal</label>
      </div>
      <div>
        <ArrwoDownSvg className="h-6 w-6" />
      </div>
    </div>
  );
};

export default Profile;
