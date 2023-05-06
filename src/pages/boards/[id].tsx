import { GetServerSidePropsContext, InferGetServerSidePropsType } from "next";
import { DragDropContext, DropResult, resetServerContext } from "react-beautiful-dnd";
import { HeaderLayout } from "~/components/layouts";
import { List } from "~/components/lists";
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
      lists: {
        select: {
          id: true,
          title: true,
        }
      },
      team: {
        select: {
          id: true,
          name: true,
          image: true
        }
      }
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
    props: { session, boardData: JSON.parse(JSON.stringify(boardData)) }
  };
};

const Board = ({ boardData }: InferGetServerSidePropsType<typeof getServerSideProps>) => {
  const { data: board } = api.boards.getById.useQuery(boardData.id, { initialData: boardData });

  const onDragEnd = (result: DropResult) => {
    // dropped outside the lists
    if (!result.destination) {
      return;
    }

    // const reordered = reorder(
    //   lists,
    //   result.source.droppableId,
    //   result.destination.droppableId,
    //   result.source.index,
    //   result.destination.index
    // );

    // setLists(reordered);
  };
  resetServerContext();

  return (
    <HeaderLayout>
      <main className="flex w-full flex-grow flex-col bg-white py-6 px-6">
        <Menu board={board}></Menu>
        <div className="h-full rounded-xl bg-slate-50 py-6">
          <section className="my-10 flex flex-wrap gap-10">
            <DragDropContext onDragEnd={onDragEnd}>
              {board.lists.map((list) => (
                <List listData={list} key={list.id}></List>
              ))}
            </DragDropContext>
          </section>
        </div>
      </main>
    </HeaderLayout>
  );
};

export default Board;
