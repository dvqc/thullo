import { NextPage } from "next";
import { AddBoard, BoardCard } from "~/components/boards";
import { List } from "~/components/lists";
import boards from "~/data/boards.json";
import lists from "~/data/lists.json";

const Boards: NextPage = () => {
  // const hello = api.example.hello.useQuery({ text: "from tRPC" });

  return (
    <>
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
          {lists.map((list) => list && list.cards.length > 0 && <List key={list.id} list={list}></List>)}
        </section>
      </main>
    </>
  );
};

export default Boards;
