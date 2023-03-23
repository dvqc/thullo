import { NextPage } from "next";
import { BoardCard } from "~/components/Boards";

const Boards: NextPage = () => {
  // const hello = api.example.hello.useQuery({ text: "from tRPC" });

  return (
    <main>
      <BoardCard
        title="Kanban Template"
        img="/ceo.jpeg"
        members={[{ img: "/ceo.jpeg" }, { img: "/ceo.jpeg" }, { img: "/ceo.jpeg" }, { img: "/ceo.jpeg" }]}
      ></BoardCard>
    </main>
  );
};

export default Boards;
