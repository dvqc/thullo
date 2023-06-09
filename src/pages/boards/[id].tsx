import { GetServerSidePropsContext, InferGetServerSidePropsType } from "next";
import { useState } from "react";
import { DragDropContext, DropResult, resetServerContext } from "react-beautiful-dnd";
import { Modal } from "~/components/commons";
import { HeaderLayout } from "~/components/layouts";
import { AddList, List } from "~/components/lists";
import { Menu } from "~/components/menu";
import { TaskView } from "~/components/task";
import { useMoveTaskMutation } from "~/hooks/mutations";
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
      lists: true,
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

  if (boardData.isPrivate && boardData.userId !== userId && !boardData.team.find((member) => member.id === userId))
    return {
      redirect: {
        destination: "/403",
        permanent: false
      }
    };

  return {
    props: { session, boardData: JSON.parse(JSON.stringify(boardData)) }
  };
};

const Board = ({ boardData }: InferGetServerSidePropsType<typeof getServerSideProps>) => {
  const utils = api.useContext();

  const { data: board } = api.boards.getById.useQuery(boardData.id, { initialData: boardData });

  const moveTaskMutation = useMoveTaskMutation();
  const [isOpen, setIsOpen] = useState(false);
  const [selectedTask, setSelectedTask] = useState<string>();
  const openModal = () => setIsOpen(true);
  const closeModal = () => setIsOpen(false);

  const onDragEnd = (result: DropResult) => {
    // dropped outside the lists
    if (!result.destination) {
      return;
    }
    const destListId = result.destination.droppableId;
    const srcListId = result.source.droppableId;
    const taskId = result.draggableId;
    const indx = result.destination.index;

    moveTaskMutation.mutate(
      { taskId, destListId, indx },
      {
        onSettled: () => {
          utils.lists.getById.invalidate(srcListId);
          if (srcListId !== destListId) utils.lists.getById.invalidate(destListId);
        }
      }
    );
  };
  resetServerContext();

  return (
    <HeaderLayout boardTitle={board.title}>
      <main className="flex w-full flex-grow flex-col bg-white py-6 px-6">
        <Menu board={board}></Menu>
        <section className="my-8 flex h-full flex-wrap gap-10 rounded-xl bg-slate-50 px-6 pt-6 pb-14 ">
          <DragDropContext onDragEnd={onDragEnd}>
            {board.lists.map((list) => (
              <List
                listData={list}
                key={list.id}
                selectTask={(id: string) => {
                  openModal();
                  setSelectedTask(id);
                }}
              ></List>
            ))}
            <AddList boardId={board.id}></AddList>
          </DragDropContext>
        </section>
      </main>
      {selectedTask && (
        <Modal isOpen={isOpen} onClose={closeModal}>
          <TaskView taskId={selectedTask}></TaskView>
        </Modal>
      )}
    </HeaderLayout>
  );
};

export default Board;
