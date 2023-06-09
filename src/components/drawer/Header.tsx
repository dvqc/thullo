/* eslint-disable @typescript-eslint/no-unsafe-call */
import { CloseSvg } from "../svg";

export default function Header({ title, setIsOpen }: { title: string; setIsOpen: (isOpen: boolean) => void }) {
  return (
    <div className="flex items-center justify-between">
      <p className="font-poppins text-xs font-semibold text-neutral-800">{title}</p>
      <button
        onClick={() => {
          setIsOpen(false);
        }}
        className="rounded-lg bg-transparent p-1.5 text-sm text-gray-400 hover:bg-gray-200"
      >
        <CloseSvg className="h-5 w-5" />
      </button>
    </div>
  );
}
