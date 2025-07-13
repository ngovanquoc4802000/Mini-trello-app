import type { Board, BoardAll, CreateBoardTs } from "../mockup/boards";
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

export const createBoards = async(payload: CreateBoardTs) => {
  try {
    const response = await Request.post<Board>("",payload);
    return response.data;
  } catch(error) {
    console.log("Error create Boards " + error);
  }
}