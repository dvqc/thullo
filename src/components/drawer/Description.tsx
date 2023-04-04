import { FileSvg, PenSvg } from "../svg";
import { Button } from "../commons";
import { useState } from "react";
const initialDescription = `Simple board to start on a project. Each list can hold items (cards) that represent ideas or tasks. 
  There 4 lists here: * Backlog 🤔 : Ideas are created here. Here people can describe the idea following three simple
   questions: Why you wish to do it, What it is, how can you do it. * In Progress📚: Once the ideas is clearly defined, 
   the task can move to #todo stage. Here the owner of the idea can move to #doing once s/he is ready. 
   He can also wait a bit for other members to join. * In Review ⚙️: On-going * Completed 🙌🏽**: Finished 
   You could add other lists like labels holding labels (with colors) in order to tag each card by a label if you wish.`;

export default function Description({}) {
  const [isEditing, setEditing] = useState(false);
  const [description, setDescription] = useState(initialDescription);
  const [draft, setDraft] = useState(description);

  const handleEdit = () => {
    setDescription(draft);
    setEditing(!isEditing);
  };

  return (
    <div className="mt-2 mb-6">
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
            className={`h-fit max-w-xs whitespace-pre-wrap rounded-md text-sm ${
              isEditing ? "border-2 border-gray-200 p-2 outline-none  focus:border-blue-500" : ""
            }`}
            onBlur={(e) => setDraft(e.target.outerText)}
            suppressContentEditableWarning={true}
          >
            {description}
          </pre>
        </div>
      </div>
    </div>
  );
}
