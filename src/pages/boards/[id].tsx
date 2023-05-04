import { GetServerSidePropsContext, InferGetServerSidePropsType, NextPage } from "next";
import { HeaderLayout } from "~/components/layouts";
import { Menu } from "~/components/menu";
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

  const id = ctx.params?.id;
  if (!id || id instanceof Array)
    return {
      redirect: {
        destination: "/404",
        permanent: false
      }
    };

  const boardData = await prisma.board.findUnique({
    where: {
      id
    },
    include: {
      owner: true,
      team: true
    }
  });

  if (!boardData)
    return {
      redirect: {
        destination: "/404",
        permanent: false
      }
    };

  return {
    props: { session, boardData }
  };
};

const Board = ({ boardData }: InferGetServerSidePropsType<typeof getServerSideProps>) => {
  return (
    <HeaderLayout>
      <main className="flex w-full flex-grow flex-col bg-white py-8 px-6 ">
        <Menu members={boardData.team} isPrivate={boardData.isPrivate ?? false}></Menu>
      </main>
    </HeaderLayout>
  );
};

export default Board;
