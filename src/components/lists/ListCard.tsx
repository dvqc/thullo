import { useEffect, useRef, useState } from "react";
import { Button, Members } from "../commons";
import { AddSvg, CommentSvg, FileSvg } from "../svg";
import Badge from "./Badge";

export default function ListCard({ card }: { card: any }) {
  const [isDragging, setDragging] = useState(false);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [offset, setOffSet] = useState({ x: 0, y: 0 });
  const draggableRef = useRef<HTMLLIElement>(null);

  const handleDragStart = (e: React.MouseEvent) => {
    e.preventDefault();
    const rect = draggableRef.current?.getBoundingClientRect();
    if (rect) setOffSet({ x: rect.x, y: rect.y });
    setDragging(true);
  };
  const handleDrag = (e: MouseEvent) => {
    e.preventDefault();
    setPosition({ x: e.clientX - offset.x, y: e.clientY - offset.y });
  };
  const handleDragEnd = (e: MouseEvent) => {
    e.preventDefault();
    setDragging(false);
  };

  useEffect(() => {
    if (isDragging) {
      document.addEventListener("mousemove", handleDrag);
      document.addEventListener("mouseup", handleDragEnd);
    } else {
      document.removeEventListener("mousemove", handleDrag);
      document.removeEventListener("mouseup", handleDragEnd);
    }
    return () => {
      document.removeEventListener("mousemove", handleDrag);
      document.removeEventListener("mouseup", handleDragEnd);
    };
  }, [isDragging]);
  return (
    <li
      // draggable
      ref={draggableRef}
      style={{ left: `${position?.x}px`, top: `${position?.y}px` }}
      className={`w-60 cursor-grab rounded-xl bg-white p-3 shadow-lg  ${
        isDragging ? `absolute rotate-6 cursor-grabbing duration-100` : ""
      }`}
      // {...(isDragging && { onMouseMove: handleDrag })}
      onMouseDown={handleDragStart}
      // onMouseUp={handleDragEnd}
    >
      <img className="h-32 w-full rounded-xl object-cover" src={card.cover} alt="" />
      <h3 className="my-3 text-base font-normal text-black">{card.title}</h3>

      <div className="my-3 flex flex-wrap gap-3">
        {card.labels.map((label: any) => (
          <Badge key={label.id} label={label}></Badge>
        ))}
      </div>
      <div className="mt-5 flex flex-wrap items-center justify-between gap-3">
        <div className="flex items-center gap-2">
          <Members members={card.members}></Members>
          <Button className="h-7 w-7">
            <AddSvg className="h-4 w-4"></AddSvg>
          </Button>
        </div>
        <div className="flex items-center gap-3">
          {card.commentsNumber > 0 && (
            <p className="flex h-4 items-center fill-gray-400 text-xs text-gray-400">
              <CommentSvg></CommentSvg> {card.commentsNumber}
            </p>
          )}
          {card.attachmentsNumber > 0 && (
            <p className="flex h-4 items-center fill-gray-400 text-xs text-gray-400">
              <FileSvg></FileSvg>
              {card.attachmentsNumber}
            </p>
          )}
        </div>
      </div>
    </li>
  );
}
