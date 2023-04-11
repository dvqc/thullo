import { Button, Collapsible, DescriptionEditable, UserImage } from "../commons";
import { AccountSvg, FileSvg, AddSvg, GroupSvg, LabelSvg } from "../svg";
import Image from "next/image";
import Attachment from "./Attachment";
import WriteComment from "./WriteComment";
import Comment from "./Comment";
import LabelPicker from "./LabelPicker";
import CoverChooser from "../boards/CoverChooser";
import { Invite } from "../boards";

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
                <Attachment key={attachment.id} attachment={attachment}></Attachment>
              ))}
            </div>

            <div className="my-6">
              <WriteComment></WriteComment>
            </div>

            <div>
              {card.comments.map((comment: any) => (
                <Comment key={comment.id} comment={comment}></Comment>
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
                <Button btnType="secondary" className="w-full justify-start gap-4">
                  <LabelSvg className="h-4 w-4"></LabelSvg>
                  <p className="font-poppins text-xs font-medium">Labels</p>
                </Button>
              }
            />
            <CoverChooser handleCover={(e) => {}} className="w-full justify-start gap-4"></CoverChooser>

            <article>
              <div className="my-4 flex items-center space-x-2 fill-gray-400 text-gray-400">
                <GroupSvg className="h-4 w-4" />
                <p className="font-poppins text-2xs font-semibold ">Members</p>
              </div>
              <div className="my-4 space-y-3">
                {card.members.map((member: any) => (
                  <div key={member.id} className="flex items-center space-x-4">
                    <UserImage url={member.img} />
                    <p className="font-poppins text-xs font-semibold text-neutral-800">{member.username}</p>
                  </div>
                ))}
              </div>
              <Collapsible
                toggler={
                  <Button btnType="primary-light" className={`w-full justify-between`}>
                    Assign a member <AddSvg className="h-4 w-4"></AddSvg>
                  </Button>
                }
                content={<Invite></Invite>}
              />
            </article>
          </div>
        </section>
      </section>
    </div>
  );
}
