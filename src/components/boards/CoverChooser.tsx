import { ChangeEvent } from "react";
import { ImageSvg } from "../svg";

export default function CoverChooser({
  handleCover,
  className
}: {
  handleCover: (e: ChangeEvent<HTMLInputElement>) => void;
  className?: string;
}) {
  return (
    <label htmlFor="cover" className={`btn secondary relative ${className}`}>
      <span className="h-4">
        <ImageSvg></ImageSvg>
      </span>
      Cover
      <input type={"file"} id="cover" className="absolute -z-50 w-1  opacity-0" onChange={handleCover}></input>
    </label>
  );
}
