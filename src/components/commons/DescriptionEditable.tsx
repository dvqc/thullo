import { useEffect, useState } from "react";
import { FileSvg, PenSvg } from "../svg";
import Animate from "./Animate";
import Button from "./Button";

export default function DescriptionEditable({
  description,
  onSave
}: {
  description: string;
  onSave: (description: string, reset?: () => void) => void;
}) {
  const [isEditing, setEditing] = useState(false);
  const [draft, setDraft] = useState(description);

  const handleEdit = () => {
    setDraft(description);
    setEditing(!isEditing);
  };

  const handleSave = () => {
    onSave(draft, () => setDraft(description));
    setEditing(false);
  };

  const handleCancel = () => {
    setDraft(description);
    setEditing(false);
  };

  useEffect(() => {
    setDraft(description);
  }, [description]);

  return (
    <div className="flex flex-col space-y-2">
      <div className="flex items-center space-x-2 fill-gray-400 text-gray-400">
        <FileSvg className="h-4 w-4" />
        <p className="font-poppins text-2xs font-semibold ">Description</p>
        <Button btnType="secondary-outlined" onClick={handleEdit}>
          <PenSvg className="h-4 w-4" />
          <p className="font-poppins text-xs font-medium">Edit</p>
        </Button>
      </div>
      <div className={`my-3`}>
        <pre
          contentEditable={isEditing}
          className={`h-fit w-full whitespace-pre-wrap rounded-md text-sm ${
            isEditing ? "border-2 border-gray-200 p-2 outline-none  focus:border-blue-500" : ""
          }`}
          onBlur={(e) => {
            console.log("onBlur");
            setDraft(e.target.innerText);
          }}
          suppressContentEditableWarning={true}
        >
          {draft}
        </pre>

        <div tabIndex={-1} className={`my-2 flex h-8`}>
          <Animate
            className="flex"
            isMounted={isEditing}
            animationIn="animate-fade-in"
            animationOut="animate-fade-out"
            delay={400}
          >
            <Button onClick={handleSave} className="bg-green-700 hover:bg-green-600">
              Save
            </Button>
            <Button onClick={handleCancel} btnType="secondary-light" className="ml-2">
              Cancel
            </Button>
          </Animate>
        </div>
      </div>
    </div>
  );
}
