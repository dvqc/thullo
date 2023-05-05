import { GetServerSidePropsContext, InferGetServerSidePropsType, NextPage } from "next";
import { HeaderLayout } from "~/components/layouts";
import { Menu } from "~/components/menu";
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
  const { data: board } = api.boards.getById.useQuery(boardData.id, { initialData: boardData });
  const utils = api.useContext();
  const patchBoardMutation = api.boards.patch.useMutation({
    onSuccess: () => utils.boards.getById.invalidate(boardData.id)
  });

  return (
    <HeaderLayout>
      <main className="flex w-full flex-grow flex-col bg-white py-6 px-6">
        <Menu
          members={board.team}
          isPrivate={board.isPrivate ?? false}
          setPrivate={(isPrivate) => patchBoardMutation.mutate({ id: boardData.id, data: { isPrivate } })}
        ></Menu>
        <div className="h-full rounded-xl bg-slate-50 py-6"></div>
      </main>
    </HeaderLayout>
  );
};

export default Board;
