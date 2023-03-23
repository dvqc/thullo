import { NextPage } from "next";
import { AddBoard, BoardCard } from "~/components/Boards";

const Boards: NextPage = () => {
  // const hello = api.example.hello.useQuery({ text: "from tRPC" });

  return (
    <main className="my-10 flex flex-col items-center justify-center">
      <section className="my-10">
        <BoardCard
          title="Kanban Template"
          img="/ceo.jpeg"
          members={[{ img: "/ceo.jpeg" }, { img: "/ceo.jpeg" }, { img: "/ceo.jpeg" }, { img: "/ceo.jpeg" }]}
        ></BoardCard>
      </section>
      <section className="my-10">
        <AddBoard></AddBoard>
      </section>
    </main>
  );
};

export default Boards;
