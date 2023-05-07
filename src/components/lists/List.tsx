import { StrictModeDroppable } from "../commons";
import Task from "./Task";
import { useState } from "react";
import ListHeader from "./ListHeader";
import AddTask from "./AddTask";
import { api } from "~/utils/api";

function List({ listId }: { listId: string }) {
  const { data: list } = api.lists.getById.useQuery(listId);

  // const [cardsList, setCardsList] = useState(list);
  // const cards = JSON.parse(JSON.stringify(list.cards));
  // const orderedCards = cards.sort((a: any, b: any) => a.order - b.order);

  if (!list) return null;

  return (
    <StrictModeDroppable direction="vertical" droppableId={String(list.id)}>
      {(provided, snapshot) => (
        <article
          {...provided.droppableProps}
          ref={provided.innerRef}
          className={`w-60 ${snapshot.isDraggingOver ? "" : ""}`}
        >
          <ListHeader listName={list.title}></ListHeader>
          <ul className="flex flex-col gap-6">
            {list.tasks.map((task, i: number) => (
              <Task taskId={task.id} key={task.id} index={i}></Task>
            ))}
            {provided.placeholder}
          </ul>
          <AddTask listId={listId} order={((list.tasks.at(-1)?.order) ?? -1)+1}></AddTask>
        </article>
      )}
    </StrictModeDroppable>
  );
}

export default List;
