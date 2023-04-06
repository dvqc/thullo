import { Button, Collapsible } from "../commons";
import { MoreHorizSvg } from "../svg";

export default function ListHeader({ listName }: { listName: string }) {
  return (
    <div className="my-4 flex items-center justify-between">
      <h2 className="text-sm font-medium text-black">{listName}</h2>

      <Collapsible
        justify="left"
        toggler={
          <Button
            btnType="secondary-light"
            className="h-fit w-fit fill-gray-400 p-0 hover:bg-transparent hover:fill-black"
          >
            <MoreHorizSvg className="h-5 w-5"></MoreHorizSvg>
          </Button>
        }
        content={
          <div className="w-40 space-y-1 rounded-xl border-1 border-gray-200 bg-white p-3 shadow-lg">
            <Button btnType="secondary-light" className="">
              Rename
            </Button>
            <hr className="my-1 h-[1.5px] bg-gray-100"></hr>
            <Button btnType="secondary-light" className="">
              Delete this list
            </Button>
          </div>
        }
      ></Collapsible>
    </div>
  );
}
