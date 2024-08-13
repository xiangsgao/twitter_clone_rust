// package: twitter_clone
// file: twitter_clone.proto

/* tslint:disable */
/* eslint-disable */

import * as grpc from "@grpc/grpc-js";
import * as twitter_clone_pb from "./twitter_clone_pb";
import * as google_protobuf_timestamp_pb from "google-protobuf/google/protobuf/timestamp_pb";

interface IUserService extends grpc.ServiceDefinition<grpc.UntypedServiceImplementation> {
    loginUser: IUserService_ILoginUser;
    registerUser: IUserService_IRegisterUser;
    logoutUser: IUserService_ILogoutUser;
    getUser: IUserService_IGetUser;
    followUser: IUserService_IFollowUser;
    unfollowUser: IUserService_IUnfollowUser;
}

interface IUserService_ILoginUser extends grpc.MethodDefinition<twitter_clone_pb.LoginUserRequest, twitter_clone_pb.LoginUserResponse> {
    path: "/twitter_clone.User/LoginUser";
    requestStream: false;
    responseStream: false;
    requestSerialize: grpc.serialize<twitter_clone_pb.LoginUserRequest>;
    requestDeserialize: grpc.deserialize<twitter_clone_pb.LoginUserRequest>;
    responseSerialize: grpc.serialize<twitter_clone_pb.LoginUserResponse>;
    responseDeserialize: grpc.deserialize<twitter_clone_pb.LoginUserResponse>;
}
interface IUserService_IRegisterUser extends grpc.MethodDefinition<twitter_clone_pb.RegisterUserRequest, twitter_clone_pb.RegisterUserResponse> {
    path: "/twitter_clone.User/RegisterUser";
    requestStream: false;
    responseStream: false;
    requestSerialize: grpc.serialize<twitter_clone_pb.RegisterUserRequest>;
    requestDeserialize: grpc.deserialize<twitter_clone_pb.RegisterUserRequest>;
    responseSerialize: grpc.serialize<twitter_clone_pb.RegisterUserResponse>;
    responseDeserialize: grpc.deserialize<twitter_clone_pb.RegisterUserResponse>;
}
interface IUserService_ILogoutUser extends grpc.MethodDefinition<twitter_clone_pb.LogoutUserRequest, twitter_clone_pb.LogoutUserResponse> {
    path: "/twitter_clone.User/LogoutUser";
    requestStream: false;
    responseStream: false;
    requestSerialize: grpc.serialize<twitter_clone_pb.LogoutUserRequest>;
    requestDeserialize: grpc.deserialize<twitter_clone_pb.LogoutUserRequest>;
    responseSerialize: grpc.serialize<twitter_clone_pb.LogoutUserResponse>;
    responseDeserialize: grpc.deserialize<twitter_clone_pb.LogoutUserResponse>;
}
interface IUserService_IGetUser extends grpc.MethodDefinition<twitter_clone_pb.GetUserRequest, twitter_clone_pb.UserResponse> {
    path: "/twitter_clone.User/GetUser";
    requestStream: false;
    responseStream: false;
    requestSerialize: grpc.serialize<twitter_clone_pb.GetUserRequest>;
    requestDeserialize: grpc.deserialize<twitter_clone_pb.GetUserRequest>;
    responseSerialize: grpc.serialize<twitter_clone_pb.UserResponse>;
    responseDeserialize: grpc.deserialize<twitter_clone_pb.UserResponse>;
}
interface IUserService_IFollowUser extends grpc.MethodDefinition<twitter_clone_pb.FollowRequest, twitter_clone_pb.UserResponse> {
    path: "/twitter_clone.User/FollowUser";
    requestStream: false;
    responseStream: false;
    requestSerialize: grpc.serialize<twitter_clone_pb.FollowRequest>;
    requestDeserialize: grpc.deserialize<twitter_clone_pb.FollowRequest>;
    responseSerialize: grpc.serialize<twitter_clone_pb.UserResponse>;
    responseDeserialize: grpc.deserialize<twitter_clone_pb.UserResponse>;
}
interface IUserService_IUnfollowUser extends grpc.MethodDefinition<twitter_clone_pb.FollowRequest, twitter_clone_pb.UserResponse> {
    path: "/twitter_clone.User/UnfollowUser";
    requestStream: false;
    responseStream: false;
    requestSerialize: grpc.serialize<twitter_clone_pb.FollowRequest>;
    requestDeserialize: grpc.deserialize<twitter_clone_pb.FollowRequest>;
    responseSerialize: grpc.serialize<twitter_clone_pb.UserResponse>;
    responseDeserialize: grpc.deserialize<twitter_clone_pb.UserResponse>;
}

export const UserService: IUserService;

export interface IUserServer extends grpc.UntypedServiceImplementation {
    loginUser: grpc.handleUnaryCall<twitter_clone_pb.LoginUserRequest, twitter_clone_pb.LoginUserResponse>;
    registerUser: grpc.handleUnaryCall<twitter_clone_pb.RegisterUserRequest, twitter_clone_pb.RegisterUserResponse>;
    logoutUser: grpc.handleUnaryCall<twitter_clone_pb.LogoutUserRequest, twitter_clone_pb.LogoutUserResponse>;
    getUser: grpc.handleUnaryCall<twitter_clone_pb.GetUserRequest, twitter_clone_pb.UserResponse>;
    followUser: grpc.handleUnaryCall<twitter_clone_pb.FollowRequest, twitter_clone_pb.UserResponse>;
    unfollowUser: grpc.handleUnaryCall<twitter_clone_pb.FollowRequest, twitter_clone_pb.UserResponse>;
}

