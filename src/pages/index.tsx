import { GetServerSideProps, GetServerSidePropsContext, InferGetServerSidePropsType, type NextPage } from "next";
import { useState } from "react";
import { AddBoard, BoardCard } from "~/components/boards";
import { Button, Modal } from "~/components/commons";
import { HeaderLayout } from "~/components/layouts";
import { AddSvg } from "~/components/svg";
import { getServerAuthSession } from "~/server/auth";
import { prisma } from "~/server/db";

export const getServerSideProps = async (ctx: GetServerSidePropsContext) => {
  const session = await getServerAuthSession(ctx);

  if (!session || !session.user)
    return {
      redirect: {
        destination: "/login",
        permanent: false
      }
    };

  const userId = session.user.id;
  const boards = await prisma.board.findMany({
    where: {
      userId: {
        equals: userId
      }
    },
    include: {
      owner: true,
      team: true
    }
  });

  return {
    props: { session, boards }
  };
};

const Home = ({ boards }: InferGetServerSidePropsType<typeof getServerSideProps>) => {
  const [isOpen, setIsOpen] = useState(false);
  const openModal = () => setIsOpen(true);
  const closeModal = () => setIsOpen(false);

  return (
    <HeaderLayout>
      <main className="flex w-full flex-grow flex-col bg-slate-50  py-16 px-10 ">
        <section className="mx-auto w-full max-w-6xl">
          <div className="flex justify-between">
            <h2 className="font-poppins text-lg font-medium text-neutral-800">All boards</h2>
            <Button onClick={openModal}>
              <AddSvg className="h-4 w-4"></AddSvg> Add
            </Button>
          </div>
          <section className="my-10 flex flex-wrap gap-10">
            {boards?.map((board) => (
              <BoardCard
                key={board.id}
                title={board.title}
                img={board.picture ?? ""}
                members={[board.owner, ...board.team]}
              ></BoardCard>
            ))}
          </section>
        </section>
      </main>
      <Modal isOpen={isOpen} onClose={closeModal}>
        <AddBoard onCancel={closeModal}></AddBoard>
      </Modal>
    </HeaderLayout>
  );
};

export default Home;
