import Button from "./Button";

export default function InputGroup() {
  return (
    <div className="relative z-0 flex w-full items-center">
      <Button className="absolute top-0 right-0 z-10">Search</Button>
      <input type="text" className="input border-transparent  " placeholder="Keyword..." required />
    </div>
  );
}
