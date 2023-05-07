import { StrictModeDroppable } from "../commons";
import Task from "./Task";
import { useState } from "react";
import ListHeader from "./ListHeader";
import AddTask from "./AddTask";
import { api } from "~/utils/api";
import type { List } from "~/types";

export default function List({ listData }: { listData: List }) {
  const { data: list } = api.lists.getById.useQuery(listData.id, { initialData: listData });

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
          <AddTask listId={list.id} order={(list.tasks.at(-1)?.order ?? -1) + 1}></AddTask>
        </article>
      )}
    </StrictModeDroppable>
  );
}