export interface IUserClient {
    loginUser(request: twitter_clone_pb.LoginUserRequest, callback: (error: grpc.ServiceError | null, response: twitter_clone_pb.LoginUserResponse) => void): grpc.ClientUnaryCall;
    loginUser(request: twitter_clone_pb.LoginUserRequest, metadata: grpc.Metadata, callback: (error: grpc.ServiceError | null, response: twitter_clone_pb.LoginUserResponse) => void): grpc.ClientUnaryCall;
    loginUser(request: twitter_clone_pb.LoginUserRequest, metadata: grpc.Metadata, options: Partial<grpc.CallOptions>, callback: (error: grpc.ServiceError | null, response: twitter_clone_pb.LoginUserResponse) => void): grpc.ClientUnaryCall;
    registerUser(request: twitter_clone_pb.RegisterUserRequest, callback: (error: grpc.ServiceError | null, response: twitter_clone_pb.RegisterUserResponse) => void): grpc.ClientUnaryCall;
    registerUser(request: twitter_clone_pb.RegisterUserRequest, metadata: grpc.Metadata, callback: (error: grpc.ServiceError | null, response: twitter_clone_pb.RegisterUserResponse) => void): grpc.ClientUnaryCall;
    registerUser(request: twitter_clone_pb.RegisterUserRequest, metadata: grpc.Metadata, options: Partial<grpc.CallOptions>, callback: (error: grpc.ServiceError | null, response: twitter_clone_pb.RegisterUserResponse) => void): grpc.ClientUnaryCall;
    logoutUser(request: twitter_clone_pb.LogoutUserRequest, callback: (error: grpc.ServiceError | null, response: twitter_clone_pb.LogoutUserResponse) => void): grpc.ClientUnaryCall;
    logoutUser(request: twitter_clone_pb.LogoutUserRequest, metadata: grpc.Metadata, callback: (error: grpc.ServiceError | null, response: twitter_clone_pb.LogoutUserResponse) => void): grpc.ClientUnaryCall;
    logoutUser(request: twitter_clone_pb.LogoutUserRequest, metadata: grpc.Metadata, options: Partial<grpc.CallOptions>, callback: (error: grpc.ServiceError | null, response: twitter_clone_pb.LogoutUserResponse) => void): grpc.ClientUnaryCall;
    getUser(request: twitter_clone_pb.GetUserRequest, callback: (error: grpc.ServiceError | null, response: twitter_clone_pb.UserResponse) => void): grpc.ClientUnaryCall;
    getUser(request: twitter_clone_pb.GetUserRequest, metadata: grpc.Metadata, callback: (error: grpc.ServiceError | null, response: twitter_clone_pb.UserResponse) => void): grpc.ClientUnaryCall;
    getUser(request: twitter_clone_pb.GetUserRequest, metadata: grpc.Metadata, options: Partial<grpc.CallOptions>, callback: (error: grpc.ServiceError | null, response: twitter_clone_pb.UserResponse) => void): grpc.ClientUnaryCall;
    followUser(request: twitter_clone_pb.FollowRequest, callback: (error: grpc.ServiceError | null, response: twitter_clone_pb.UserResponse) => void): grpc.ClientUnaryCall;
    followUser(request: twitter_clone_pb.FollowRequest, metadata: grpc.Metadata, callback: (error: grpc.ServiceError | null, response: twitter_clone_pb.UserResponse) => void): grpc.ClientUnaryCall;
    followUser(request: twitter_clone_pb.FollowRequest, metadata: grpc.Metadata, options: Partial<grpc.CallOptions>, callback: (error: grpc.ServiceError | null, response: twitter_clone_pb.UserResponse) => void): grpc.ClientUnaryCall;
    unfollowUser(request: twitter_clone_pb.FollowRequest, callback: (error: grpc.ServiceError | null, response: twitter_clone_pb.UserResponse) => void): grpc.ClientUnaryCall;
    unfollowUser(request: twitter_clone_pb.FollowRequest, metadata: grpc.Metadata, callback: (error: grpc.ServiceError | null, response: twitter_clone_pb.UserResponse) => void): grpc.ClientUnaryCall;
    unfollowUser(request: twitter_clone_pb.FollowRequest, metadata: grpc.Metadata, options: Partial<grpc.CallOptions>, callback: (error: grpc.ServiceError | null, response: twitter_clone_pb.UserResponse) => void): grpc.ClientUnaryCall;
}

