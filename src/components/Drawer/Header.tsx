/* eslint-disable @typescript-eslint/no-unsafe-call */
import { CloseSvg } from "../Svg";

export default function Header({ setIsOpen }: { setIsOpen: any }) {
  return (
    <div className="flex items-center justify-between">
      <p>Devchallenges Board</p>
      <button
        onClick={() => {
          setIsOpen(false);
        }}
      >
        <CloseSvg className="h-7 w-7" />
      </button>
    </div>
  );
}
