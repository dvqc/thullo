import { Button, UserImage } from "../commons";

export default function Comment() {
  return (
    <article>
      <div className="flex justify-between">
        <div className="flex items-center space-x-3">
          <UserImage url="/profilepic.jpg"></UserImage>
          <div className="">
            <p className="font-poppins text-xs font-medium text-black">Mikael Stanley</p>
            <p className="text-2xs font-medium text-gray-400">24 August at 20:43</p>
          </div>
        </div>
        <div className="flex items-center space-x-1">
          <Button btnType="secondary-light">Edit</Button>
          <p className="text-xs text-gray-400"> - </p>
          <Button btnType="secondary-light">Delete</Button>
        </div>
      </div>
      <p className="my-3 text-neutral-700">
        “The gladdest moment in human life, methinks, is a departure into unknown lands.” - Sir Richard Burton
      </p>
    </article>
  );
}
