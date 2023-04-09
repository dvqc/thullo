import { useState } from "react";
import { Button, UserImage } from "../commons";

export default function WriteComment() {
  const [comment, setComment] = useState("");

  const handleSubmitComment = () => {};
  return (
    <article tabIndex={-1} className="my-4 rounded-xl border-1 border-gray-200 bg-white p-3 shadow-lg">
      <div className="flex space-x-4">
        <UserImage url={"/profilepic.jpg"}></UserImage>
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