export class UserClient extends grpc.Client implements IUserClient {
    constructor(address: string, credentials: grpc.ChannelCredentials, options?: Partial<grpc.ClientOptions>);
    public loginUser(request: twitter_clone_pb.LoginUserRequest, callback: (error: grpc.ServiceError | null, response: twitter_clone_pb.LoginUserResponse) => void): grpc.ClientUnaryCall;
    public loginUser(request: twitter_clone_pb.LoginUserRequest, metadata: grpc.Metadata, callback: (error: grpc.ServiceError | null, response: twitter_clone_pb.LoginUserResponse) => void): grpc.ClientUnaryCall;
    public loginUser(request: twitter_clone_pb.LoginUserRequest, metadata: grpc.Metadata, options: Partial<grpc.CallOptions>, callback: (error: grpc.ServiceError | null, response: twitter_clone_pb.LoginUserResponse) => void): grpc.ClientUnaryCall;
    public registerUser(request: twitter_clone_pb.RegisterUserRequest, callback: (error: grpc.ServiceError | null, response: twitter_clone_pb.RegisterUserResponse) => void): grpc.ClientUnaryCall;
    public registerUser(request: twitter_clone_pb.RegisterUserRequest, metadata: grpc.Metadata, callback: (error: grpc.ServiceError | null, response: twitter_clone_pb.RegisterUserResponse) => void): grpc.ClientUnaryCall;
    public registerUser(request: twitter_clone_pb.RegisterUserRequest, metadata: grpc.Metadata, options: Partial<grpc.CallOptions>, callback: (error: grpc.ServiceError | null, response: twitter_clone_pb.RegisterUserResponse) => void): grpc.ClientUnaryCall;
    public logoutUser(request: twitter_clone_pb.LogoutUserRequest, callback: (error: grpc.ServiceError | null, response: twitter_clone_pb.LogoutUserResponse) => void): grpc.ClientUnaryCall;
    public logoutUser(request: twitter_clone_pb.LogoutUserRequest, metadata: grpc.Metadata, callback: (error: grpc.ServiceError | null, response: twitter_clone_pb.LogoutUserResponse) => void): grpc.ClientUnaryCall;
    public logoutUser(request: twitter_clone_pb.LogoutUserRequest, metadata: grpc.Metadata, options: Partial<grpc.CallOptions>, callback: (error: grpc.ServiceError | null, response: twitter_clone_pb.LogoutUserResponse) => void): grpc.ClientUnaryCall;
    public getUser(request: twitter_clone_pb.GetUserRequest, callback: (error: grpc.ServiceError | null, response: twitter_clone_pb.UserResponse) => void): grpc.ClientUnaryCall;
    public getUser(request: twitter_clone_pb.GetUserRequest, metadata: grpc.Metadata, callback: (error: grpc.ServiceError | null, response: twitter_clone_pb.UserResponse) => void): grpc.ClientUnaryCall;
    public getUser(request: twitter_clone_pb.GetUserRequest, metadata: grpc.Metadata, options: Partial<grpc.CallOptions>, callback: (error: grpc.ServiceError | null, response: twitter_clone_pb.UserResponse) => void): grpc.ClientUnaryCall;
    public followUser(request: twitter_clone_pb.FollowRequest, callback: (error: grpc.ServiceError | null, response: twitter_clone_pb.UserResponse) => void): grpc.ClientUnaryCall;
    public followUser(request: twitter_clone_pb.FollowRequest, metadata: grpc.Metadata, callback: (error: grpc.ServiceError | null, response: twitter_clone_pb.UserResponse) => void): grpc.ClientUnaryCall;
    public followUser(request: twitter_clone_pb.FollowRequest, metadata: grpc.Metadata, options: Partial<grpc.CallOptions>, callback: (error: grpc.ServiceError | null, response: twitter_clone_pb.UserResponse) => void): grpc.ClientUnaryCall;
    public unfollowUser(request: twitter_clone_pb.FollowRequest, callback: (error: grpc.ServiceError | null, response: twitter_clone_pb.UserResponse) => void): grpc.ClientUnaryCall;
    public unfollowUser(request: twitter_clone_pb.FollowRequest, metadata: grpc.Metadata, callback: (error: grpc.ServiceError | null, response: twitter_clone_pb.UserResponse) => void): grpc.ClientUnaryCall;
    public unfollowUser(request: twitter_clone_pb.FollowRequest, metadata: grpc.Metadata, options: Partial<grpc.CallOptions>, callback: (error: grpc.ServiceError | null, response: twitter_clone_pb.UserResponse) => void): grpc.ClientUnaryCall;
}

interface ITweetService extends grpc.ServiceDefinition<grpc.UntypedServiceImplementation> {
    createTweet: ITweetService_ICreateTweet;
    deleteTweet: ITweetService_IDeleteTweet;
    editTweet: ITweetService_IEditTweet;
    getLoginTweet: ITweetService_IGetLoginTweet;
    getAllTweet: ITweetService_IGetAllTweet;
    likeTweet: ITweetService_ILikeTweet;
    unlikeTweet: ITweetService_IUnlikeTweet;
    getTweetComments: ITweetService_IGetTweetComments;
    createTweetComment: ITweetService_ICreateTweetComment;
    deleteTweetComment: ITweetService_IDeleteTweetComment;
    likeTweetComment: ITweetService_ILikeTweetComment;
    unlikeTweetComment: ITweetService_IUnlikeTweetComment;
}

