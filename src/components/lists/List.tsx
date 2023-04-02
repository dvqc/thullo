import { Droppable } from "react-beautiful-dnd";
import { Button } from "../commons";
import { AddSvg } from "../svg";
import ListCard from "./ListCard";
import dynamic from "next/dynamic";

function List({ list }: { list: any }) {
  return (
    <Droppable direction="vertical" droppableId={String(list.id)}>
      {(provided, snapshot) => (
        <article
          {...provided.droppableProps}
          ref={provided.innerRef}
          className={`max-w-fit ${snapshot.isDraggingOver ? "bg-blue-300" : ""}`}
        >

          <div className="my-4 flex items-center justify-between">
            <h2 className="text-sm font-medium text-black"> {list.name}</h2>
            <p>...</p>
          </div>
          <ul className="flex flex-col gap-6">
            {list.cards.map((card: any, i: number) => (
              <ListCard card={card} key={card.id} index={i}></ListCard>
            ))}
            {provided.placeholder}
          </ul>
          <Button btnType="primary-light" className="mt-6 w-full justify-between">
            Add another card <AddSvg className="h-4 w-4"></AddSvg>
          </Button>
        </article>
      )}
    </Droppable>
  );
}
export default dynamic(() => Promise.resolve(List), {
  ssr: false
});
