import { useEffect, useRef, useState } from "react";
import { api } from "~/utils/api";
import { Animate, Button, Collapsible } from "../commons";
import { MoreHorizSvg } from "../svg";

export default function ListHeader({
  listName,
  listId,
  onDelete
}: {
  listName: string;
  listId: string;
  onDelete: () => void;
}) {
  const [title, setTitle] = useState(listName);
  const [editing, setEditing] = useState<"editing" | "closing" | "closed">("closed");
  const editorRef = useRef<HTMLDivElement>(null);

  const utils = api.useContext();

  const patchListMutation = api.lists.patch.useMutation({
    onSuccess: () => utils.lists.getById.invalidate(listId)
  });

  const handleSave = () => {
    if (title.length > 0 && title != listName) {
      patchListMutation.mutate({ id: listId, data: { title } });
      setEditing("closing");
    }
  };

  const handleRename = () => {
    setEditing("editing");
  };

  console.log(listName);
  console.log(title);

  const handleBlur = (e: MouseEvent) => {
    if (!e.target || (editorRef.current && !editorRef.current.contains(e.target as Node))) {
      setEditing("closing");
    }
  };

  useEffect(() => {
    document.addEventListener("click", (e) => handleBlur(e));
    return () => document.removeEventListener("click", (e) => handleBlur(e));
  }, []);

  return (
    <div className="relative my-4 flex items-center justify-between">
      {editing === "closed" && <h2 className="animate-fade-in text-sm font-medium text-black">{listName}</h2>}
      <Animate
        isMounted={editing === "editing"}
        animationIn="animate-fade-in"
        animationOut="animate-fade-out"
        delay={400}
        onAnimationEnd={() => {
          if (editing === "closing") {
            setTitle(listName);
            setEditing("closed");
          }
        }}
      >
        <div tabIndex={-1} className="my-4 rounded-xl border-1 border-gray-200 bg-white p-3 shadow-lg" ref={editorRef}>
          <textarea
            rows={2}
            cols={22}
            placeholder="Enter a title for this card..."
            className="scroll-hidden p-1"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          ></textarea>
          <Button onClick={handleSave} className="mt-1 bg-green-700 hover:bg-green-600">
            Save
          </Button>
        </div>
      </Animate>

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
            <Button btnType="secondary-light" className="" onClick={handleRename}>
              Rename
            </Button>
            <hr className="my-1 h-[1.5px] bg-gray-100"></hr>
            <Button btnType="secondary-light" className="" onClick={onDelete}>
              Delete this list
            </Button>
          </div>
        }
      ></Collapsible>
    </div>
  );
}
