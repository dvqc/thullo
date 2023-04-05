import { ReactNode } from "react";
import Button from "./Button";

export default function InputGroup({
  children,
  placeholder,
  value,
  setValue,
  onBtnClick
}: {
  children: ReactNode;
  placeholder: string;
  value: string;
  setValue: (newValue: string) => void;
  onBtnClick: () => void;
}) {
  return (
    <div className="relative z-0 flex w-full items-center">
      <Button className="absolute top-0 right-0 z-10" onClick={onBtnClick}>{children}</Button>
      <input
        type="text"
        className="input border-transparent"
        placeholder={placeholder}
        value={value}
        onChange={(e) => setValue(e.target.value)}
        required
      />
    </div>
  );
}
