export default function Members({ members }: { members: any[] }) {
  return (
    <>
      {members.map((member: any, i: number) =>
        i < 3 ? (
          <img key={member.id} className="h-7  w-7  rounded-lg object-cover" src={member.img} alt="" />
        ) : i === 3 ? (
          <p key={"others"} className="text-xs font-medium text-gray-400">
            + {members.length - 3} other{members.length - 3 > 1 && "s"}
          </p>
        ) : null
      )}
    </>
  );
}
