/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import { type NextPage } from "next";
import { AddBoard, BoardCard } from "~/components/boards";
import { List } from "~/components/lists";
import boards from "~/data/boards.json";
import listsJson from "~/data/lists.json";
import cards from "~/data/cards.json";
import { DragDropContext, Droppable, DropResult, resetServerContext } from "react-beautiful-dnd";
import { useState } from "react";
import { CardView } from "~/components/cards";
import { api } from "~/utils/api";
import { Button, Modal } from "~/components/commons";
import { Menu } from "~/components/menu";

const reorder = (lists: any, srcListId: string, destListId: string, srcIndex: number, destIndex: number) => {
  // if same list & same position: do nothing
  if (destListId === srcListId && srcIndex === destIndex) return lists;

  // create a deep clone of lists array
  const listsCopy = JSON.parse(JSON.stringify(lists));
  // get destination list
  const destList = listsCopy.find((list: any) => list.id == destListId);
  // sort the list to accecss items by index
  destList.cards.sort((a: any, b: any) => a.order - b.order);
  // get source list
  const srcList = listsCopy.find((list: any) => list.id == srcListId);
  // sort the list to accecss items by index
  srcList.cards.sort((a: any, b: any) => a.order - b.order);

  // srcList.cards[srcIndex].order = -1;
  // if the card is moved in the same list
  if (destListId === srcListId) {
    if (srcIndex < destIndex) {
      for (let i = srcIndex + 1; i <= destIndex; i++) srcList.cards[i].order--;
    } else if (srcIndex > destIndex) {
      for (let i = destIndex; i < srcIndex; i++) srcList.cards[i].order++;
    }
    const cardsWithoutDraggable = srcList.cards.filter((card: any, i: number) => i !== srcIndex);
    destList.cards = [...cardsWithoutDraggable, srcList.cards[srcIndex]];
    // if the card is moved to a different list
  } else {
    for (let i = srcIndex + 1; i < srcList.cards.length; i++) srcList.cards[i].order--;
    for (let i = destIndex; i < destList.cards.length; i++) destList.cards[i].order++;
    destList.cards = [...destList.cards, srcList.cards[srcIndex]];
    srcList.cards = srcList.cards.filter((card: any, i: number) => i !== srcIndex);
  }
  destList.cards.at(-1).order = destIndex;
  console.log(destList.cards);
  return listsCopy;
};

const Boards: NextPage = () => {
  const [lists, setLists] = useState(listsJson);
  // console.log(lists[0]?.cards.map((card) => card.order));
  // const hello = api.example.hello.useQuery({ text: "from tRPC" });
  const onDragEnd = (result: DropResult) => {
    // dropped outside the list
    if (!result.destination) {
      return;
    }
    const reordered = reorder(
      lists,
      result.source.droppableId,
      result.destination.droppableId,
      result.source.index,
      result.destination.index
    );

    setLists(reordered);
  };
  resetServerContext();

  const ctx = api.useContext();
  const { data, isLoading: postsLoading } = api.board.getAll.useQuery();

  const [isOpen, setIsOpen] = useState(false);

  const openModal = () => setIsOpen(true);
  const closeModal = () => setIsOpen(false);

  return (
    <main className="container mx-auto flex flex-grow flex-col">
      <Menu></Menu>
      <div className="m-4 h-full flex-grow rounded-xl bg-slate-50 p-5">
        <h2>boards</h2>
        <section className="my-10 flex flex-wrap gap-10">
          {boards.map((board) => (
            <BoardCard
              key={board.id}
              title={board.title}
              img={board.cover}
              members={[board.createdBy, ...board.members]}
            ></BoardCard>
          ))}
        </section>
        {/* <Button onClick={openModal}>open modal</Button>
      <h2>lists</h2>
      <section className="my-10 flex flex-wrap gap-10">
        <DragDropContext onDragEnd={onDragEnd}>
          {lists.map((list: any) => list && <List list={list} key={list.id}></List>)}
        </DragDropContext>
      </section>
      <Modal isOpen={isOpen} onClose={closeModal}> */}
        {/* <AddBoard onCancel={closeModal}></AddBoard> */}
        {/* <CardView card={cards[0]}></CardView>
      </Modal> */}
      </div>
    </main>
  );
};

export default Boards;
