import { ReactNode } from "react";
import { useDelayUnmount } from "~/hooks/utility";

export default function Animate({
  isMounted,
  animationIn,
  animationOut,
  delay,
  children,
  className,
}: {
  isMounted: boolean;
  animationIn: string;
  animationOut: string;
  delay: number;
  children: ReactNode;
  className?: string;
}) {
  const shouldRenderChild = useDelayUnmount(isMounted, delay);

  return <>{shouldRenderChild && <div className={`${className} ${isMounted ? animationIn : animationOut}`}>{children}</div>}</>;
}
