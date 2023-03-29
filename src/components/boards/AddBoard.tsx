import { ChangeEvent, FormEvent, useState } from "react";
import { Button, Collapsible, VisibilityCard } from "../commons";
import { AddSvg, CloseSvg, ImageSvg, LockSvg, PublicSvg } from "../svg";

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
          <label htmlFor="cover" className="btn secondary relative">
            <span className="h-4">
              <ImageSvg></ImageSvg>
            </span>
            Cover
            <input type={"file"} id="cover" className="absolute -z-50 w-1  opacity-0" onChange={handleCover}></input>
          </label>
          <Collapsible
            toggler={
              <Button btnType="secondary" className="w-20">
                {!isPrivate ? (
                  <>
                    <PublicSvg className="h-3 w-3" />
                    Public
                  </>
                ) : (
                  <>
                    <LockSvg className="h-3 w-3" />
                    Private
                  </>
                )}
              </Button>
            }
            content={<VisibilityCard setIsPrivate={setPrivate} />}
          />
          {/* <label htmlFor="private" className={`btn ${!isPrivate ? "secondary" : "primary"}`}>
            <span className="h-4">
              <LockSvg></LockSvg>
            </span>
            Private
            <input
              id="private"
              type={"checkbox"}
              checked={isPrivate}
              className="hidden"
              onChange={handleCheckPrivate}
            ></input>
          </label> */}
        </div>
        <div className="flex justify-end gap-3">
          <Button btnType="secondary-light" onClick={handleCancel}>
            Cancel
          </Button>
          <Button>
            <span className="h-4">
              <AddSvg></AddSvg>
            </span>
            Create
          </Button>
        </div>
      </form>
      <Button className="absolute top-3 right-3 h-8 w-8">
        <CloseSvg className="h-5 w-5 fill-white"></CloseSvg>
      </Button>
    </article>
  );
}
