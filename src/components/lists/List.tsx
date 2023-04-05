import { Droppable } from "react-beautiful-dnd";
import { Animate, Button, StrictModeDroppable } from "../commons";
import { AddSvg } from "../svg";
import ListCard from "./ListCard";
import dynamic from "next/dynamic";
import { useState } from "react";

function List({ list }: { list: any }) {
  const cards = JSON.parse(JSON.stringify(list.cards));
  const orderedCards = cards.sort((a: any, b: any) => a.order - b.order);
  const [isAdding, setIsAdding] = useState(false);

  return (
    <StrictModeDroppable direction="vertical" droppableId={String(list.id)}>
      {(provided, snapshot) => (
        <article
          {...provided.droppableProps}
          ref={provided.innerRef}
          className={`w-60 ${snapshot.isDraggingOver ? "" : ""}`}
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

          <div className="relative mt-6">
            <Animate isMounted={isAdding} animationIn="animate-fade-in" animationOut="animate-fade-out" delay={400}>
              <div tabIndex={-1} className="my-4 rounded-xl border-1 border-gray-200 bg-white p-3 shadow-lg">
                <textarea
                  rows={2}
                  cols={22}
                  placeholder="Enter a title for this card..."
                  className="scroll-hidden p-1"
                ></textarea>
                <Button className="mt-1 bg-green-700 hover:bg-green-600">Save</Button>
              </div>
            </Animate>

            <Button
              onClick={() => setIsAdding(!isAdding)}
              btnType="primary-light"
              className={`w-full justify-between ${!isAdding && "animate-slide-up"}`}
            >
              Add another card <AddSvg className="h-4 w-4"></AddSvg>
            </Button>
          </div>
        </article>
      )}
    </StrictModeDroppable>
  );
}
export default dynamic(() => Promise.resolve(List), {
  ssr: false
});
