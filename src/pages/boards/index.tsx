import { NextPage } from "next";
import { AddBoard, BoardCard } from "~/components/boards";
import { List } from "~/components/lists";
import boards from "~/data/boards.json";
import listsJson from "~/data/lists.json";
import { DragDropContext, Droppable, DropResult, resetServerContext } from "react-beautiful-dnd";
import { useState } from "react";

// const lists = JSON.parse(JSON.stringify(listsJson));

const reorder = (
  lists: any,
  srcListId: string,
  destListId: string,
  srcIndex: number,
  destIndex: number
  // cardId: number
) => {
  const listsCopy = JSON.parse(JSON.stringify(lists));
  const destList = listsCopy.find((list: any) => list.id == destListId);
  destList.cards.sort((a: any, b: any) => a.order - b.order);
  const srcList = listsCopy.find((list: any) => list.id == srcListId);
  srcList.cards.sort((a: any, b: any) => a.order - b.order);

  srcList.cards[srcIndex].order = -1;
  if (destListId === srcListId && srcIndex != destIndex) {
    if (srcIndex < destIndex) {
      for (let i = srcIndex + 1; i <= destIndex; i++) srcList.cards[i].order--;
    }
    if (srcIndex > destIndex) {
      for (let i = destIndex; i < srcIndex; i++) srcList.cards[i].order++;
    }
  } else {
    for (let i = srcIndex + 1; i < srcList.cards.length; i++) srcList.cards[i].order--;
    for (let i = destIndex; i < destList.cards.length; i++) srcList.cards[i].order++;
    destList.cards = [...destList.cards, srcList.cards[srcIndex]];
    srcList.cards = srcList.cards.filter((card: any, i: number) => i !== srcIndex);
  }
  destList.cards[srcIndex].order = destIndex;

  return listsCopy;
};
const Boards: NextPage = () => {
  const [lists, setLists] = useState(listsJson);
  console.log(lists[0]?.cards.map((card) => card.order));
  // const hello = api.example.hello.useQuery({ text: "from tRPC" });
  const onDragEnd = (result: DropResult) => {
    // dropped outside the list
    if (!result.destination) {
      return;
    }

    console.log(result.source.droppableId);
    console.log(result.destination.droppableId);
    console.log(result.source.index);
    console.log(result.destination.index);

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

  return (
    <main className="my-10 flex flex-col items-center justify-center">
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
        <AddBoard></AddBoard>
      </section>
      <h2>lists</h2>
      <section className="my-10 flex flex-wrap gap-10">
        <DragDropContext onDragEnd={onDragEnd}>
          {lists.map((list: any) => list && list.cards.length > 0 && <List list={list} key={list.id}></List>)}
        </DragDropContext>
      </section>
    </main>
  );
};

export default Boards;
