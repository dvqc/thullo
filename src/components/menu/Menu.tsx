import Image from "next/image";

import ProfilePic from "../../../public/profilepic.jpg";
import { Button, Collapsible, VisibilityCard } from "../commons";
import { LockSvg } from "../svg";

const users = [{ name: "A" }, { name: "B" }, { name: "C" }];

const Menu = () => {
  return (
    <div className="flex justify-between space-x-4 p-4">
      <div className="flex items-center gap-4">
        <Collapsible
          justify="left"
          toggler={
            <Button btnType="secondary">
              <LockSvg className="h-3 w-3" />
              Private
            </Button>
          }
          content={<VisibilityCard setIsPrivate={() => {}} />}
        />

        <div className="flex gap-3">
          {users.map((user, index) => (
            <Image className="h-8 w-8 rounded-lg" src={ProfilePic} alt={user.name} key={index} />
          ))}
        </div>
      </div>
      <Button btnType="secondary-outlined" className="w-28">
        <svg xmlns="http://www.w3.org/2000/svg" height="25" viewBox="0 96 960 960" width="25">
          <path d="M207.858 624Q188 624 174 609.858q-14-14.141-14-34Q160 556 174.142 542q14.141-14 34-14Q228 528 242 542.142q14 14.141 14 34Q256 596 241.858 610q-14.141 14-34 14Zm272 0Q460 624 446 609.858q-14-14.141-14-34Q432 556 446.142 542q14.141-14 34-14Q500 528 514 542.142q14 14.141 14 34Q528 596 513.858 610q-14.141 14-34 14Zm272 0Q732 624 718 609.858q-14-14.141-14-34Q704 556 718.142 542q14.141-14 34-14Q772 528 786 542.142q14 14.141 14 34Q800 596 785.858 610q-14.141 14-34 14Z" />
        </svg>
        Show Menu
      </Button>
    </div>
  );
};

export default Menu;
