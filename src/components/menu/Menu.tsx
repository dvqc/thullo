/* eslint-disable @typescript-eslint/no-unsafe-return */
import Image from "next/image";

import ProfilePic from "../../../public/profilepic.jpg";
import { Animate, Button, Collapsible, VisibilityCard } from "../commons";
import { AddSvg, LockSvg, MoreHorizSvg, PublicSvg } from "../svg";
import { Drawer } from "../drawer";
import { useState } from "react";
import { Invite } from "../boards";
import { Board } from "~/types";
import { api } from "~/utils/api";

const Menu = ({ board }: { board: Board }) => {
  const [isOpen, setIsOpen] = useState(false);

  const utils = api.useContext();

  const patchBoardMutation = api.boards.patch.useMutation({
    onSuccess: () => utils.boards.getById.invalidate(board.id)
  });

  const handleVisiblity = (isPrivate: boolean) => {
    patchBoardMutation.mutate({ id: board.id, data: { isPrivate } });
  };

  const handleDescription = (description: string) => {
    patchBoardMutation.mutate({ id: board.id, data: { description } });
  };

  return (
    <div className="flex w-full justify-between space-x-4 py-4">
      <div className="flex items-center gap-4">
        <Collapsible
          justify="left"
          toggler={
            <Button btnType="secondary" className="w-20" onClick={(e) => e.preventDefault()}>
              {!board.isPrivate ? (
                <>
                  <PublicSvg className="h-3 w-3" />
                  Public
                </>
              ) : (
                <>
                  <LockSvg className="h-3 w-3" />
                  Private
                </>
              )}
            </Button>
          }
          content={<VisibilityCard setIsPrivate={handleVisiblity} />}
        />

        <div className="flex space-x-3">
          {board.team.map((user, index) => (
            <Image
              className="h-8 w-8 rounded-lg"
              width={32}
              height={32}
              src={user.image ?? ProfilePic}
              alt={"User avatar"}
              key={index}
            />
          ))}
          <Collapsible
            toggler={
              <Button>
                <AddSvg className="h-4 w-4"></AddSvg>
              </Button>
            }
            content={<Invite></Invite>}
          />
        </div>
      </div>
      <Button btnType="secondary" className="w-32" onClick={() => setIsOpen(true)}>
        <MoreHorizSvg className="h-6 w-6" />
        Show Menu
      </Button>
      <Animate
        className="scroll-hidden fixed top-0 right-0 z-50 h-full w-80 overflow-y-scroll shadow-lg "
        isMounted={isOpen}
        animationIn=" animate-slide-in"
        animationOut=" animate-slide-out"
        delay={200}
      >
        <Drawer setIsOpen={setIsOpen} board={board} handleDescription={handleDescription} />
      </Animate>
      {/* <Collapsible
        toggler={
          <Button btnType="secondary">
            <MoreHorizSvg className="h-6 w-6" />
            Show Menu
          </Button>
        }
        content={<Drawer setIsDrawer={() => {}} />}
      /> */}
    </div>
  );
};

export default Menu;
