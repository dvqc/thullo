import { Draggable } from "react-beautiful-dnd";
import { Button, Members, Skeleton } from "../commons";
import { AddSvg, CommentSvg } from "../svg";
import Badge from "./Badge";
import { api } from "~/utils/api";
import Image from "next/image";
import dynamic from "next/dynamic";

function Task({ taskId, selectTask }: { taskId: string; selectTask: (id: string) => void }) {
  const { data: task } = api.tasks.getPreviewById.useQuery(taskId);

  if (!task) return <Skeleton className="h-24"></Skeleton>;

  return (
    <Draggable key={task.id + task.indx} draggableId={task.id} index={task.indx}>
      {(provided, snapshot) => (
        <li
          role="button"
          className={`unselectable w-60 rounded-xl bg-white p-3 shadow-lg duration-200 hover:-translate-y-1 ${
            snapshot.isDragging ? "rotate-6  duration-200" : ""
          }`}
          style={{
            ...provided.draggableProps.style,
            transform: snapshot.isDragging ? "rotate(20deg)" : "",
            fontSize: 18
          }}
          ref={provided.innerRef}
          {...provided.draggableProps}
          {...provided.dragHandleProps}
          onClick={() => selectTask(taskId)}
        >
          {task.cover && (
            <Image className="h-32 w-full rounded-xl object-cover" width={240} height={128} src={task.cover} alt="" />
          )}
          <h3 className="my-3 text-base font-normal text-black ">{task.title}</h3>
          <div className="my-3 flex flex-wrap gap-3">
            {task.labels.map((label) => (
              <Badge key={label.id} label={label}></Badge>
            ))}
          </div>
          <div className="mt-5 flex flex-wrap items-center justify-between gap-3">
            <div className="flex items-center gap-2">
              <Members members={task.members}></Members>
              <Button className="h-7 w-7 p-0" onClick={(e) => e.stopPropagation()}>
                <AddSvg className="h-4 w-4"></AddSvg>
              </Button>
            </div>
            <div className="flex items-center gap-3">
              {task._count.comments > 0 && (
                <p className="flex h-4 items-center fill-gray-400 text-xs text-gray-400">
                  <CommentSvg></CommentSvg> {task._count.comments}
                </p>
              )}
              {/*   {task.attachmentsNumber > 0 && (
                <p className="flex h-4 items-center fill-gray-400 text-xs text-gray-400">
                  <FileSvg></FileSvg>
                  {task.attachmentsNumber}
                </p>
              )}*/}
            </div>
          </div>
        </li>
      )}
    </Draggable>
  );
}
export default dynamic(() => Promise.resolve(Task), {
  ssr: true
});
