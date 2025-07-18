import type { ResponseCards, CardAll, CreateCards } from "../mockup/cards";
import { Request } from "../utils/https";


export const getAllCards = async(boardId: string) => {
    try {
     const response = await Request.get<CardAll>(`/${boardId}/cards`);
     return response.data;
    } catch(error) {
        console.log(`Error get all Cards ${error}`);
        throw Error (`Error get all ${error}`);
    }
}

export const createCards = async(boardId: string,payload: CreateCards) => {
  try {
  const response = await Request.post<CardAll>(`/${boardId}/cards`,payload);
  return response.data;
  } catch(error) {
    console.log("Error create cards " + error);
    throw Error(`Fails create ${error}`)
  }
}

export const updateCards = async(boardId:string, cardId:string,payload: CreateCards) => {
  try {
    const response = await Request.put<ResponseCards>(`/${boardId}/cards/${cardId}`,payload);
    return response;
  } catch(error) {
    console.log("Error Update cards" + error);
    throw Error (`Fails Update ${error}`)
  }
}