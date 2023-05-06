import { StrictModeDroppable } from "../commons";
import Task from "./Task";
import dynamic from "next/dynamic";
import { useState } from "react";
import ListHeader from "./ListHeader";
import AddTask from "./AddTask";
import { List } from "~/types";
import { api } from "~/utils/api";

function List({ listData }: { listData: List }) {
  const [isAdding, setIsAdding] = useState(false);
  const { data: list } = api.lists.getById.useQuery(listData.id, { initialData: listData });

  // const [cardsList, setCardsList] = useState(list);
  // const cards = JSON.parse(JSON.stringify(list.cards));
  // const orderedCards = cards.sort((a: any, b: any) => a.order - b.order);

  const handleAddTask = () => {
    setIsAdding(!isAdding);
  };

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
              <Task taskData={task} key={task.id} index={i}></Task>
            ))}
            {provided.placeholder}
          </ul>
          <AddTask show={isAdding} handleAddTask={handleAddTask}></AddTask>
        </article>
      )}
    </StrictModeDroppable>
  );
}

export default dynamic(() => Promise.resolve(List), {
  ssr: false
});
