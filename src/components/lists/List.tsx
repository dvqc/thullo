import { Animate, Button, StrictModeDroppable } from "../commons";
import { AddSvg, MoreHorizSvg } from "../svg";
import ListCard from "./ListCard";
import dynamic from "next/dynamic";
import { useState } from "react";
import ListHeader from "./ListHeader";

function List({ list }: { list: any }) {
  const [isAdding, setIsAdding] = useState(false);
  const [cardsList, setCardsList] = useState(list);
  const [newCardTitle, setNewCardTitle] = useState("");
  const cards = JSON.parse(JSON.stringify(list.cards));
  const orderedCards = cards.sort((a: any, b: any) => a.order - b.order);

  const handleAddCard = () => {
    setIsAdding(!isAdding);
    setNewCardTitle("");
  };

  const handleSave = () => {
    // const newCard = {
    //   id: Math.round(Math.random() * 1000),
    //   title: newCardTitle,
    //   cover: "",
    //   description: "",
    //   members: [],
    //   labels: [],
    //   attachments: [],
    //   comments: [],
    //   order: orderedCards.at(-1).order + 1
    // };
    // setNewCardTitle("");
    // setIsAdding(false);
    // setCardsList({ ...cardsList, cards: [...cardsList.cards, newCard] });
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

          <div className="relative mt-6">
            <Animate isMounted={isAdding} animationIn="animate-fade-in" animationOut="animate-fade-out" delay={400}>
              <div tabIndex={-1} className="my-4 rounded-xl border-1 border-gray-200 bg-white p-3 shadow-lg">
                <textarea
                  rows={2}
                  cols={22}
                  placeholder="Enter a title for this card..."
                  className="scroll-hidden p-1"
                  value={newCardTitle}
                  onChange={(e) => setNewCardTitle(e.target.value)}
                ></textarea>
                <Button onClick={handleSave} className="mt-1 bg-green-700 hover:bg-green-600">
                  Save
                </Button>
              </div>
            </Animate>

            <Button
              onClick={handleAddCard}
              btnType="primary-light"
              className={`absolute w-full justify-between ${!isAdding && "animate-slide-up "}`}
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
