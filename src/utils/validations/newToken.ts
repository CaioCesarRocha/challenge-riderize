import { sign } from "jsonwebtoken";

interface IUser{
    id?: string,
    username: string,
}

export const getToken = (user: IUser) => {
    const username = user.username
    const token = sign({username}, process.env.md5Hash,{ 
        subject: user.id,
        expiresIn: "1d",
    }) 
    const userAuth = {
        username: user.username,
        token: token
    }
    return userAuth;
}