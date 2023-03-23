import Image from "next/image";

import ProfilePic from "../../../public/profilepic.jpg";

const users = [{ name: "A" }, { name: "B" }, { name: "C" }];

const Content = () => {
  return (
    <div className="flex space-x-4 p-4">
      <div className="flex items-center space-x-2 rounded-md bg-gray-100 p-2">
        <div>
          <svg xmlns="http://www.w3.org/2000/svg" height="18" viewBox="0 96 960 960" width="18">
            <path d="M220 976q-24.75 0-42.375-17.625T160 916V482q0-24.75 17.625-42.375T220 422h70v-96q0-78.85 55.606-134.425Q401.212 136 480.106 136T614.5 191.575Q670 247.15 670 326v96h70q24.75 0 42.375 17.625T800 482v434q0 24.75-17.625 42.375T740 976H220Zm0-60h520V482H220v434Zm260.168-140Q512 776 534.5 753.969T557 701q0-30-22.668-54.5t-54.5-24.5Q448 622 425.5 646.5t-22.5 55q0 30.5 22.668 52.5t54.5 22ZM350 422h260v-96q0-54.167-37.882-92.083-37.883-37.917-92-37.917Q426 196 388 233.917 350 271.833 350 326v96ZM220 916V482v434Z" />
          </svg>
        </div>
        <div>Private</div>
      </div>
      <div className="flex space-x-4">
        {users.map((user, index) => (
          <Image className="h-11 w-11 rounded" src={ProfilePic} alt={user.name} key={index} />
        ))}
      </div>
    </div>
  );
};

export default Content;
