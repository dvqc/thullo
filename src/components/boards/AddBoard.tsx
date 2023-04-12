import { ChangeEvent, FormEvent, useState } from "react";
import { api } from "~/utils/api";
import { Button, Collapsible, VisibilityCard } from "../commons";
import { AddSvg, LockSvg, PublicSvg } from "../svg";
import CoverChooser from "./CoverChooser";

export default function AddBoard({ onCancel }: { onCancel: () => void }) {
  const [title, setTitle] = useState("");
  const [isPrivate, setPrivate] = useState(false);
  const [coverImg, setCoverImg] = useState<File>();

  const createBoardMutation = api.board.create.useMutation();

  const handleTitle = (e: ChangeEvent<HTMLInputElement>) => setTitle(e.target.value);
  const handleCover = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) setCoverImg(e.target.files[0]);
  };

  const handleCancel = (e: FormEvent) => {
    e.preventDefault();
    onCancel();
  };
  const handleSubmit = (event: FormEvent) => {
    event.preventDefault();
    createBoardMutation.mutate({
      title,
      isPrivate
    });
    onCancel();
  };

  return (
    <article className="w-[310px]">
      <form onSubmit={handleSubmit}>
        <img
          className="h-20 w-full rounded-lg object-cover"
          src={`${coverImg ? URL.createObjectURL(coverImg) : "/ceo.jpeg"}`}
          alt=""
        />
        <div className="my-3">
          <input
            name="title"
            type={"text"}
            value={title}
            onChange={handleTitle}
            placeholder="Add board title.."
            className="input"
          ></input>
        </div>
        <div className="my-4 flex justify-between">
          <CoverChooser handleCover={handleCover}></CoverChooser>
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
    </article>
  );
}
