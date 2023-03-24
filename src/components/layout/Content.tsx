import Image from "next/image";

import ProfilePic from "../../../public/profilepic.jpg";
import { Button } from "../commons";

const users = [{ name: "A" }, { name: "B" }, { name: "C" }];

const Content = () => {
  return (
    <div className="flex justify-between space-x-4 p-4">
      <div className="flex items-center gap-4">
        <Button btnType="secondary">
          <svg xmlns="http://www.w3.org/2000/svg" height="18" viewBox="0 96 960 960" width="18">
            <path d="M220 976q-24.75 0-42.375-17.625T160 916V482q0-24.75 17.625-42.375T220 422h70v-96q0-78.85 55.606-134.425Q401.212 136 480.106 136T614.5 191.575Q670 247.15 670 326v96h70q24.75 0 42.375 17.625T800 482v434q0 24.75-17.625 42.375T740 976H220Zm0-60h520V482H220v434Zm260.168-140Q512 776 534.5 753.969T557 701q0-30-22.668-54.5t-54.5-24.5Q448 622 425.5 646.5t-22.5 55q0 30.5 22.668 52.5t54.5 22ZM350 422h260v-96q0-54.167-37.882-92.083-37.883-37.917-92-37.917Q426 196 388 233.917 350 271.833 350 326v96ZM220 916V482v434Z" />
          </svg>
          Private
        </Button>
        <div className="flex gap-3">
          {users.map((user, index) => (
            <Image className="h-8 w-8 rounded-lg" src={ProfilePic} alt={user.name} key={index} />
          ))}
        </div>
      </div>
      <Button btnType="secondary" className="w-28">
        <svg xmlns="http://www.w3.org/2000/svg" height="25" viewBox="0 96 960 960" width="25">
          <path d="M207.858 624Q188 624 174 609.858q-14-14.141-14-34Q160 556 174.142 542q14.141-14 34-14Q228 528 242 542.142q14 14.141 14 34Q256 596 241.858 610q-14.141 14-34 14Zm272 0Q460 624 446 609.858q-14-14.141-14-34Q432 556 446.142 542q14.141-14 34-14Q500 528 514 542.142q14 14.141 14 34Q528 596 513.858 610q-14.141 14-34 14Zm272 0Q732 624 718 609.858q-14-14.141-14-34Q704 556 718.142 542q14.141-14 34-14Q772 528 786 542.142q14 14.141 14 34Q800 596 785.858 610q-14.141 14-34 14Z" />
        </svg>
        Show Menu
      </Button>
    </div>
  );
};

export default Content;
