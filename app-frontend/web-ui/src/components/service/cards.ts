import type { Card, CardAll, CreateCards } from "../mockup/cards";
import { Request } from "../utils/https";


export const getAllCards = async(boardId: string) => {
    try {
     const response = await Request.get<CardAll>(`/${boardId}/cards`);
     return response.data;
    } catch(error) {
        console.log(`Error get all Cards ${error}`);
        throw error;
    }
}

export const createCards = async(payload: CreateCards) => {
  try {
  const response = await Request.post<Card>("",payload);
  return response.data;
  } catch(error) {
    console.log("Error create cards " + error);
  }
}
