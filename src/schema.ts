import { gql } from "apollo-server";

export const typeDefs = gql`
    type Ride {
        id: ID!
        name: String!
        start_date: String!
        start_date_registration: String!
        end_date_registration: String!
        additional_information: String
        start_place: String!
        participants_limit: Int
        creator_id: ID!
        creator: User
        participants: [UsersOnRide]
    }

    type User {
        id: ID!
        username: String!
        email: String!
        password: String!
        created_ride: [Ride]
        ride: [UsersOnRide]
    }

    type UsersOnRide{
        user_id: ID!
        ride_id: ID!
        user: User
        ride: Ride
        subscription_date: String!
    }

    type AuthPayLoad {
        username: String!
        token: String!
    }

    type Query {
        allUsers: [User!]
        allRides: [Ride!]
        userCreatedRides(id: ID!): [Ride]
        userEnrollRides(id: ID!): [UsersOnRide]
    }   
    
    type Mutation {
        loginUser(data: LoginUserInput) : AuthPayLoad!
        registerUser(data: RegisterUserInput): AuthPayLoad!
        registerRide(data: RegisterRideInput): Ride!
        enroll(data: EnrollInput): UsersOnRide!
    }

    input LoginUserInput{
        email: String!
        password: String!
    }

    input RegisterUserInput{
        username: String!
        email: String!
        password: String!
    }

    input RegisterRideInput{
        name: String! 
        start_date: String! 
        start_date_registration: String!
        end_date_registration: String!
        additional_information: String
        start_place: String!
        participants_limit: Int
        creator_id: String!
    }

    input EnrollInput{
        user_id: String!
        ride_id: String!
        subscription_date: String! 
    }
`;