interface ITweetService_ICreateTweet extends grpc.MethodDefinition<twitter_clone_pb.CreateTweetRequest, twitter_clone_pb.CreateTweetResponse> {
    path: "/twitter_clone.Tweet/CreateTweet";
    requestStream: false;
    responseStream: false;
    requestSerialize: grpc.serialize<twitter_clone_pb.CreateTweetRequest>;
    requestDeserialize: grpc.deserialize<twitter_clone_pb.CreateTweetRequest>;
    responseSerialize: grpc.serialize<twitter_clone_pb.CreateTweetResponse>;
    responseDeserialize: grpc.deserialize<twitter_clone_pb.CreateTweetResponse>;
}
interface ITweetService_IDeleteTweet extends grpc.MethodDefinition<twitter_clone_pb.DeleteTweetRequest, twitter_clone_pb.DeleteTweetResponse> {
    path: "/twitter_clone.Tweet/DeleteTweet";
    requestStream: false;
    responseStream: false;
    requestSerialize: grpc.serialize<twitter_clone_pb.DeleteTweetRequest>;
    requestDeserialize: grpc.deserialize<twitter_clone_pb.DeleteTweetRequest>;
    responseSerialize: grpc.serialize<twitter_clone_pb.DeleteTweetResponse>;
    responseDeserialize: grpc.deserialize<twitter_clone_pb.DeleteTweetResponse>;
}
interface ITweetService_IEditTweet extends grpc.MethodDefinition<twitter_clone_pb.EditTweetRequest, twitter_clone_pb.EditTweetResponse> {
    path: "/twitter_clone.Tweet/EditTweet";
    requestStream: false;
    responseStream: false;
    requestSerialize: grpc.serialize<twitter_clone_pb.EditTweetRequest>;
    requestDeserialize: grpc.deserialize<twitter_clone_pb.EditTweetRequest>;
    responseSerialize: grpc.serialize<twitter_clone_pb.EditTweetResponse>;
    responseDeserialize: grpc.deserialize<twitter_clone_pb.EditTweetResponse>;
}
interface ITweetService_IGetLoginTweet extends grpc.MethodDefinition<twitter_clone_pb.GetLoginTweetRequest, twitter_clone_pb.GetTweetResponse> {
    path: "/twitter_clone.Tweet/GetLoginTweet";
    requestStream: false;
    responseStream: false;
    requestSerialize: grpc.serialize<twitter_clone_pb.GetLoginTweetRequest>;
    requestDeserialize: grpc.deserialize<twitter_clone_pb.GetLoginTweetRequest>;
    responseSerialize: grpc.serialize<twitter_clone_pb.GetTweetResponse>;
    responseDeserialize: grpc.deserialize<twitter_clone_pb.GetTweetResponse>;
}
interface ITweetService_IGetAllTweet extends grpc.MethodDefinition<twitter_clone_pb.GetAllTweetRequest, twitter_clone_pb.GetTweetResponse> {
    path: "/twitter_clone.Tweet/GetAllTweet";
    requestStream: false;
    responseStream: false;
    requestSerialize: grpc.serialize<twitter_clone_pb.GetAllTweetRequest>;
    requestDeserialize: grpc.deserialize<twitter_clone_pb.GetAllTweetRequest>;
    responseSerialize: grpc.serialize<twitter_clone_pb.GetTweetResponse>;
    responseDeserialize: grpc.deserialize<twitter_clone_pb.GetTweetResponse>;
}
interface ITweetService_ILikeTweet extends grpc.MethodDefinition<twitter_clone_pb.LikeTweetRequest, twitter_clone_pb.LikeTweetResponse> {
    path: "/twitter_clone.Tweet/LikeTweet";
    requestStream: false;
    responseStream: false;
    requestSerialize: grpc.serialize<twitter_clone_pb.LikeTweetRequest>;
    requestDeserialize: grpc.deserialize<twitter_clone_pb.LikeTweetRequest>;
    responseSerialize: grpc.serialize<twitter_clone_pb.LikeTweetResponse>;
    responseDeserialize: grpc.deserialize<twitter_clone_pb.LikeTweetResponse>;
}
interface ITweetService_IUnlikeTweet extends grpc.MethodDefinition<twitter_clone_pb.UnlikeTweetRequest, twitter_clone_pb.UnlikeTweetResponse> {
    path: "/twitter_clone.Tweet/UnlikeTweet";
    requestStream: false;
    responseStream: false;
    requestSerialize: grpc.serialize<twitter_clone_pb.UnlikeTweetRequest>;
    requestDeserialize: grpc.deserialize<twitter_clone_pb.UnlikeTweetRequest>;
    responseSerialize: grpc.serialize<twitter_clone_pb.UnlikeTweetResponse>;
    responseDeserialize: grpc.deserialize<twitter_clone_pb.UnlikeTweetResponse>;
}
interface ITweetService_IGetTweetComments extends grpc.MethodDefinition<twitter_clone_pb.GetTweetCommentRequest, twitter_clone_pb.GetTweetCommentsResponse> {
    path: "/twitter_clone.Tweet/GetTweetComments";
    requestStream: false;
    responseStream: false;
    requestSerialize: grpc.serialize<twitter_clone_pb.GetTweetCommentRequest>;
    requestDeserialize: grpc.deserialize<twitter_clone_pb.GetTweetCommentRequest>;
    responseSerialize: grpc.serialize<twitter_clone_pb.GetTweetCommentsResponse>;
    responseDeserialize: grpc.deserialize<twitter_clone_pb.GetTweetCommentsResponse>;
}
interface ITweetService_ICreateTweetComment extends grpc.MethodDefinition<twitter_clone_pb.CreateTweetCommentRequest, twitter_clone_pb.CreateTweetCommentResponse> {
    path: "/twitter_clone.Tweet/CreateTweetComment";
    requestStream: false;
    responseStream: false;
    requestSerialize: grpc.serialize<twitter_clone_pb.CreateTweetCommentRequest>;
    requestDeserialize: grpc.deserialize<twitter_clone_pb.CreateTweetCommentRequest>;
    responseSerialize: grpc.serialize<twitter_clone_pb.CreateTweetCommentResponse>;
    responseDeserialize: grpc.deserialize<twitter_clone_pb.CreateTweetCommentResponse>;
}
interface ITweetService_IDeleteTweetComment extends grpc.MethodDefinition<twitter_clone_pb.DeleteTweetCommentRequest, twitter_clone_pb.DeleteTweetCommentResponse> {
    path: "/twitter_clone.Tweet/DeleteTweetComment";
    requestStream: false;
    responseStream: false;
    requestSerialize: grpc.serialize<twitter_clone_pb.DeleteTweetCommentRequest>;
    requestDeserialize: grpc.deserialize<twitter_clone_pb.DeleteTweetCommentRequest>;
    responseSerialize: grpc.serialize<twitter_clone_pb.DeleteTweetCommentResponse>;
    responseDeserialize: grpc.deserialize<twitter_clone_pb.DeleteTweetCommentResponse>;
}
interface ITweetService_ILikeTweetComment extends grpc.MethodDefinition<twitter_clone_pb.LikeTweetCommentRequest, twitter_clone_pb.LikeTweetCommentResponse> {
    path: "/twitter_clone.Tweet/LikeTweetComment";
    requestStream: false;
    responseStream: false;
    requestSerialize: grpc.serialize<twitter_clone_pb.LikeTweetCommentRequest>;
    requestDeserialize: grpc.deserialize<twitter_clone_pb.LikeTweetCommentRequest>;
    responseSerialize: grpc.serialize<twitter_clone_pb.LikeTweetCommentResponse>;
    responseDeserialize: grpc.deserialize<twitter_clone_pb.LikeTweetCommentResponse>;
}
interface ITweetService_IUnlikeTweetComment extends grpc.MethodDefinition<twitter_clone_pb.UnlikeTweetCommentRequest, twitter_clone_pb.UnlikeTweetCommentResponse> {
    path: "/twitter_clone.Tweet/UnlikeTweetComment";
    requestStream: false;
    responseStream: false;
    requestSerialize: grpc.serialize<twitter_clone_pb.UnlikeTweetCommentRequest>;
    requestDeserialize: grpc.deserialize<twitter_clone_pb.UnlikeTweetCommentRequest>;
    responseSerialize: grpc.serialize<twitter_clone_pb.UnlikeTweetCommentResponse>;
    responseDeserialize: grpc.deserialize<twitter_clone_pb.UnlikeTweetCommentResponse>;
}

