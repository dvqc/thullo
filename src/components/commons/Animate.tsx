import { ReactNode } from "react";
import { useDelayUnmount } from "~/hooks/utility";

export default function Animate({
  isMounted,
  animationIn,
  animationOut,
  delay,
  children,
  onAnimationEnd,
  className
}: {
  isMounted: boolean;
  animationIn: string;
  animationOut: string;
  delay: number;
  children: ReactNode;
  onAnimationEnd?: () => void;
  className?: string;
}) {
  const shouldRenderChild = useDelayUnmount(isMounted, delay);

  return (
    <>
      {shouldRenderChild && (
        <div
          tabIndex={-1}
          className={`${className} ${isMounted ? animationIn : animationOut}`}
          onAnimationEnd={onAnimationEnd}
        >
          {children}
        </div>
      )}
    </>
  );
}
