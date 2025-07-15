import type { UpdateBoardTs, Board, BoardAll, CreateBoardTs } from "../mockup/boards";
import { Request } from "../utils/https";

export const getAllBoards = async () => {
  try {
    const response = await Request.get<BoardAll>("");
    return response.data;
  } catch (error) {
    console.log("Error get all Boards");
    throw error;
  }
};

export const updateBoards = async(boardId: string,payload: CreateBoardTs) => {
    try {
        const response = await Request.put<UpdateBoardTs>(`/${boardId}`,payload);
        return response.data;
    } catch(error) {
      console.log("Error update Board Id ", error);
      throw Error;
    }
} 

export const createBoards = async(payload: CreateBoardTs) => {
  try {
    const response = await Request.post<Board>("",payload);
    return response.data;
  } catch(error) {
    console.log("Error create Boards " + error);
  }
}