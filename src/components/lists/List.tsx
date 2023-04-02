import { Droppable } from "react-beautiful-dnd";
import { Button, StrictModeDroppable } from "../commons";
import { AddSvg } from "../svg";
import ListCard from "./ListCard";
import dynamic from "next/dynamic";

function List({ list }: { list: any }) {
  const cards = JSON.parse(JSON.stringify(list.cards));
  const orderedCards = cards.sort((a: any, b: any) => a.order - b.order);
  return (
    <StrictModeDroppable direction="vertical" droppableId={String(list.id)}>
      {(provided, snapshot) => (
        <article
          {...provided.droppableProps}
          ref={provided.innerRef}
          className={`max-w-fit ${snapshot.isDraggingOver ? "bg-blue-100" : ""}`}
        >
          <div className="my-4 flex items-center justify-between">
            <h2 className="text-sm font-medium text-black"> {list.name}</h2>
            <p>...</p>
          </div>
          <ul className="flex flex-col gap-6">
            {orderedCards.map((card: any, i: number) => (
              <ListCard card={card} key={card.id} index={i}></ListCard>
            ))}
            {provided.placeholder}
          </ul>
          <Button btnType="primary-light" className="mt-6 w-full justify-between">
            Add another card <AddSvg className="h-4 w-4"></AddSvg>
          </Button>
        </article>
      )}
    </StrictModeDroppable>
  );
}
export default dynamic(() => Promise.resolve(List), {
  ssr: false
});
