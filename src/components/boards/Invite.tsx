import { useState } from "react";
import { Button, InputGroup, UserImage } from "../commons";
import { SearchSvg } from "../svg";
import members from "~/data/members.json";

export default function Invite() {
  const [keyword, setKeyword] = useState("");
  const [serachResult, setSerachResult] = useState<any[]>([]);

  const handleSearch = () => {
    const foundMembers = members.filter((member) => member.username.startsWith(keyword));
    setSerachResult(foundMembers);
  };
  
  
  return (
    <article className="w-60 cursor-default rounded-xl border-1 border-gray-200 bg-white p-3 shadow-md">
      <h4 className="font-pop my-1 text-xs font-semibold text-neutral-800">Invite to Board</h4>
      <p className="text-xs text-gray-400 ">Search for users you want to invite</p>
      <div className="my-2">
        <InputGroup placeholder="User.." value={keyword} setValue={setKeyword} onBtnClick={handleSearch}>
          <SearchSvg className="h-4 w-4"></SearchSvg>
        </InputGroup>
      </div>
      {serachResult.length > 0 && (
        <div className="my-2 flex flex-col space-y-2 rounded-lg border-1 border-gray-200 p-3 shadow-lg">
          {serachResult.map((member) => (
            <div className="flex items-center space-x-2">
              <UserImage url={member.img}></UserImage>
              <p className="font-poppins text-xs font-semibold">{member.username}</p>
            </div>
          ))}
        </div>
      )}
      <div className="flex w-full justify-center">
        <Button>Invite</Button>
      </div>
    </article>
  );
}
