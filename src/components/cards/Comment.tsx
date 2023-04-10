import { Button, UserImage } from "../commons";

export default function Comment({ comment }: { comment: any }) {
  const dateFormatter = Intl.DateTimeFormat("en", {
    month: "long",
    day: "numeric",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit"
  });

  return (
    <article>
      <div className="flex justify-between">
        <div className="flex items-center space-x-3">
          <UserImage url="/profilepic.jpg"></UserImage>
          <div className="">
            <p className="font-poppins text-xs font-medium text-black">{comment.createdBy.username}</p>
            <p className="text-2xs font-medium text-gray-400">{dateFormatter.format(new Date(comment.createdOn))}</p>
          </div>
        </div>
        <div className="flex items-center space-x-1">
          <Button btnType="secondary-light">Edit</Button>
          <p className="text-xs text-gray-400"> - </p>
          <Button btnType="secondary-light">Delete</Button>
        </div>
      </div>
      <p className="my-3 text-neutral-700">{comment.text}</p>
    </article>
  );
}
