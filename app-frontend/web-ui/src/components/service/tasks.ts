import type { CreateTasks, TaskByIdResponse, TasksAll } from "../mockup/tasks";
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

export const getTaskById = async(boardId: string,cardId : string,taskId: string) => {
 try {
    const response = await Request.get<TaskByIdResponse>(`/${boardId}/cards/${cardId}/tasks/${taskId}`);
    return response.data;
 } catch(error) {
  console.log("Error get Id task", error);
 }
}


export const createTasks = async( boardId: string,cardId: string ,payload: CreateTasks) => {
   try {
      const response = await Request.post<TasksAll>(`/${boardId}/cards/${cardId}/tasks`,payload)
      return response.data;   
    } catch(error) {
    console.log("Error create Tasks fail",error);
    return {
      success: false, tasks: []
    }
   }
}