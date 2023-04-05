import Image from "next/image";

export default function UserImage({ url }: { url: string }) {
  return <Image width={28} height={28} className="h-7 w-7 rounded-lg object-cover" src={url} alt="A user profile" />;
}
