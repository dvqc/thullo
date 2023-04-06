import { Button, DescriptionEditable } from "../commons";
import { CloseSvg } from "../svg";
import Image from "next/image";

export default function CardView({ card }: { card: any }) {
  return (
    <dialog
      className="absolute  top-1/2 left-1/2 max-w-2xl -translate-x-1/2 -translate-y-1/2 rounded-lg 
    bg-white px-6 py-5 shadow-lg"
    >
      <Image
        width={616}
        height={130}
        className="w-full rounded-xl object-cover"
        src={card.image}
        alt={"Card cover"}
      ></Image>

      <section className="mt-6 flex flex-col">
        <section className="max-w-md">
          <div className="my-6">
            <h2>{card.title}</h2>
            <p>
              In list <span>In Progress</span>
            </p>
          </div>
          <article className="my-6">
            <DescriptionEditable initialDescription={card.description}></DescriptionEditable>
          </article>
        </section>
        <div></div>
      </section>
      <Button className="absolute top-3 right-3 h-8 w-8">
        <CloseSvg className="h-5 w-5 fill-white"></CloseSvg>
      </Button>
    </dialog>
  );
}