export const TweetService: ITweetService;

export interface ITweetServer extends grpc.UntypedServiceImplementation {
    createTweet: grpc.handleUnaryCall<twitter_clone_pb.CreateTweetRequest, twitter_clone_pb.CreateTweetResponse>;
    deleteTweet: grpc.handleUnaryCall<twitter_clone_pb.DeleteTweetRequest, twitter_clone_pb.DeleteTweetResponse>;
    editTweet: grpc.handleUnaryCall<twitter_clone_pb.EditTweetRequest, twitter_clone_pb.EditTweetResponse>;
    getLoginTweet: grpc.handleUnaryCall<twitter_clone_pb.GetLoginTweetRequest, twitter_clone_pb.GetTweetResponse>;
    getAllTweet: grpc.handleUnaryCall<twitter_clone_pb.GetAllTweetRequest, twitter_clone_pb.GetTweetResponse>;
    likeTweet: grpc.handleUnaryCall<twitter_clone_pb.LikeTweetRequest, twitter_clone_pb.LikeTweetResponse>;
    unlikeTweet: grpc.handleUnaryCall<twitter_clone_pb.UnlikeTweetRequest, twitter_clone_pb.UnlikeTweetResponse>;
    getTweetComments: grpc.handleUnaryCall<twitter_clone_pb.GetTweetCommentRequest, twitter_clone_pb.GetTweetCommentsResponse>;
    createTweetComment: grpc.handleUnaryCall<twitter_clone_pb.CreateTweetCommentRequest, twitter_clone_pb.CreateTweetCommentResponse>;
    deleteTweetComment: grpc.handleUnaryCall<twitter_clone_pb.DeleteTweetCommentRequest, twitter_clone_pb.DeleteTweetCommentResponse>;
    likeTweetComment: grpc.handleUnaryCall<twitter_clone_pb.LikeTweetCommentRequest, twitter_clone_pb.LikeTweetCommentResponse>;
    unlikeTweetComment: grpc.handleUnaryCall<twitter_clone_pb.UnlikeTweetCommentRequest, twitter_clone_pb.UnlikeTweetCommentResponse>;
}

