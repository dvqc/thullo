import { useState } from "react";
import { Button, InputGroup, UserImage } from "../commons";
import { SearchSvg } from "../svg";
import { api } from "~/utils/api";
import { useDebounce } from "~/hooks/utility";
import { Board, Member } from "~/types";
import { useSession } from "next-auth/react";

export default function Invite({
  onInvite,
  loading,
  boardId,
  owner,
  members
}: {
  onInvite: (userId: string) => void;
  loading?: boolean;
  boardId?: string;
  owner: Member;
  members: Member[];
}) {
  const [keyword, setKeyword] = useState("");
  const [search, setSerach] = useState("");
  const { data: users } = !boardId
    ? api.users.search.useQuery(search)
    : api.users.searchInBoard.useQuery({ boardId: boardId, q: search });
  const session = useSession();
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
            <div className="flex items-center" key={user.id}>
              <UserImage url={user.image ?? "/profilepc.jpg"}></UserImage>
              <p className="ml-2 font-poppins text-xs font-semibold">{user.name}</p>
              <div className="mr-0 ml-auto ">
                {owner.id === user.id ? (
                  <p className=" w-14  text-center text-xs font-semibold text-gray-400">admin</p>
                ) : members.find((member) => member.id === user.id) ? (
                  <p className=" w-14  text-center text-xs font-semibold text-gray-400">member</p>
                ) : (
                  <Button
                    className={`${loading && "cursor-wait"}`}
                    onClick={() => onInvite(user.id)}
                    disabled={loading}
                  >
                    Invite
                  </Button>
                )}
              </div>
            </div>
          ))}
        </div>
      )}
    </article>
  );
}
