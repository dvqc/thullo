import type { Comment } from "~/types";
import { Animate, Button, DescriptionEditable, UserImage } from "../commons";
import { api } from "~/utils/api";
import { useSession } from "next-auth/react";
import { useState } from "react";

export default function Comment({ comment }: { comment: Comment }) {
  const [isEditing, setEditing] = useState(false);
  const [commentText, setCommentText] = useState(comment.text);
  const session = useSession();
  const user = session.data?.user;
  if (!user) return null;

  const utils = api.useContext();
  const deleteCommentMutation = api.comments.delete.useMutation();
  const updateCommentMutation = api.comments.patch.useMutation();

  const dateFormatter = Intl.DateTimeFormat("en", {
    month: "long",
    day: "numeric",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit"
  });

  const handleDelete = () => {
    deleteCommentMutation.mutate(comment.id, {
      onSuccess: () => {
        utils.tasks.getPreviewById.invalidate(comment.taskId);
        utils.comments.getByTaskId.invalidate(comment.taskId);
      }
    });
  };

  const handleEdting = () => {
    setEditing(!isEditing);
  };

  const handleSave = () => {
    if (commentText !== "") {
      updateCommentMutation.mutate(
        {
          id: comment.id,
          data: {
            text: commentText
          }
        },
        {
          onSuccess: () => {
            utils.comments.getByTaskId.invalidate(comment.taskId);
            utils.tasks.getPreviewById.invalidate(comment.taskId);
          }
        }
      );
      setEditing(false);
    }
  };

  const handleCancel = () => {
    setEditing(false);
    setCommentText(comment.text);
  };

  return (
    <article>
      <div className="flex justify-between">
        <div className="flex items-center space-x-3">
          <UserImage url={comment.owner.image ?? "/profilepic.jpg"}></UserImage>
          <div className="">
            <p className="font-poppins text-xs font-medium text-black">{comment.owner.name}</p>
            <p className="text-2xs font-medium text-gray-400">{dateFormatter.format(comment.createdOn)}</p>
          </div>
        </div>
        {user.id === comment.userId && (
          <div className="flex items-center space-x-1">
            <Button btnType="secondary-light" onClick={handleEdting}>
              Edit
            </Button>
            <p className="text-xs text-gray-400"> - </p>
            <Button btnType="danger-outlined" className="py-0" onClick={handleDelete}>
              Delete
            </Button>
          </div>
        )}
      </div>
      {!isEditing ? (
        <p className="my-3 text-neutral-700">{comment.text}</p>
      ) : (
        <article className="my-4 rounded-xl border-1 border-gray-200 bg-white p-3 shadow-lg">
          <div className="flex space-x-4">
            <UserImage url={user.image ?? "/profilepic.jpg"}></UserImage>
            <textarea
              rows={2}
              cols={36}
              placeholder="Write a comment..."
              className="scroll-hidden p-1"
              value={commentText}
              onChange={(e) => setCommentText(e.target.value)}
            ></textarea>
          </div>

          <div tabIndex={-1} className={`my-2 flex h-8`}>
            <div className="flex">
              <Button onClick={handleSave} className="bg-green-700 hover:bg-green-600">
                Save
              </Button>
              <Button onClick={handleCancel} btnType="secondary-light" className="ml-2">
                Cancel
              </Button>
            </div>
          </div>
        </article>
      )}
    </article>
  );
}
