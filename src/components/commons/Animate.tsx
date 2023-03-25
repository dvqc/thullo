import React, { useState, useEffect, ReactNode } from "react";
import { useDelayUnmount } from "~/hooks/utility";

export default function Animate({
  isMounted,
  animationIn,
  animationOut,
  delay,
  children
}: {
  isMounted: boolean;
  animationIn: string;
  animationOut: string;
  delay: number;
  children: ReactNode;
}) {
  const shouldRenderChild = useDelayUnmount(isMounted, delay);

  return <>{shouldRenderChild && <div className={`${isMounted ? animationIn : animationOut}`}>{children}</div>}</>;
}
