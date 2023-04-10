import { Button, Collapsible, DescriptionEditable } from "../commons";
import { AccountSvg, FileSvg, ImageSvg } from "../svg";
import Image from "next/image";
import Attachment from "./Attachment";
import WriteComment from "./WriteComment";
import Comment from "./Comment";
import LabelPicker from "./LabelPicker";

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

      <section className="mt-6 flex justify-between">
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
              {card.attachments.map((attachment: any) => (
                <Attachment attachment={attachment}></Attachment>
              ))}
            </div>

            <div className="my-6">
              <WriteComment></WriteComment>
            </div>

            <div>
              {card.comments.map((comment: any) => (
                <Comment comment={comment}></Comment>
              ))}
            </div>
          </article>
        </section>
        <section className="w-36">
          <div className="my-6 flex items-center space-x-2 fill-gray-400 text-gray-400">
            <AccountSvg className="h-4 w-4" />
            <p className="font-poppins text-2xs font-semibold ">Actions</p>
          </div>
          <div className="my-4 space-y-3">
            <Collapsible
              content={<LabelPicker></LabelPicker>}
              toggler={
                <Button btnType="secondary" className="w-full justify-start gap-4 ">
                  <AccountSvg className="h-4 w-4"></AccountSvg>{" "}
                  <p className="font-poppins text-xs font-medium">Members</p>
                </Button>
              }
            />
            <Collapsible
              content={<LabelPicker></LabelPicker>}
              toggler={
                <Button btnType="secondary" className="w-full justify-start gap-4 ">
                  <AccountSvg className="h-4 w-4"></AccountSvg>{" "}
                  <p className="font-poppins text-xs font-medium">Labels</p>
                </Button>
              }
            />
            <Collapsible
              content={<LabelPicker></LabelPicker>}
              toggler={
                <Button btnType="secondary" className="w-full justify-start gap-4 ">
                  <ImageSvg className="h-4 w-4"></ImageSvg> <p className="font-poppins text-xs font-medium">Cover</p>
                </Button>
              }
            />
          </div>
        </section>
      </section>
    </div>
  );
}
