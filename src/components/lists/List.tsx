import { Button } from "../commons";
import { AddSvg } from "../svg";
import ListCard from "./ListCard";

export default function List({ list }: { list: any }) {
  return (
    <article className="max-w-fit">
      <div className="my-4 flex items-center justify-between">
        <h2 className="text-sm font-medium text-black"> {list.name}</h2>
        <p>...</p>
      </div>
      <ul className="flex flex-col gap-6">
        {list.cards.map((card: any) => (
          <ListCard card={card} key={card.id}></ListCard>
        ))}
      </ul>
      <Button btnType="primary-light" className="mt-6 w-full justify-between">
        Add another card <AddSvg className="h-4 w-4"></AddSvg>
      </Button>
    </article>
  );
}
