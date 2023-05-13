import { useState } from "react";
import { Button, UserImage } from "../commons";
import { useSession } from "next-auth/react";
import { api } from "~/utils/api";

export default function WriteComment({ taskId }: { taskId: string }) {
  const [comment, setComment] = useState("");
  const session = useSession();
  const user = session.data?.user;
  if (!user) return null;

  const utils = api.useContext();
  const createCommentMutation = api.comments.create.useMutation();

  const handleSubmitComment = () => {
    if (comment !== "")
      createCommentMutation.mutate(
        {
          taskId,
          data: {
            text: comment
          }
        },
        {
          onSuccess: () => {
            utils.comments.getByTaskId.invalidate(taskId);
            setComment("");
          }
        }
      );
  };
  return (
    <article tabIndex={-1} className="my-4 rounded-xl border-1 border-gray-200 bg-white p-3 shadow-lg">
      <div className="flex space-x-4">
        <UserImage url={user.image ?? "/profilepic.jpg"}></UserImage>
        <textarea
          rows={2}
          cols={36}
          placeholder="Write a comment..."
          className="scroll-hidden p-1"
          value={comment}
          onChange={(e) => setComment(e.target.value)}
        ></textarea>
      </div>
      <Button onClick={handleSubmitComment} className="mt-1 mr-0 ml-auto">
        Comment
      </Button>
    </article>
  );
}
