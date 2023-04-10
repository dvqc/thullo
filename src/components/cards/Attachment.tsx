import Image from "next/image";
import { Button } from "../commons";

export default function Attachment({ attachment }: { attachment: any }) {
  const dateFormatter = Intl.DateTimeFormat("en", { month: "long", day: "numeric", year: "numeric" });
  return (
    <article className="flex items-center space-x-2">
      <Image width={80} height={53} className="h-14 w-20 rounded-lg" src={attachment.url} alt="Attachment"></Image>
      <div>
        <p className="font-poppins text-2xs text-gray-400">
          Added {dateFormatter.format(new Date(attachment.createdOn))}
        </p>
        <h6 className="font-poppins text-xs text-black">{attachment.name}</h6>
        <div className="my-2 flex space-x-2">
          <Button btnType="secondary-outlined" className="h-7 py-0">
            Download
          </Button>
          <Button btnType="danger-outlined" className="h-7 py-0">
            Delete
          </Button>
        </div>
      </div>
    </article>
  );
}
