import React from "react";
import Image from "next/image";

import ProfilePic from "../../../public/profilepic.jpg";

const Profile = ({}) => {
  return (
    <div className="flex items-center space-x-2">
      <Image className="h-11 w-11 rounded" src={ProfilePic} alt="Profile Picture" />
      <div className="font-medium">
        <div>Xanthe Neal</div>
      </div>
      <div>
        <svg xmlns="http://www.w3.org/2000/svg" height="25" viewBox="0 96 960 960" width="25">
          <path d="M480 696 280 497h400L480 696Z" />
        </svg>
      </div>
    </div>
  );
};

export default Profile;
