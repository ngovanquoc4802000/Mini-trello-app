import type { CreateRegisterTs, CreateSignupTs, GetAllRegisterTs, ResponseRegisterTs, ResponseSignupTs } from "../mockup/users";
import { Request } from "../utils/https";


export const getAllUser = async() => {
    try {
     const response = await Request.get<GetAllRegisterTs>(`auth/all`);
   console.log("success get all users" + response.data.userAll)
     return response.data;
    } catch(error) {
        console.log(`Error get all user ${error}`);
        throw Error (`Fails get all register ${error}`);
    }
}

export const registerUser = async(payload: CreateRegisterTs) => {
    try {
     const response = await Request.post<ResponseRegisterTs>(`auth/register`,payload);
     return response.data;
    } catch(error) {
        console.log(`Error create user ${error}`);
        throw Error (`Fails create user register ${error}`); 
    }
}

export const signupUser = async(payload: CreateSignupTs) => {
    try {
         const response = await Request.post<ResponseSignupTs>(`auth/signup`,payload);
         return response.data;
    } catch (error) {
        console.log(`Error signup user ${error}`);
        throw Error (`Fails signup user ${error}`)
    }
}