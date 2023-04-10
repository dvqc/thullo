export default function ColorButton({
  isSelected,
  color,
  onClick
}: {
  isSelected: boolean;
  color: `#${string}`;
  onClick: () => void;
}) {
  return (
    <button
      onClick={onClick}
      style={{ backgroundColor: color }}
      className={`h-7 w-12 rounded border-2 border-transparent   hover:opacity-80
  ${isSelected && "border-blue-700"}`}
    ></button>
  );
}
