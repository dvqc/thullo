import { Button, Collapsible, DescriptionEditable, UserImage } from "../commons";
import { AccountSvg, FileSvg, AddSvg, GroupSvg, LabelSvg } from "../svg";
import Image from "next/image";
import WriteComment from "./WriteComment";
import LabelPicker from "./LabelPicker";
import CoverChooser from "../boards/CoverChooser";
import { Invite } from "../boards";
import { api } from "~/utils/api";
import CommentsSection from "./CommentsSection";
import Loader from "./Loader";

export default function TaskView({ taskId }: { taskId: string }) {
  const { data: task } = api.tasks.getById.useQuery(taskId);
  const updateTaskMutation = api.tasks.patch.useMutation();
  const utils = api.useContext();

  if (!task) return <Loader></Loader>;

  const handleDescription = (description: string) => {
    updateTaskMutation.mutate(
      { id: taskId, data: { description } },
      {
        onSuccess: () => {
          utils.tasks.getById.invalidate(taskId);
        }
      }
    );
  };

  return (
    <div className="w-screen max-w-2xl ">
      <Image
        width={616}
        height={130}
        className="h-36 w-full rounded-xl object-cover"
        src={task.cover ?? "/ceo.jpeg"}
        alt={"Card cover"}
      ></Image>

      <section className="mt-6 flex justify-between">
        <section className="max-w-md">
          <div className="my-6">
            <h2>{task.title}</h2>
            <p className="font-poppins text-2xs font-semibold text-gray-400">
              In list <span className="text-neutral-800">{task.list.title}</span>
            </p>
          </div>
          <div className="my-6">
            <DescriptionEditable description={task.description} onSave={handleDescription}></DescriptionEditable>
          </div>
          <article className="my-6">
            <div className="flex items-center space-x-2 fill-gray-400 text-gray-400">
              <FileSvg className="h-4 w-4" />
              <p className="font-poppins text-2xs font-semibold ">Attachments</p>
            </div>

            {/* <div className="space-y-2 py-2">
              {task.attachments.map((attachment: any) => (
                <Attachment key={attachment.id} attachment={attachment}></Attachment>
              ))}
            </div> */}

            <div className="my-6">
              <WriteComment taskId={taskId}></WriteComment>
            </div>

            <CommentsSection taskId={taskId}></CommentsSection>
          </article>
        </section>
        <section className="w-36">
          <div className="my-6 flex items-center space-x-2 fill-gray-400 text-gray-400">
            <AccountSvg className="h-4 w-4" />
            <p className="font-poppins text-2xs font-semibold ">Actions</p>
          </div>

          <div className="my-4 space-y-3">
            <Collapsible
              content={<LabelPicker taskId={taskId}></LabelPicker>}
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
                {task.members.map((member) => (
                  <div key={member.id} className="flex items-center space-x-4">
                    <UserImage url={member.image ?? "/profilepic.jpg"} />
                    <p className="font-poppins text-xs font-semibold text-neutral-800">{member.name}</p>
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
