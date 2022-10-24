import { prisma } from "../Prisma/prismaClient";
import crypto from 'crypto';
import { hash, compare } from "bcrypt";
import { formatterDateTime } from "../utils/formatter";
import { ensureAuthenticateUser } from "../utils/validations/decodedToken";
import { getToken } from "../utils/validations/newToken";
import { checkLimitParticipants } from "../utils/validations/checkLimitParticipants";
import { MutationResolvers, MutationLoginUserArgs, MutationRegisterUserArgs, 
    MutationRegisterRideArgs, MutationEnrollArgs
} from "src/graphql";


export const Mutation: MutationResolvers= {
    loginUser: async(parent, args: MutationLoginUserArgs) =>{
        const input = {...args.data};
        try{
            const user = await prisma.user.findFirst({
                where: { email: input.email}
            })
            if(!user?.username) throw new Error('User not exist!');
            const passwordMatch = await compare(input.password, user.password);
            if(!passwordMatch) throw new Error('Password invalid!')           
            const auth = getToken(user);                      
            return auth
        }catch(err){
            if(err instanceof Error) throw new Error(err.message)
        }
    },

    registerUser: async(parent, args: MutationRegisterUserArgs, ) =>{
        const input = args.data      
        const id = crypto.randomUUID(); 
        const hashPassword = await hash(input.password, 10)
        try{
            const newUser = await prisma.user.create({
                data: {
                    id: id,
                    username: input.username,
                    email: input.email,
                    password: hashPassword
                }
            })
            const auth = getToken(newUser);
            return auth
        }catch(err){
            if(err instanceof Error) throw new Error(err.message)
        }       
    },

    registerRide: (parent, args: MutationRegisterRideArgs, { req }) =>{
        ensureAuthenticateUser(req)
        const input = args.data;
        const id = input.id || crypto.randomUUID(); 
        const startDate = formatterDateTime(input.start_date);
        const startDateRegistration = formatterDateTime(input.start_date_registration);
        const endDateRegistration = formatterDateTime(input.end_date_registration);      
        try{
            return prisma.ride.create({
                data: {
                    id: id,
                    name: input.name,
                    start_date: startDate,
                    start_date_registration: startDateRegistration,
                    end_date_registration: endDateRegistration,
                    additional_information: input.additional_information,
                    start_place: input.start_place,
                    participants_limit: input.participants_limit,
                    creator_id: input.creator_id
                }
            })
        }catch(err){
            if(err instanceof Error) throw new Error(err.message)
        }      
    },

    enroll: async (parent, args: MutationEnrollArgs, { req }) =>{
        ensureAuthenticateUser(req)
        const input = args.data;
        const subscriptionDate = formatterDateTime(input.subscription_date)
        const rideSelected = await prisma.ride.findFirst({where: { id: input.ride_id}})  
        const propsCheckLimitParticipants = {id: input.ride_id, limit: rideSelected.participants_limit}
        if(rideSelected.participants_limit) await checkLimitParticipants(propsCheckLimitParticipants)    
        const dateLimit = rideSelected.end_date_registration
        if( dateLimit > subscriptionDate){
            try{
                return prisma.usersOnRide.create({
                    data: {
                        user_id: input.user_id,
                        ride_id: input.ride_id,
                        subscription_date: subscriptionDate
                    }         
                })
            }catch(err){
                if(err instanceof Error) throw new Error(err.message)
            }         
        }else{ 
            throw new Error('Date limit to enroll expired')
        }       
    }
}