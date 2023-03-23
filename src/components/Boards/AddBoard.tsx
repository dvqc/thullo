import { ChangeEvent, FormEvent, useState } from "react";

export default function AddBoard({}) {
  const [title, setTitle] = useState("");
  const [isPrivate, setPrivate] = useState(false);
  const [coverImg, setCoverImg] = useState<File>();

  const handleCheckPrivate = () => setPrivate(!isPrivate);
  const handleTitle = (e: ChangeEvent<HTMLInputElement>) => setTitle(e.target.value);
  const handleCancel = (e: FormEvent) => {
    e.preventDefault();
  };
  const handleSubmit = (event: FormEvent) => {
    event.preventDefault();
  };

  return (
    <article className="h-[270px] w-[310px] rounded-lg px-6 py-5 shadow-md">
      <form onSubmit={handleSubmit}>
        <img className="h-20 w-full rounded-lg" src="/ceo.jpeg" alt="" />
        <input
          name="title"
          type={"text"}
          value={title}
          onChange={handleTitle}
          className="flex items-center border-[1px] border-gray-400 px-4 py-2 text-sm text-black"
        ></input>
        <div>
          <input type={"file"}></input>
          <input type={"checkbox"} className="" checked={isPrivate} onChange={handleCheckPrivate}></input>
        </div>
        <div>
          <button onClick={handleCancel}>Cancel</button>
          <button>Create</button>
        </div>
      </form>
      <button className="absolute top-3 right-3 flex h-8 w-8 items-center justify-center rounded-lg bg-blue-500">
        X
      </button>
    </article>
  );
}
