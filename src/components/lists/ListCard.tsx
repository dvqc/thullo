import dynamic from "next/dynamic";
import { useEffect, useRef, useState } from "react";
import { Draggable } from "react-beautiful-dnd";
import { Button, Members } from "../commons";
import { AddSvg, CommentSvg, FileSvg } from "../svg";
import Badge from "./Badge";

function ListCard({ card, index }: { card: any; index: number }) {
  console.log(index, card.id);
  return (
    <Draggable key={card.id} draggableId={String(card.id)} index={index}>
      {(provided, snapshot) => (
        <li
          className={`unselectable w-60 rounded-xl bg-white p-3 shadow-lg ${
            snapshot.isDragging ? "rotate-6  duration-200" : ""
          }`}
          style={{
            ...provided.draggableProps.style,
            transform: snapshot.isDragging ? "rotate(20deg)" : "",
            fontSize: 18
          }}
          ref={provided.innerRef}
          {...provided.draggableProps}
          {...provided.dragHandleProps}
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
      )}
    </Draggable>
  );
}
export default dynamic(() => Promise.resolve(ListCard), {
  ssr: false
});
