import { LockSvg, PublicSvg } from "../svg";

export default function VisibilityCard({ setIsPrivate }: { setIsPrivate: () => void }) {
  return (
    <article className="w-56 cursor-default rounded-xl border-[1px] border-gray-200 bg-white p-3 shadow-md">
      <h4 className="my-1 text-xs font-medium text-neutral-800">Visibility</h4>
      <p className="text-xs text-gray-400 ">Choose who can see this board.</p>
      <ul className="my-4 flex flex-col gap-3">
        <li className="cursor-pointer rounded-lg p-3 duration-200 hover:bg-gray-100">
          <div className=" my-1 flex items-center text-xs font-medium  text-neutral-800">
            <PublicSvg className="mr-2 h-3 w-3 fill-neutral-800"></PublicSvg> Public
          </div>
          <p className="text-xs text-gray-400 ">Anyone on the internet can see this.</p>
        </li>
        <li className=" cursor-pointer rounded-lg p-3 duration-200 hover:bg-gray-100">
          <div className="my-1 flex items-center text-xs  font-medium text-neutral-800">
            <LockSvg className="mr-2 h-3 w-3 fill-neutral-800"></LockSvg> Private
          </div>
          <p className="text-xs text-gray-400 ">Only board members can see this</p>
        </li>
      </ul>
    </article>
  );
}
