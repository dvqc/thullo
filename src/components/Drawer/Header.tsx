/* eslint-disable @typescript-eslint/no-unsafe-call */
import { CloseSvg } from "../svg";

export default function Header({}) {
  return (
    <div className="flex items-center justify-between">
      <p>Devchallenges Board</p>
      <button onClick={() => {}} className="rounded-lg bg-transparent p-1.5 text-sm text-gray-400 hover:bg-gray-200">
        <CloseSvg className="h-5 w-5" />
      </button>
    </div>
  );
}
