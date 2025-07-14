import { Request } from "../utils/https";

export const getAllTasks = async() => {
  try{
     const response = await Request.get("")
     return response
  } catch(error) {
    console.log("Error get all Tasks" + error);
    throw Error;
  }
}
