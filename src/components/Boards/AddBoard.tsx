import { ChangeEvent, FormEvent, useState } from "react";
import { AddSvg, CloseSvg, ImageSvg, LockSvg } from "../Svg";

export default function AddBoard({}) {
  const [title, setTitle] = useState("");
  const [isPrivate, setPrivate] = useState(false);
  const [coverImg, setCoverImg] = useState<File>();

  const handleCheckPrivate = () => setPrivate(!isPrivate);
  const handleTitle = (e: ChangeEvent<HTMLInputElement>) => setTitle(e.target.value);
  const handleCover = (e: ChangeEvent<HTMLInputElement>) => {
    console.log(e.target);
    if (e.target.files) setCoverImg(e.target.files[0]);
  };

  const handleCancel = (e: FormEvent) => {
    e.preventDefault();
  };
  const handleSubmit = (event: FormEvent) => {
    event.preventDefault();
  };

  return (
    <article className="relative w-[310px] rounded-lg px-5 py-5 shadow-xl">
      <form onSubmit={handleSubmit}>
        <img
          className="h-20 w-full rounded-lg object-cover"
          src={`${coverImg ? URL.createObjectURL(coverImg) : "/ceo.jpeg"}`}
          alt=""
        />
        <div className="my-3 w-full">
          <input
            name="title"
            type={"text"}
            value={title}
            onChange={handleTitle}
            placeholder="Add board title.."
            className="flex items-center rounded-lg  border-[1px] border-gray-400 px-4 py-2 
            text-sm text-black shadow-lg focus:border-blue-500"
          ></input>
        </div>
        <div className="my-4 flex justify-between">
          <label
            htmlFor="cover"
            className="relative flex h-8 w-28 cursor-pointer items-center justify-evenly rounded-lg bg-gray-100 px-2 
          text-sm font-medium text-gray-500 duration-300  hover:bg-gray-200"
          >
            <span className="h-4">
              <ImageSvg className="fill-gray-500"></ImageSvg>
            </span>
            Cover
            <input type={"file"} id="cover" className="absolute -z-50 opacity-0" onChange={handleCover}></input>
          </label>

          <label
            htmlFor="private"
            className={`flex h-8 w-28 cursor-pointer items-center justify-evenly  rounded-lg 
          px-2 text-sm  font-medium duration-300 ${
            !isPrivate ? "bg-gray-100 text-gray-500 hover:bg-gray-200" : "bg-blue-500 text-white hover:bg-blue-600"
          }`}
          >
            <span className="h-4">
              <LockSvg className={` ${!isPrivate ? "fill-gray-500" : "fill-white"}`}></LockSvg>
            </span>
            Private
            <input
              id="private"
              type={"checkbox"}
              checked={isPrivate}
              className="hidden"
              onChange={handleCheckPrivate}
            ></input>
          </label>
        </div>
        <div className="flex justify-end">
          <button
            className="mx-4 flex h-8 w-20 items-center justify-center rounded-lg bg-none px-2 
            text-sm font-medium text-gray-400 duration-300 hover:bg-gray-200"
            onClick={handleCancel}
          >
            Cancel
          </button>
          <button
            className="flex h-8 w-20 items-center justify-evenly rounded-lg bg-blue-500 px-2 
          text-sm font-medium text-white duration-300  hover:bg-blue-600"
          >
            <span className="h-4">
              <AddSvg className="fill-white"></AddSvg>
            </span>
            Create
          </button>
        </div>
      </form>
      <button
        className="absolute top-3 right-3 flex h-8 w-8 items-center justify-center rounded-lg bg-blue-500
       duration-300 hover:bg-blue-600"
      >
        <CloseSvg className="h-5 w-5 fill-white"></CloseSvg>
      </button>
    </article>
  );
}
