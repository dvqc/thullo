import { FocusEvent, ReactNode, useRef, useState } from "react";
import Animate from "./Animate";

export default function Collapsible({ toggler, content }: { toggler: ReactNode; content: ReactNode }) {
  const [collapsed, setCollapsed] = useState(true);
  const collapsibleRef = useRef<HTMLDivElement>(null);

  const handleToggle = () => {
    setCollapsed(!collapsed);
  };

  const handleBlur = (e: FocusEvent) => {
    if (!e.relatedTarget || (collapsibleRef.current && !collapsibleRef.current.contains(e.relatedTarget)))
      setCollapsed(true);
  };
  return (
    <div className="relative" ref={collapsibleRef} onBlur={handleBlur}>
      <div tabIndex={-1} onClick={handleToggle}>
        {toggler}
      </div>
      <Animate isMounted={!collapsed} animationIn="animate-fade-in" animationOut="animate-fade-out" delay={400}>
        <div tabIndex={-1} className="absolute translate-y-2 ">
          {content}
        </div>
      </Animate>
    </div>
  );
}
