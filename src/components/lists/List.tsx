import { StrictModeDroppable } from "../commons";
import Task from "./Task";
import ListHeader from "./ListHeader";
import AddTask from "./AddTask";
import { api } from "~/utils/api";
import type { List } from "~/types";

export default function List({ listData, selectTask }: { listData: List; selectTask: (id: string) => void }) {
  const utils = api.useContext();

  const { data: list } = api.lists.getById.useQuery(listData.id, { initialData: listData });
  const deleteListMutation = api.lists.delete.useMutation({
    onSuccess: () => utils.boards.getById.invalidate(list.boardId)
  });

  return (
    <StrictModeDroppable direction="vertical" droppableId={list.id}>
      {(provided, snapshot) => (
        <article
          {...provided.droppableProps}
          ref={provided.innerRef}
          className={`w-60 ${snapshot.isDraggingOver ? "" : ""}`}
        >
          <ListHeader
            listId={list.id}
            listName={list.title}
            onDelete={() => deleteListMutation.mutate(list.id)}
          ></ListHeader>
          {list.tasks && (
            <>
              <ul className="flex flex-col gap-6">
                {list.tasks.map((task, i: number) => (
                  <Task taskId={task.id} key={task.id + task.indx} selectTask={selectTask}></Task>
                ))}
                {provided.placeholder}
              </ul>
              <AddTask listId={list.id} indx={(list.tasks.at(-1)?.indx ?? -1) + 1}></AddTask>
            </>
          )}
        </article>
      )}
    </StrictModeDroppable>
  );
}
