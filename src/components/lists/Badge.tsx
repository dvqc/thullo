export default function Badge({ label }: { label: any }) {
  return (
    <p
      className={`flex items-center rounded-lg px-2 py-[2px] text-center text-xs font-medium`}
      style={{ color: "#" + label.color, background: "#" + label.color + "40" }}
    >
      {label.name}
    </p>
  );
}
