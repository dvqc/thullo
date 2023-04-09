import { DescriptionEditable } from "../commons";
import { FileSvg } from "../svg";
import Image from "next/image";
import Attachment from "./Attachment";
import WriteComment from "./WriteComment";
import Comment from "./Comment";

export default function CardView({ card }: { card: any }) {
  return (
    <div className="w-screen max-w-2xl ">
      <Image
        width={616}
        height={130}
        className="h-36 w-full rounded-xl object-cover"
        src={card.cover}
        alt={"Card cover"}
      ></Image>

      <section className="mt-6 flex flex-col">
        <section className="max-w-md">
          <div className="my-6">
            <h2>{card.title}</h2>
            <p className="font-poppins text-2xs font-semibold text-gray-400">
              In list <span className="text-neutral-800">In Progress</span>
            </p>
          </div>
          <div className="my-6">
            <DescriptionEditable initialDescription={card.description}></DescriptionEditable>
          </div>
          <article className="my-6">
            <div className="flex items-center space-x-2 fill-gray-400 text-gray-400">
              <FileSvg className="h-4 w-4" />
              <p className="font-poppins text-2xs font-semibold ">Attachments</p>
            </div>

            <div className="space-y-2 py-2">
              <Attachment></Attachment>
              <Attachment></Attachment>
            </div>

            <div className="my-6">
              <WriteComment></WriteComment>
            </div>

            <div>
              <Comment></Comment>
              <Comment></Comment>
            </div>
          </article>
        </section>
        <div></div>
      </section>
    </div>
  );
}
