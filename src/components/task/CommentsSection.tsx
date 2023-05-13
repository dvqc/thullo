import { api } from "~/utils/api";
import Comment from "./Comment";

export default function CommentsSection({ taskId }: { taskId: string }) {
  const { data: comments } = api.comments.getByTaskId.useQuery(taskId);

  if (!comments) return null;
  return (
    <div>
      {comments.map((comment) => (
        <Comment key={comment.id} comment={comment}></Comment>
      ))}
    </div>
  );
}
