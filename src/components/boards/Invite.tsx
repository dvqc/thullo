import { useState } from "react";
import { Button, InputGroup, UserImage } from "../commons";
import { SearchSvg } from "../svg";
import { api } from "~/utils/api";
import { useDebounce } from "~/hooks/utility";

export default function Invite() {
  const [keyword, setKeyword] = useState("");
  const [search, setSerach] = useState("");
  const { data: users } = api.users.search.useQuery(search);

  return (
    <article className="w-60 cursor-default rounded-xl border-1 border-gray-200 bg-white p-3 shadow-md">
      <h4 className="font-pop my-1 text-xs font-semibold text-neutral-800">Invite to Board</h4>
      <p className="text-xs text-gray-400 ">Search for users you want to invite</p>
      <div className="my-2">
        <InputGroup placeholder="User.." value={keyword} setValue={setKeyword} onBtnClick={() => setSerach(keyword)}>
          <SearchSvg className="h-4 w-4"></SearchSvg>
        </InputGroup>
      </div>
      {users && users.length > 0 && (
        <div className="my-2 flex flex-col space-y-2 rounded-lg border-1 border-gray-200 p-3 shadow-lg">
          {users.map((user) => (
            <div className="flex items-center space-x-2">
              <UserImage url={user.image ?? "/profilepc.jpg"}></UserImage>
              <p className="font-poppins text-xs font-semibold">{user.name}</p>
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