export interface ITweetClient {
    createTweet(request: twitter_clone_pb.CreateTweetRequest, callback: (error: grpc.ServiceError | null, response: twitter_clone_pb.CreateTweetResponse) => void): grpc.ClientUnaryCall;
    createTweet(request: twitter_clone_pb.CreateTweetRequest, metadata: grpc.Metadata, callback: (error: grpc.ServiceError | null, response: twitter_clone_pb.CreateTweetResponse) => void): grpc.ClientUnaryCall;
    createTweet(request: twitter_clone_pb.CreateTweetRequest, metadata: grpc.Metadata, options: Partial<grpc.CallOptions>, callback: (error: grpc.ServiceError | null, response: twitter_clone_pb.CreateTweetResponse) => void): grpc.ClientUnaryCall;
    deleteTweet(request: twitter_clone_pb.DeleteTweetRequest, callback: (error: grpc.ServiceError | null, response: twitter_clone_pb.DeleteTweetResponse) => void): grpc.ClientUnaryCall;
    deleteTweet(request: twitter_clone_pb.DeleteTweetRequest, metadata: grpc.Metadata, callback: (error: grpc.ServiceError | null, response: twitter_clone_pb.DeleteTweetResponse) => void): grpc.ClientUnaryCall;
    deleteTweet(request: twitter_clone_pb.DeleteTweetRequest, metadata: grpc.Metadata, options: Partial<grpc.CallOptions>, callback: (error: grpc.ServiceError | null, response: twitter_clone_pb.DeleteTweetResponse) => void): grpc.ClientUnaryCall;
    editTweet(request: twitter_clone_pb.EditTweetRequest, callback: (error: grpc.ServiceError | null, response: twitter_clone_pb.EditTweetResponse) => void): grpc.ClientUnaryCall;
    editTweet(request: twitter_clone_pb.EditTweetRequest, metadata: grpc.Metadata, callback: (error: grpc.ServiceError | null, response: twitter_clone_pb.EditTweetResponse) => void): grpc.ClientUnaryCall;
    editTweet(request: twitter_clone_pb.EditTweetRequest, metadata: grpc.Metadata, options: Partial<grpc.CallOptions>, callback: (error: grpc.ServiceError | null, response: twitter_clone_pb.EditTweetResponse) => void): grpc.ClientUnaryCall;
    getLoginTweet(request: twitter_clone_pb.GetLoginTweetRequest, callback: (error: grpc.ServiceError | null, response: twitter_clone_pb.GetTweetResponse) => void): grpc.ClientUnaryCall;
    getLoginTweet(request: twitter_clone_pb.GetLoginTweetRequest, metadata: grpc.Metadata, callback: (error: grpc.ServiceError | null, response: twitter_clone_pb.GetTweetResponse) => void): grpc.ClientUnaryCall;
    getLoginTweet(request: twitter_clone_pb.GetLoginTweetRequest, metadata: grpc.Metadata, options: Partial<grpc.CallOptions>, callback: (error: grpc.ServiceError | null, response: twitter_clone_pb.GetTweetResponse) => void): grpc.ClientUnaryCall;
    getAllTweet(request: twitter_clone_pb.GetAllTweetRequest, callback: (error: grpc.ServiceError | null, response: twitter_clone_pb.GetTweetResponse) => void): grpc.ClientUnaryCall;
    getAllTweet(request: twitter_clone_pb.GetAllTweetRequest, metadata: grpc.Metadata, callback: (error: grpc.ServiceError | null, response: twitter_clone_pb.GetTweetResponse) => void): grpc.ClientUnaryCall;
    getAllTweet(request: twitter_clone_pb.GetAllTweetRequest, metadata: grpc.Metadata, options: Partial<grpc.CallOptions>, callback: (error: grpc.ServiceError | null, response: twitter_clone_pb.GetTweetResponse) => void): grpc.ClientUnaryCall;
    likeTweet(request: twitter_clone_pb.LikeTweetRequest, callback: (error: grpc.ServiceError | null, response: twitter_clone_pb.LikeTweetResponse) => void): grpc.ClientUnaryCall;
    likeTweet(request: twitter_clone_pb.LikeTweetRequest, metadata: grpc.Metadata, callback: (error: grpc.ServiceError | null, response: twitter_clone_pb.LikeTweetResponse) => void): grpc.ClientUnaryCall;
    likeTweet(request: twitter_clone_pb.LikeTweetRequest, metadata: grpc.Metadata, options: Partial<grpc.CallOptions>, callback: (error: grpc.ServiceError | null, response: twitter_clone_pb.LikeTweetResponse) => void): grpc.ClientUnaryCall;
    unlikeTweet(request: twitter_clone_pb.UnlikeTweetRequest, callback: (error: grpc.ServiceError | null, response: twitter_clone_pb.UnlikeTweetResponse) => void): grpc.ClientUnaryCall;
    unlikeTweet(request: twitter_clone_pb.UnlikeTweetRequest, metadata: grpc.Metadata, callback: (error: grpc.ServiceError | null, response: twitter_clone_pb.UnlikeTweetResponse) => void): grpc.ClientUnaryCall;
    unlikeTweet(request: twitter_clone_pb.UnlikeTweetRequest, metadata: grpc.Metadata, options: Partial<grpc.CallOptions>, callback: (error: grpc.ServiceError | null, response: twitter_clone_pb.UnlikeTweetResponse) => void): grpc.ClientUnaryCall;
    getTweetComments(request: twitter_clone_pb.GetTweetCommentRequest, callback: (error: grpc.ServiceError | null, response: twitter_clone_pb.GetTweetCommentsResponse) => void): grpc.ClientUnaryCall;
    getTweetComments(request: twitter_clone_pb.GetTweetCommentRequest, metadata: grpc.Metadata, callback: (error: grpc.ServiceError | null, response: twitter_clone_pb.GetTweetCommentsResponse) => void): grpc.ClientUnaryCall;
    getTweetComments(request: twitter_clone_pb.GetTweetCommentRequest, metadata: grpc.Metadata, options: Partial<grpc.CallOptions>, callback: (error: grpc.ServiceError | null, response: twitter_clone_pb.GetTweetCommentsResponse) => void): grpc.ClientUnaryCall;
    createTweetComment(request: twitter_clone_pb.CreateTweetCommentRequest, callback: (error: grpc.ServiceError | null, response: twitter_clone_pb.CreateTweetCommentResponse) => void): grpc.ClientUnaryCall;
    createTweetComment(request: twitter_clone_pb.CreateTweetCommentRequest, metadata: grpc.Metadata, callback: (error: grpc.ServiceError | null, response: twitter_clone_pb.CreateTweetCommentResponse) => void): grpc.ClientUnaryCall;
    createTweetComment(request: twitter_clone_pb.CreateTweetCommentRequest, metadata: grpc.Metadata, options: Partial<grpc.CallOptions>, callback: (error: grpc.ServiceError | null, response: twitter_clone_pb.CreateTweetCommentResponse) => void): grpc.ClientUnaryCall;
    deleteTweetComment(request: twitter_clone_pb.DeleteTweetCommentRequest, callback: (error: grpc.ServiceError | null, response: twitter_clone_pb.DeleteTweetCommentResponse) => void): grpc.ClientUnaryCall;
    deleteTweetComment(request: twitter_clone_pb.DeleteTweetCommentRequest, metadata: grpc.Metadata, callback: (error: grpc.ServiceError | null, response: twitter_clone_pb.DeleteTweetCommentResponse) => void): grpc.ClientUnaryCall;
    deleteTweetComment(request: twitter_clone_pb.DeleteTweetCommentRequest, metadata: grpc.Metadata, options: Partial<grpc.CallOptions>, callback: (error: grpc.ServiceError | null, response: twitter_clone_pb.DeleteTweetCommentResponse) => void): grpc.ClientUnaryCall;
    likeTweetComment(request: twitter_clone_pb.LikeTweetCommentRequest, callback: (error: grpc.ServiceError | null, response: twitter_clone_pb.LikeTweetCommentResponse) => void): grpc.ClientUnaryCall;
    likeTweetComment(request: twitter_clone_pb.LikeTweetCommentRequest, metadata: grpc.Metadata, callback: (error: grpc.ServiceError | null, response: twitter_clone_pb.LikeTweetCommentResponse) => void): grpc.ClientUnaryCall;
    likeTweetComment(request: twitter_clone_pb.LikeTweetCommentRequest, metadata: grpc.Metadata, options: Partial<grpc.CallOptions>, callback: (error: grpc.ServiceError | null, response: twitter_clone_pb.LikeTweetCommentResponse) => void): grpc.ClientUnaryCall;
    unlikeTweetComment(request: twitter_clone_pb.UnlikeTweetCommentRequest, callback: (error: grpc.ServiceError | null, response: twitter_clone_pb.UnlikeTweetCommentResponse) => void): grpc.ClientUnaryCall;
    unlikeTweetComment(request: twitter_clone_pb.UnlikeTweetCommentRequest, metadata: grpc.Metadata, callback: (error: grpc.ServiceError | null, response: twitter_clone_pb.UnlikeTweetCommentResponse) => void): grpc.ClientUnaryCall;
    unlikeTweetComment(request: twitter_clone_pb.UnlikeTweetCommentRequest, metadata: grpc.Metadata, options: Partial<grpc.CallOptions>, callback: (error: grpc.ServiceError | null, response: twitter_clone_pb.UnlikeTweetCommentResponse) => void): grpc.ClientUnaryCall;
}

