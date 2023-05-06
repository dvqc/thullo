import { useState } from "react";
import { Animate, Button } from "../commons";
import { AddSvg } from "../svg";

export default function AddCard({ show, handleAddTask }: { show: boolean; handleAddTask: () => void }) {
  const [newTaskTitle, setNewTaskTitle] = useState("");

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
    <article className="relative mt-6">
      <Animate isMounted={show} animationIn="animate-fade-in" animationOut="animate-fade-out" delay={400}>
        <div tabIndex={-1} className="my-4 rounded-xl border-1 border-gray-200 bg-white p-3 shadow-lg">
          <textarea
            rows={2}
            cols={22}
            placeholder="Enter a title for this card..."
            className="scroll-hidden p-1"
            value={newTaskTitle}
            onChange={(e) => setNewTaskTitle(e.target.value)}
          ></textarea>
          <Button onClick={handleSave} className="mt-1 bg-green-700 hover:bg-green-600">
            Save
          </Button>
        </div>
      </Animate>

      <Button
        onClick={handleAddTask}
        btnType="primary-light"
        className={`absolute w-full justify-between ${!show && "animate-slide-up "}`}
      >
        Add another card <AddSvg className="h-4 w-4"></AddSvg>
      </Button>
    </article>
  );
}
