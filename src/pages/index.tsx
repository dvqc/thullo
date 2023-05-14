import { GetServerSideProps, GetServerSidePropsContext, InferGetServerSidePropsType, type NextPage } from "next";
import Link from "next/link";
import { useState } from "react";
import { AddBoard, BoardCard } from "~/components/boards";
import { Button, Modal } from "~/components/commons";
import { HeaderLayout } from "~/components/layouts";
import { AddSvg } from "~/components/svg";
import { getServerAuthSession } from "~/server/auth";
import { prisma } from "~/server/db";
import { api } from "~/utils/api";

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
  const boardsData = await prisma.board.findMany({
    include: {
      owner: true,
      team: {
        select: {
          id: true,
          name: true,
          image: true
        }
      }
    },
    where: {
      OR: [
        {
          team: {
            some: {
              id: userId
            }
          }
        },
        { userId },
        { isPrivate: false }
      ]
    }
  });

  return {
    props: { session, boardsData: JSON.parse(JSON.stringify(boardsData)) }
  };
};

const Home = ({ boardsData }: InferGetServerSidePropsType<typeof getServerSideProps>) => {
  const [isOpen, setIsOpen] = useState(false);
  const { data: boards } = api.boards.getAll.useQuery(undefined, { initialData: boardsData });
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
              <Link href={"/boards/" + board.id}>
                <BoardCard
                  key={board.id}
                  title={board.title}
                  img={board.picture ?? ""}
                  members={[board.owner, ...board.team]}
                ></BoardCard>
              </Link>
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
