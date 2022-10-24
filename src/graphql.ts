import { Request } from 'express';
import { GraphQLResolveInfo } from 'graphql';
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
export type RequireFields<T, K extends keyof T> = Omit<T, K> & { [P in K]-?: NonNullable<T[P]> };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
  Date: Date;
};

export type AuthPayLoad = {
  __typename?: 'AuthPayLoad';
  token: Scalars['String'];
  username: Scalars['String'];
};

export type EnrollInput = {
  ride_id: Scalars['String'];
  subscription_date: Scalars['String'];
  user_id: Scalars['String'];
};

export type LoginUserInput = {
  email: Scalars['String'];
  password: Scalars['String'];
};

export type Mutation = {
  __typename?: 'Mutation';
  enroll: UsersOnRide;
  loginUser: AuthPayLoad;
  registerRide: Ride;
  registerUser: AuthPayLoad;
};


export type MutationEnrollArgs = {
  data?: InputMaybe<EnrollInput>;
  req?: Request
};


export type MutationLoginUserArgs = {
  data?: InputMaybe<LoginUserInput>;
};


export type MutationRegisterRideArgs = {
  data?: InputMaybe<RegisterRideInput>;
  req?: Request
};


export type MutationRegisterUserArgs = {
  data?: InputMaybe<RegisterUserInput>;
  req?: Request
};

export type Query = {
  __typename?: 'Query';
  allRides?: Maybe<Array<Ride>>;
  allUsers?: Maybe<Array<User>>;
  userCreatedRides?: Maybe<Array<Maybe<Ride>>>;
  userEnrollRides?: Maybe<Array<Maybe<UsersOnRide>>>;
};


export type QueryUserCreatedRidesArgs = {
  id: Scalars['ID'];
};


export type QueryUserEnrollRidesArgs = {
  id: Scalars['ID'];
};

export type RegisterRideInput = {
  id?: Scalars['String'];
  additional_information?: InputMaybe<Scalars['String']>;
  creator_id: Scalars['String'];
  end_date_registration: Scalars['String'] ;
  name: Scalars['String'];
  participants_limit?: InputMaybe<Scalars['Int']>;
  start_date: Scalars['String'] ;
  start_date_registration: Scalars['String'] ;
  start_place: Scalars['String'];
};

export type RegisterUserInput = {
  email: Scalars['String'];
  password: Scalars['String'];
  username: Scalars['String'];
};

export type Ride = {
  __typename?: 'Ride';
  additional_information?: Maybe<Scalars['String']>;
  creator?: User;
  creator_id: Scalars['ID'];
  end_date_registration: Scalars['Date'];
  id: Scalars['ID'];
  name: Scalars['String'];
  participants_limit?: Maybe<Scalars['Int']>;
  start_date: Scalars['Date'];
  start_date_registration: Scalars['Date'];
  start_place: Scalars['String'];
  participants?: Maybe<Array<UsersOnRide>>;
};

export type User = {
  __typename?: 'User';
  created_ride?: Maybe<Array<Ride>>;
  email: Scalars['String'];
  id: Scalars['ID'];
  password: Scalars['String'];
  ride?: Maybe<Array<UsersOnRide>>;
  username: Scalars['String'];
};

export type UsersOnRide = {
  __typename?: 'UsersOnRide';
  ride?: Ride;
  ride_id: Scalars['ID'];
  subscription_date: Scalars['Date'];
  user?: User;
  user_id: Scalars['ID'];
};



export type ResolverTypeWrapper<T> = Promise<T> | T;


export type ResolverWithResolve<TResult, TParent, TContext, TArgs> = {
  resolve: ResolverFn<TResult, TParent, TContext, TArgs>;
};
export type Resolver<TResult, TParent = {}, TContext = {}, TArgs = {}> = ResolverFn<TResult, TParent, TContext, TArgs> | ResolverWithResolve<TResult, TParent, TContext, TArgs>;

