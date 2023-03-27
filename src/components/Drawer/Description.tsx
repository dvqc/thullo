import { FileSvg, PenSvg } from "../svg";

const description =
  "Simple board to start on a project. Each list can hold items (cards) that represent ideas or tasks. There 4 lists here: * Backlog 🤔 : Ideas are created here. Here people can describe the idea following three simple questions: Why you wish to do it, What it is, how can you do it. * In Progress📚: Once the ideas is clearly defined, the task can move to #todo stage. Here the owner of the idea can move to #doing once s/he is ready. He can also wait a bit for other members to join. * In Review ⚙️: On-going * Completed 🙌🏽**: Finished You could add other lists like labels holding labels (with colors) in order to tag each card by a label if you wish.";

export default function Description({}) {
  return (
    <div className="description">
      <div className="flex flex-col space-y-2">
        <div className="flex items-center space-x-2 text-gray-500">
          <FileSvg className="h-4 w-4" />
          <p className="text-xs font-bold">description</p>
          <button className="btn w-16 rounded-lg border border-2 border-gray-300 bg-white">
            <PenSvg className="h-4 w-4" />
            <p>Edit</p>
          </button>
        </div>
        <pre>{description}</pre>
      </div>
    </div>
  );
}
