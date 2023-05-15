import { Member } from "~/types";
import UserImage from "./UserImage";

export default function Members({ members }: { members: Member[] }) {
  return (
    <>
      {members.map((member, i: number) =>
        i < 3 ? (
          <UserImage key={member.id} url={member.image ?? "/profilepic.jp"}></UserImage>
        ) : i === 3 ? (
          <p key={"others"} className="text-xs font-medium text-gray-400">
            + {members.length - 3} other{members.length - 3 > 1 && "s"}
          </p>
        ) : null
      )}
    </>
  );
}
