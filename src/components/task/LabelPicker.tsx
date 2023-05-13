import { useState } from "react";
import { Button } from "../commons";
import ColorButton from "./ColorButton";
import { LabelSvg } from "../svg";
import { api } from "~/utils/api";
import Badge from "../lists/Badge";

export default function LabelPicker({ taskId }: { taskId: string }) {
  const [label, setLabel] = useState("");
  const [selectedColor, setSelectedColor] = useState<number | null>(null);
  const colorsList = [
    "219653",
    "F2C94C",
    "F2994A",
    "EB5757",
    "2F80ED",
    "56CCF2",
    "6FCF97",
    "333333",
    "4F4F4F",
    "828282",
    "BDBDBD",
    "BDBDBD"
  ];

  const utils = api.useContext();
  const { data: labels } = api.labels.getByTaskId.useQuery(taskId);
  const createLabelMutation = api.labels.create.useMutation();

  const handleAdd = () => {
    if (selectedColor !== null && label !== "")
      createLabelMutation.mutate(
        {
          taskId,
          data: {
            name: label,
            color: colorsList[selectedColor] ?? "000000"
          }
        },
        {
          onSuccess: () => {
            utils.labels.getByTaskId.invalidate(taskId);
          },
          onSettled: () => {
            setSelectedColor(null), setLabel("");
          }
        }
      );
  };
  return (
    <article className="w-60 cursor-default rounded-xl border-1 border-gray-200 bg-white p-3 shadow-md">
      <h4 className="font-pop my-1 text-xs font-semibold text-neutral-800">Add a label</h4>
      <p className="text-xs text-gray-400 ">Select a name and a color</p>
      <div className="my-4">
        <input
          className="input cursor-text border-transparent"
          placeholder="Label..."
          value={label}
          onChange={(e) => setLabel(e.currentTarget.value)}
        ></input>
      </div>
      <div className="my-4 grid grid-cols-4 gap-2">
        {colorsList.map((color, i) => (
          <ColorButton
            color={`#${color}`}
            key={i}
            isSelected={i === selectedColor}
            onClick={() => {
              setSelectedColor(i);
            }}
          ></ColorButton>
        ))}
      </div>

      {/* Todo available labels */}
      <p className="font-pop my-1 flex items-center text-xs font-semibold text-gray-400 ">
        <LabelSvg className="mr-2 h-4 w-4 fill-gray-400"></LabelSvg> Add a label
      </p>
      <div className="my-3 flex flex-wrap gap-3">
        {labels && labels.map((label) => <Badge key={label.id} label={label}></Badge>)}
      </div>

      <div className="mt-4 flex justify-center">
        <Button onClick={handleAdd}>Add</Button>
      </div>
    </article>
  );
}
