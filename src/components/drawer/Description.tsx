import { DescriptionEditable } from "../commons";

export default function Description({
  description,
  handleDescription
}: {
  description: string;
  handleDescription: (description: string) => void;
}) {
  return (
    <div className="mt-2 mb-6">
      <DescriptionEditable description={description} onSave={handleDescription}></DescriptionEditable>
    </div>
  );
}
