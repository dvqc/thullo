import { list } from "~/types";
import ListCard from "./ListCard";

export default function List({ list }: { list: list }) {
  return (
    <ul>
      {list.items.map((item) => (
        <ListCard item={item} key={item.id}></ListCard>
      ))}
    </ul>
  );
}
