import { Members } from "../commons";

export default function BoardCard({ title, img, members }: { title: string; img: string; members: any[] }) {
  return (
    <article className="w-60 rounded-xl bg-white p-3 shadow-lg">
      <img className="h-32 w-full rounded-xl object-cover " src={img} alt="" />
      <h2 className="my-3 text-base font-medium text-black">{title}</h2>
      <div className="mt-5 flex items-center gap-3">
        <Members members={members}></Members>
      </div>
    </article>
  );
}
