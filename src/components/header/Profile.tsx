import React from "react";
import Image from "next/image";

import ProfilePic from "../../../public/profilepic.jpg";
import { ArrwoDownSvg } from "../svg";
import { Button, Collapsible, UserImage } from "../commons";
import { signOut, useSession } from "next-auth/react";

const Profile = ({}) => {
  const { data: session } = useSession();

  return (
    <div className="flex items-center space-x-2">
      <UserImage url={session?.user.image ?? "/profilepic.jpg"}></UserImage>
      <div className="font-medium">
        <label>{session?.user.name ?? "Anonymous"}</label>
      </div>
      <Collapsible
        justify="right"
        content={
          <div className="w-32 space-y-1 rounded-xl border-1 border-gray-200 bg-white p-3 shadow-lg">
            <Button btnType="secondary-light" className="w-full" onClick={() => {}}>
              My boards
            </Button>
            <hr className="my-1 h-[1.5px] bg-gray-100"></hr>
            <Button btnType="danger-outlined" className="w-full" onClick={() => signOut()}>
              Sign out
            </Button>
          </div>
        }
        toggler={
          <button>
            <ArrwoDownSvg className="h-6 w-6" />
          </button>
        }
      ></Collapsible>
    </div>
  );
};

export default Profile;
