import { prisma } from "../Prisma/prismaClient";
import { Query } from "./query";
import { Mutation } from "./mutation";
import { SearchByID } from "src/utils/types";
import { Resolvers } from "../graphql";

export const resolvers: Resolvers = {
  Ride: {
    id: (parent) => parent.id,
    name: (parent) => parent.name,
    start_date: (parent) => parent.start_date,
    start_date_registration: (parent) => parent.start_date_registration,
    end_date_registration: (parent) => parent.end_date_registration,
    additional_information: (parent) => parent.additional_information,
    start_place: (parent) => parent.start_place,
    participants_limit: (parent) => parent.participants_limit,
    creator_id: (parent) => parent.creator_id,
    creator: (parent) => {
      return prisma.user.findFirst({
        where: { id: parent.creator_id },
      });
    },
    participants: (parent) =>{
      return prisma.usersOnRide.findMany({
        where: { ride_id: parent.id }
      })
    }
  },

  User: {
    id: (parent) => parent.id,
    username: (parent) => parent.username,
    email: (parent) => parent.email,
    password: (parent) => parent.password,   
    created_ride: async(parent) => {
      return await prisma.ride.findMany({
        where: { creator_id: parent.id },
      });
    },
    ride: async(parent, args) =>{
      return await prisma.usersOnRide.findMany({
        where: { user_id: parent.id}
      })
    }
  },

  UsersOnRide:{
    user_id: (parent) => parent.user_id,
    user: (parent) =>{
      return prisma.user.findFirst({
        where: {id: parent.user_id}
      })
    },
    ride_id: (parent) => parent.ride_id,
    ride: async(parent) =>{
      return await prisma.ride.findFirst({
        where: {id: parent.ride_id}
      })
    },
    subscription_date: (parent) => parent.subscription_date
  },

  Query,
  Mutation
}

