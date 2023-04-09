import Image from "next/image";
import { Button } from "../commons";

export default function Attachment() {
  return (
    <article className="flex items-center space-x-2">
      <Image width={80} height={53} className="h-14 w-20 rounded-lg" src={"/ceo.jpeg"} alt="Attachment"></Image>
      <div>
        <p className="font-poppins text-2xs text-gray-400">Added July 5, 2020</p>
        <h6 className="font-poppins text-xs text-black">Reasoning by Ranganath Krishnamani</h6>
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
