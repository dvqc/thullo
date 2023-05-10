import { useState } from "react";
import { api } from "~/utils/api";
import { Animate, Button } from "../commons";
import { AddSvg } from "../svg";

export default function AddTask({ listId, indx }: { listId: string; indx: number }) {
  const [title, setTitle] = useState("");
  const [isAdding, setIsAdding] = useState(false);

  const utils = api.useContext();

  const createTaskMutation = api.tasks.create.useMutation({
    onSuccess: () => utils.lists.getById.invalidate(listId)
  });

  const handleSave = () => {
    createTaskMutation.mutate({listId,  data: { title, indx } });
    setTitle("");
    setIsAdding(false);
  };

  const handleAddTask = () => {
    setIsAdding(!isAdding);
  };

  return (
    <article className="relative mt-6">
      <Animate isMounted={isAdding} animationIn="animate-fade-in" animationOut="animate-fade-out" delay={400}>
        <div tabIndex={-1} className="my-4 rounded-xl border-1 border-gray-200 bg-white p-3 shadow-lg">
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

      <Button
        onClick={handleAddTask}
        btnType="primary-light"
        className={`absolute w-full justify-between ${!isAdding && "animate-slide-up "}`}
        onAnimationEnd={() => !isAdding && setTitle("")}
      >
        Add another card <AddSvg className="h-4 w-4"></AddSvg>
      </Button>
    </article>
  );
}
