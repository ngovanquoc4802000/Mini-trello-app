
export interface GetAllRegisterTs {
    success: boolean,
    description: string,
    userAll: ResponseGetAll[]
}

export interface ResponseGetAll {
    id: string;
    name:string;
    email:string;
    password:string;
    createAt?:string;
}
export interface CreateRegisterTs {
  name: string;
  email: string;
  password: string;
}

export interface ResponseRegisterTs {
  id: string;
  email: string;
}


export interface CreateSignupTs {
    email:string;
    password:string;
}

export interface ResponseSignupTs {
    email:string;
    accessToken:string;
}