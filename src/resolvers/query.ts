import { ensureAuthenticateUser } from "../utils/validations/decodedToken";
import { prisma } from "../Prisma/prismaClient";
import { SearchByID } from "../utils/types";
import { QueryResolvers } from "src/graphql";


export const Query: QueryResolvers = {
  allUsers: async(parent, args, { req }) =>{
    await ensureAuthenticateUser(req)
    return prisma.user.findMany({}) 
  },

  allRides:  (parent, args, { req }) =>{
    ensureAuthenticateUser(req)
    return prisma.ride.findMany({})
  },

  userCreatedRides: (parent, args, { req }) =>{
    ensureAuthenticateUser(req)
    return prisma.ride.findMany({
      where: { creator_id: args.id}
    })
  },

  userEnrollRides: (parent, args, { req }) =>{
    ensureAuthenticateUser(req)
    return prisma.usersOnRide.findMany({
      where: { user_id: args.id},
    })
  }
}