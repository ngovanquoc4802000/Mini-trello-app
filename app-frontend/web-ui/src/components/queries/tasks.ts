import { queryOptions } from "@tanstack/react-query";
import { getAllTasks, getTaskById } from "../service/tasks";

const queriesTasks = {
  list: (boardId: string, cardId: string) =>
    queryOptions({
      queryKey: ["tasks", boardId, cardId],
      queryFn: async () => {
        if (!boardId || !cardId) return { success: false, tasks: [] };
        const result = await getAllTasks(boardId, cardId);
        console.log("Query ở đây", result);
        return {
          success: result?.success ?? false,
          tasks: Array.isArray(result.tasks) ? result.tasks : [],
        };
      },
      enabled: !!boardId && !!cardId,
      staleTime: 1000 * 60 * 60,
    }),
  detail: (boardId: string, cardId: string, taskId: string) =>
    queryOptions({
      queryKey: ["details", boardId, cardId, taskId],
      queryFn: async () => {
        if (!boardId || !cardId || !taskId)
          return { success: false, task: null };

        const result = await getTaskById(boardId, cardId, taskId);
        return {
          success: result?.success ?? false,
          task: result?.task ?? null,
        };
      },
      enabled: !!boardId && !!cardId && !!taskId,
      staleTime: 1000 * 60 * 60,
    }),
};
export default queriesTasks;
