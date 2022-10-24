import { verify } from "jsonwebtoken";

interface IPayLoad{
    sub: string;
}

export function ensureAuthenticateUser(request) {
    const authHeader = request.req.headers.authorization;
   
    if(!authHeader) throw new Error('Login in to access resource');

    const [ ,token] = authHeader.split(" ")
   
    try{
        const decoded = verify(token, process.env.md5Hash) as IPayLoad;
        return decoded
    }catch(error){
        throw new Error("Invalid Token!!");
    }
}