export type ResolverFn<TResult, TParent, TContext, TArgs> = (
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => Promise<TResult> | TResult;

export type SubscriptionSubscribeFn<TResult, TParent, TContext, TArgs> = (
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => AsyncIterable<TResult> | Promise<AsyncIterable<TResult>>;

export type SubscriptionResolveFn<TResult, TParent, TContext, TArgs> = (
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => TResult | Promise<TResult>;

export interface SubscriptionSubscriberObject<TResult, TKey extends string, TParent, TContext, TArgs> {
  subscribe: SubscriptionSubscribeFn<{ [key in TKey]: TResult }, TParent, TContext, TArgs>;
  resolve?: SubscriptionResolveFn<TResult, { [key in TKey]: TResult }, TContext, TArgs>;
}

export interface SubscriptionResolverObject<TResult, TParent, TContext, TArgs> {
  subscribe: SubscriptionSubscribeFn<any, TParent, TContext, TArgs>;
  resolve: SubscriptionResolveFn<TResult, any, TContext, TArgs>;
}

export type SubscriptionObject<TResult, TKey extends string, TParent, TContext, TArgs> =
  | SubscriptionSubscriberObject<TResult, TKey, TParent, TContext, TArgs>
  | SubscriptionResolverObject<TResult, TParent, TContext, TArgs>;

export type SubscriptionResolver<TResult, TKey extends string, TParent = {}, TContext = {}, TArgs = {}> =
  | ((...args: any[]) => SubscriptionObject<TResult, TKey, TParent, TContext, TArgs>)
  | SubscriptionObject<TResult, TKey, TParent, TContext, TArgs>;

export type TypeResolveFn<TTypes, TParent = {}, TContext = {}> = (
  parent: TParent,
  context: TContext,
  info: GraphQLResolveInfo
) => Maybe<TTypes> | Promise<Maybe<TTypes>>;

export type IsTypeOfResolverFn<T = {}, TContext = {}> = (obj: T, context: TContext, info: GraphQLResolveInfo) => boolean | Promise<boolean>;

export type NextResolverFn<T> = () => Promise<T>;

export type DirectiveResolverFn<TResult = {}, TParent = {}, TContext = {}, TArgs = {}> = (
  next: NextResolverFn<TResult>,
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => TResult | Promise<TResult>;

/** Mapping between all available schema types and the resolvers types */
export type ResolversTypes = {
  AuthPayLoad: ResolverTypeWrapper<AuthPayLoad>;
  Boolean: ResolverTypeWrapper<Scalars['Boolean']>;
  Date: Scalars['Date'];
  EnrollInput: EnrollInput;
  ID: ResolverTypeWrapper<Scalars['ID']>;
  Int: ResolverTypeWrapper<Scalars['Int']>;
  LoginUserInput: LoginUserInput;
  Mutation: ResolverTypeWrapper<{}>;
  Query: ResolverTypeWrapper<{}>;
  RegisterRideInput: RegisterRideInput;
  RegisterUserInput: RegisterUserInput;
  Ride: ResolverTypeWrapper<Ride>;
  String: ResolverTypeWrapper<Scalars['String']>;
  User: ResolverTypeWrapper<User>;
  UsersOnRide: ResolverTypeWrapper<UsersOnRide>;
};

/** Mapping between all available schema types and the resolvers parents */
export type ResolversParentTypes = {
  AuthPayLoad: AuthPayLoad;
  Boolean: Scalars['Boolean'];
  Date: Scalars['Date'];
  EnrollInput: EnrollInput;
  ID: Scalars['ID'];
  Int: Scalars['Int'];
  LoginUserInput: LoginUserInput;
  Mutation: {};
  Query: {};
  RegisterRideInput: RegisterRideInput;
  RegisterUserInput: RegisterUserInput;
  Ride: Ride;
  String: Scalars['String'];
  User: User;
  UsersOnRide: UsersOnRide;
};

export type AuthPayLoadResolvers<ContextType = any, ParentType extends ResolversParentTypes['AuthPayLoad'] = ResolversParentTypes['AuthPayLoad']> = {
  token?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  username?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type MutationResolvers<ContextType = any, ParentType extends ResolversParentTypes['Mutation'] = ResolversParentTypes['Mutation']> = {
  enroll?: Resolver<ResolversTypes['UsersOnRide'], ParentType, ContextType, Partial<MutationEnrollArgs>>;
  loginUser?: Resolver<ResolversTypes['AuthPayLoad'], ParentType, ContextType, Partial<MutationLoginUserArgs>>;
  registerRide?: Resolver<ResolversTypes['Ride'], ParentType, ContextType, Partial<MutationRegisterRideArgs>>;
  registerUser?: Resolver<ResolversTypes['AuthPayLoad'], ParentType, ContextType, Partial<MutationRegisterUserArgs>>;
};

export type QueryResolvers<ContextType = any, ParentType extends ResolversParentTypes['Query'] = ResolversParentTypes['Query']> = {
  allRides?: Resolver<Maybe<Array<ResolversTypes['Ride']>>, ParentType, ContextType>;
  allUsers?: Resolver<Maybe<Array<ResolversTypes['User']>>, ParentType, ContextType>;
  userCreatedRides?: Resolver<Maybe<Array<Maybe<ResolversTypes['Ride']>>>, ParentType, ContextType, RequireFields<QueryUserCreatedRidesArgs, 'id'>>;
  userEnrollRides?: Resolver<Maybe<Array<Maybe<ResolversTypes['UsersOnRide']>>>, ParentType, ContextType, RequireFields<QueryUserEnrollRidesArgs, 'id'>>;
};

export type RideResolvers<ContextType = any, ParentType extends ResolversParentTypes['Ride'] = ResolversParentTypes['Ride']> = {
  additional_information?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  creator?: Resolver<ResolversTypes['User'], ParentType, ContextType>;
  creator_id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  end_date_registration?: Resolver<ResolversTypes['Date'], ParentType, ContextType>;
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  name?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  participants_limit?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>;
  start_date?: Resolver<ResolversTypes['Date'], ParentType, ContextType>;
  start_date_registration?: Resolver<ResolversTypes['Date'], ParentType, ContextType>;
  start_place?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  participants?: Resolver<Maybe<Array<Maybe<ResolversTypes['UsersOnRide']>>>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type UserResolvers<ContextType = any, ParentType extends ResolversParentTypes['User'] = ResolversParentTypes['User']> = {
  created_ride?: Resolver<Maybe<Array<Maybe<ResolversTypes['Ride']>>>, ParentType, ContextType>;
  email?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  password?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  ride?: Resolver<Maybe<Array<Maybe<ResolversTypes['UsersOnRide']>>>, ParentType, ContextType>;
  username?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type UsersOnRideResolvers<ContextType = any, ParentType extends ResolversParentTypes['UsersOnRide'] = ResolversParentTypes['UsersOnRide']> = {
  ride?: Resolver<ResolversTypes['Ride'], ParentType, ContextType>;
  ride_id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  subscription_date?: Resolver<ResolversTypes['Date'], ParentType, ContextType>;
  user?: Resolver<ResolversTypes['User'], ParentType, ContextType>;
  user_id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type Resolvers<ContextType = any> = {
  AuthPayLoad?: AuthPayLoadResolvers<ContextType>;
  Mutation?: MutationResolvers<ContextType>;
  Query?: QueryResolvers<ContextType>;
  Ride?: RideResolvers<ContextType>;
  User?: UserResolvers<ContextType>;
  UsersOnRide?: UsersOnRideResolvers<ContextType>;
};

