import { queryOptions } from "@tanstack/react-query";
import { getAllTasks } from "../service/tasks";

const queriesTasks = {
  list: (boardId: string, cardId: string) =>
    queryOptions({
      queryKey: ["tasks", boardId, cardId],
      queryFn: async () => {
         if (!boardId || !cardId) return [];
        const result = await getAllTasks(boardId, cardId);
        console.log("Query ở đây" + result);
         console.log("Tasks nhận được:", result.tasks);
        if (result?.success && Array.isArray(result.tasks)) {
        return result.tasks;
      }
        return [];
      },
      enabled: !!boardId && !!cardId,
      staleTime: 1000 * 60 * 60,
    }),
};

export default queriesTasks;
