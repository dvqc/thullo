import { Animate, Button, StrictModeDroppable } from "../commons";
import { AddSvg, MoreHorizSvg } from "../svg";
import ListCard from "./ListCard";
import dynamic from "next/dynamic";
import { useState } from "react";
import ListHeader from "./ListHeader";
import AddCard from "./AddCard";

function List({ list }: { list: any }) {
  const [isAdding, setIsAdding] = useState(false);
  const [cardsList, setCardsList] = useState(list);
  const cards = JSON.parse(JSON.stringify(list.cards));
  const orderedCards = cards.sort((a: any, b: any) => a.order - b.order);

  const handleAddCard = () => {
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
          <ListHeader listName={list.name}></ListHeader>
          <ul className="flex flex-col gap-6">
            {orderedCards.map((card: any, i: number) => (
              <ListCard card={card} key={card.id} index={i}></ListCard>
            ))}
            {provided.placeholder}
          </ul>
          <AddCard show={isAdding} handleAddCard={handleAddCard}></AddCard>
        </article>
      )}
    </StrictModeDroppable>
  );
}
export default dynamic(() => Promise.resolve(List), {
  ssr: false
});
