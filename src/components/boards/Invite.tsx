export default function Invite() {
  return (
    <article className="w-60 cursor-default rounded-xl border-[1px] border-gray-200 bg-white p-3 shadow-md">
      <h4 className="my-1 text-xs font-medium text-neutral-800">Invite to Board</h4>
      <p className="text-xs text-gray-400 ">Search for users you want to invite</p>
      <input type={"text"} className="input h-8 w-full border-transparent text-xs " placeholder="User.."></input>
    </article>
  );
}
