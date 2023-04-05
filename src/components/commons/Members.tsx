import UserImage from "./UserImage";

export default function Members({ members }: { members: any[] }) {
  return (
    <>
      {members.map((member: any, i: number) =>
        i < 3 ? (
          <UserImage key={member.id} url={member.img}></UserImage>
        ) : i === 3 ? (
          <p key={"others"} className="text-xs font-medium text-gray-400">
            + {members.length - 3} other{members.length - 3 > 1 && "s"}
          </p>
        ) : null
      )}
    </>
  );
}
