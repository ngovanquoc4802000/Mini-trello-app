import type { BoardAll } from "../mockup/boards";
import { Request } from "../utils/https";

export const getAllBoards = async () => {
  try {
    const response = await Request.get<BoardAll>("");
    return response.data;
  } catch (error) {
    console.log(error);
    console.error("Axios error");
    console.error("status", error);
    throw error;
  }
};
