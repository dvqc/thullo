import { NextPage } from "next";
import { AddBoard, BoardCard } from "~/components/Boards";
import boards from "~/data/boards.json";

const Boards: NextPage = () => {
  // const hello = api.example.hello.useQuery({ text: "from tRPC" });
  console.log(boards);
  return (
    <main className="my-10 flex flex-col items-center justify-center">
      <h1>boards</h1>
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
      {/* <section className="my-10">
        <AddBoard></AddBoard>
      </section> */}
    </main>
  );
};

export default Boards;
