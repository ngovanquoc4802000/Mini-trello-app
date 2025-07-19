import { Request } from "../utils/https";


export const createInvite = async(boardId:string) => {
    try {
    const response = await Request.post(`${boardId}/invite`);
      return response.data;
    } catch(error) {
        console.log("error create invite ");
        throw Error (`Fails to create invite ${error}`)
    }
}