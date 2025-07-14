import type { TasksAll } from "../mockup/tasks";
import { Request } from "../utils/https";

export const getAllTasks = async( boardId: string,cardId : string) => {
  try{
     const response = await Request.get<TasksAll>(`/${boardId}/cards/${cardId}/tasks`);
     console.log(response.data.tasks);
     return response.data
  } catch(error) {
    console.log("Error get all Tasks", error);
    return { success: false, tasks: [] };
  }
}
