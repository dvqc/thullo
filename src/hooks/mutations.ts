import { api } from "~/utils/api";

export const useMoveTaskMutation = () => {
  const utils = api.useContext();

  return api.tasks.moveTask.useMutation({
    onMutate: ({ taskId, destListId, indx }) => {
      const destList = JSON.parse(JSON.stringify(utils.lists.getById.getData(destListId))) as ReturnType<
        typeof utils.lists.getById.getData
      >;
      const movedTask = JSON.parse(JSON.stringify(utils.tasks.getPreviewById.getData(taskId))) as ReturnType<
        typeof utils.tasks.getPreviewById.getData
      >;

      if (movedTask && destList) {
        const srcList = JSON.parse(JSON.stringify(utils.lists.getById.getData(movedTask.listId))) as ReturnType<
          typeof utils.lists.getById.getData
        >;
        if (srcList) {
          // case 1: same list
          if (srcList.id === destListId) {
            // case 1.1: if moved down the list
            if (movedTask.indx < indx) {
              for (const task of srcList.tasks) {
                if (task.indx <= indx && task.indx > movedTask.indx) task.indx--;
                if (task.id === taskId) task.indx = indx;
              }
            }
            // case 1.2: if moved up the list
            else if (movedTask.indx > indx)
              for (const task of srcList.tasks) {
                if (task.indx >= indx && task.indx < movedTask.indx) task.indx++;
                if (task.id === taskId) task.indx = indx;
              }
          }
          // case 2: different list
          else {
            // reorder destination list
            for (const task of destList.tasks) {
              if (task.indx >= indx) task.indx++;
            }
            // reorder source list
            for (const task of srcList.tasks) {
              if (task.indx > movedTask.indx) task.indx--;
              if (task.id === taskId) {
                task.indx = indx;
                destList.tasks = [...destList.tasks, task];
              }
            }
            srcList.tasks = srcList.tasks.filter((task) => task.id !== taskId);
            destList.tasks.sort((taskA, taskB) => taskA.indx - taskB.indx);
            utils.lists.getById.setData(destListId, destList);
          }
          srcList.tasks.sort((taskA, taskB) => taskA.indx - taskB.indx);
          utils.lists.getById.setData(srcList.id, srcList);
          utils.tasks.getPreviewById.setData(taskId, movedTask);
        }
      }
    }
  });
};
