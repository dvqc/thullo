export default function BoardCard({ title, img, members }: { title: string; img: string; members: any[] }) {
  return (
    <article className="h-60 w-60 rounded-xl bg-white p-3 shadow-lg">
      <img className="h-32 w-full rounded-xl object-cover" src={img} alt="" />
      <h2 className="my-3 text-base font-medium text-black">{title}</h2>
      <div className="mt-5 flex items-center gap-3">
        {members.map((member, i) =>
          i < 3 ? (
            <img className="h-7 w-7 rounded-lg object-cover" src={member.img} alt="" />
          ) : i === 3 ? (
            <p className="text-xs font-medium text-gray-400">
              + {members.length - 3} other{members.length - 3 > 1 && "s"}
            </p>
          ) : null
        )}
      </div>
    </article>
  );
}