export class TweetClient extends grpc.Client implements ITweetClient {
    constructor(address: string, credentials: grpc.ChannelCredentials, options?: Partial<grpc.ClientOptions>);
    public createTweet(request: twitter_clone_pb.CreateTweetRequest, callback: (error: grpc.ServiceError | null, response: twitter_clone_pb.CreateTweetResponse) => void): grpc.ClientUnaryCall;
    public createTweet(request: twitter_clone_pb.CreateTweetRequest, metadata: grpc.Metadata, callback: (error: grpc.ServiceError | null, response: twitter_clone_pb.CreateTweetResponse) => void): grpc.ClientUnaryCall;
    public createTweet(request: twitter_clone_pb.CreateTweetRequest, metadata: grpc.Metadata, options: Partial<grpc.CallOptions>, callback: (error: grpc.ServiceError | null, response: twitter_clone_pb.CreateTweetResponse) => void): grpc.ClientUnaryCall;
    public deleteTweet(request: twitter_clone_pb.DeleteTweetRequest, callback: (error: grpc.ServiceError | null, response: twitter_clone_pb.DeleteTweetResponse) => void): grpc.ClientUnaryCall;
    public deleteTweet(request: twitter_clone_pb.DeleteTweetRequest, metadata: grpc.Metadata, callback: (error: grpc.ServiceError | null, response: twitter_clone_pb.DeleteTweetResponse) => void): grpc.ClientUnaryCall;
    public deleteTweet(request: twitter_clone_pb.DeleteTweetRequest, metadata: grpc.Metadata, options: Partial<grpc.CallOptions>, callback: (error: grpc.ServiceError | null, response: twitter_clone_pb.DeleteTweetResponse) => void): grpc.ClientUnaryCall;
    public editTweet(request: twitter_clone_pb.EditTweetRequest, callback: (error: grpc.ServiceError | null, response: twitter_clone_pb.EditTweetResponse) => void): grpc.ClientUnaryCall;
    public editTweet(request: twitter_clone_pb.EditTweetRequest, metadata: grpc.Metadata, callback: (error: grpc.ServiceError | null, response: twitter_clone_pb.EditTweetResponse) => void): grpc.ClientUnaryCall;
    public editTweet(request: twitter_clone_pb.EditTweetRequest, metadata: grpc.Metadata, options: Partial<grpc.CallOptions>, callback: (error: grpc.ServiceError | null, response: twitter_clone_pb.EditTweetResponse) => void): grpc.ClientUnaryCall;
    public getLoginTweet(request: twitter_clone_pb.GetLoginTweetRequest, callback: (error: grpc.ServiceError | null, response: twitter_clone_pb.GetTweetResponse) => void): grpc.ClientUnaryCall;
    public getLoginTweet(request: twitter_clone_pb.GetLoginTweetRequest, metadata: grpc.Metadata, callback: (error: grpc.ServiceError | null, response: twitter_clone_pb.GetTweetResponse) => void): grpc.ClientUnaryCall;
    public getLoginTweet(request: twitter_clone_pb.GetLoginTweetRequest, metadata: grpc.Metadata, options: Partial<grpc.CallOptions>, callback: (error: grpc.ServiceError | null, response: twitter_clone_pb.GetTweetResponse) => void): grpc.ClientUnaryCall;
    public getAllTweet(request: twitter_clone_pb.GetAllTweetRequest, callback: (error: grpc.ServiceError | null, response: twitter_clone_pb.GetTweetResponse) => void): grpc.ClientUnaryCall;
    public getAllTweet(request: twitter_clone_pb.GetAllTweetRequest, metadata: grpc.Metadata, callback: (error: grpc.ServiceError | null, response: twitter_clone_pb.GetTweetResponse) => void): grpc.ClientUnaryCall;
    public getAllTweet(request: twitter_clone_pb.GetAllTweetRequest, metadata: grpc.Metadata, options: Partial<grpc.CallOptions>, callback: (error: grpc.ServiceError | null, response: twitter_clone_pb.GetTweetResponse) => void): grpc.ClientUnaryCall;
    public likeTweet(request: twitter_clone_pb.LikeTweetRequest, callback: (error: grpc.ServiceError | null, response: twitter_clone_pb.LikeTweetResponse) => void): grpc.ClientUnaryCall;
    public likeTweet(request: twitter_clone_pb.LikeTweetRequest, metadata: grpc.Metadata, callback: (error: grpc.ServiceError | null, response: twitter_clone_pb.LikeTweetResponse) => void): grpc.ClientUnaryCall;
    public likeTweet(request: twitter_clone_pb.LikeTweetRequest, metadata: grpc.Metadata, options: Partial<grpc.CallOptions>, callback: (error: grpc.ServiceError | null, response: twitter_clone_pb.LikeTweetResponse) => void): grpc.ClientUnaryCall;
    public unlikeTweet(request: twitter_clone_pb.UnlikeTweetRequest, callback: (error: grpc.ServiceError | null, response: twitter_clone_pb.UnlikeTweetResponse) => void): grpc.ClientUnaryCall;
    public unlikeTweet(request: twitter_clone_pb.UnlikeTweetRequest, metadata: grpc.Metadata, callback: (error: grpc.ServiceError | null, response: twitter_clone_pb.UnlikeTweetResponse) => void): grpc.ClientUnaryCall;
    public unlikeTweet(request: twitter_clone_pb.UnlikeTweetRequest, metadata: grpc.Metadata, options: Partial<grpc.CallOptions>, callback: (error: grpc.ServiceError | null, response: twitter_clone_pb.UnlikeTweetResponse) => void): grpc.ClientUnaryCall;
    public getTweetComments(request: twitter_clone_pb.GetTweetCommentRequest, callback: (error: grpc.ServiceError | null, response: twitter_clone_pb.GetTweetCommentsResponse) => void): grpc.ClientUnaryCall;
    public getTweetComments(request: twitter_clone_pb.GetTweetCommentRequest, metadata: grpc.Metadata, callback: (error: grpc.ServiceError | null, response: twitter_clone_pb.GetTweetCommentsResponse) => void): grpc.ClientUnaryCall;
    public getTweetComments(request: twitter_clone_pb.GetTweetCommentRequest, metadata: grpc.Metadata, options: Partial<grpc.CallOptions>, callback: (error: grpc.ServiceError | null, response: twitter_clone_pb.GetTweetCommentsResponse) => void): grpc.ClientUnaryCall;
    public createTweetComment(request: twitter_clone_pb.CreateTweetCommentRequest, callback: (error: grpc.ServiceError | null, response: twitter_clone_pb.CreateTweetCommentResponse) => void): grpc.ClientUnaryCall;
    public createTweetComment(request: twitter_clone_pb.CreateTweetCommentRequest, metadata: grpc.Metadata, callback: (error: grpc.ServiceError | null, response: twitter_clone_pb.CreateTweetCommentResponse) => void): grpc.ClientUnaryCall;
    public createTweetComment(request: twitter_clone_pb.CreateTweetCommentRequest, metadata: grpc.Metadata, options: Partial<grpc.CallOptions>, callback: (error: grpc.ServiceError | null, response: twitter_clone_pb.CreateTweetCommentResponse) => void): grpc.ClientUnaryCall;
    public deleteTweetComment(request: twitter_clone_pb.DeleteTweetCommentRequest, callback: (error: grpc.ServiceError | null, response: twitter_clone_pb.DeleteTweetCommentResponse) => void): grpc.ClientUnaryCall;
    public deleteTweetComment(request: twitter_clone_pb.DeleteTweetCommentRequest, metadata: grpc.Metadata, callback: (error: grpc.ServiceError | null, response: twitter_clone_pb.DeleteTweetCommentResponse) => void): grpc.ClientUnaryCall;
    public deleteTweetComment(request: twitter_clone_pb.DeleteTweetCommentRequest, metadata: grpc.Metadata, options: Partial<grpc.CallOptions>, callback: (error: grpc.ServiceError | null, response: twitter_clone_pb.DeleteTweetCommentResponse) => void): grpc.ClientUnaryCall;
    public likeTweetComment(request: twitter_clone_pb.LikeTweetCommentRequest, callback: (error: grpc.ServiceError | null, response: twitter_clone_pb.LikeTweetCommentResponse) => void): grpc.ClientUnaryCall;
    public likeTweetComment(request: twitter_clone_pb.LikeTweetCommentRequest, metadata: grpc.Metadata, callback: (error: grpc.ServiceError | null, response: twitter_clone_pb.LikeTweetCommentResponse) => void): grpc.ClientUnaryCall;
    public likeTweetComment(request: twitter_clone_pb.LikeTweetCommentRequest, metadata: grpc.Metadata, options: Partial<grpc.CallOptions>, callback: (error: grpc.ServiceError | null, response: twitter_clone_pb.LikeTweetCommentResponse) => void): grpc.ClientUnaryCall;
    public unlikeTweetComment(request: twitter_clone_pb.UnlikeTweetCommentRequest, callback: (error: grpc.ServiceError | null, response: twitter_clone_pb.UnlikeTweetCommentResponse) => void): grpc.ClientUnaryCall;
    public unlikeTweetComment(request: twitter_clone_pb.UnlikeTweetCommentRequest, metadata: grpc.Metadata, callback: (error: grpc.ServiceError | null, response: twitter_clone_pb.UnlikeTweetCommentResponse) => void): grpc.ClientUnaryCall;
    public unlikeTweetComment(request: twitter_clone_pb.UnlikeTweetCommentRequest, metadata: grpc.Metadata, options: Partial<grpc.CallOptions>, callback: (error: grpc.ServiceError | null, response: twitter_clone_pb.UnlikeTweetCommentResponse) => void): grpc.ClientUnaryCall;
}
