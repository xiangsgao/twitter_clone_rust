import * as jspb from 'google-protobuf'

import * as google_protobuf_timestamp_pb from 'google-protobuf/google/protobuf/timestamp_pb'; // proto import: "google/protobuf/timestamp.proto"


export class UnlikeTweetCommentRequest extends jspb.Message {
  getLikeId(): number;
  setLikeId(value: number): UnlikeTweetCommentRequest;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): UnlikeTweetCommentRequest.AsObject;
  static toObject(includeInstance: boolean, msg: UnlikeTweetCommentRequest): UnlikeTweetCommentRequest.AsObject;
  static serializeBinaryToWriter(message: UnlikeTweetCommentRequest, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): UnlikeTweetCommentRequest;
  static deserializeBinaryFromReader(message: UnlikeTweetCommentRequest, reader: jspb.BinaryReader): UnlikeTweetCommentRequest;
}

export namespace UnlikeTweetCommentRequest {
  export type AsObject = {
    likeId: number,
  }
}

export class UnlikeTweetCommentResponse extends jspb.Message {
  getSuccess(): boolean;
  setSuccess(value: boolean): UnlikeTweetCommentResponse;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): UnlikeTweetCommentResponse.AsObject;
  static toObject(includeInstance: boolean, msg: UnlikeTweetCommentResponse): UnlikeTweetCommentResponse.AsObject;
  static serializeBinaryToWriter(message: UnlikeTweetCommentResponse, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): UnlikeTweetCommentResponse;
  static deserializeBinaryFromReader(message: UnlikeTweetCommentResponse, reader: jspb.BinaryReader): UnlikeTweetCommentResponse;
}

export namespace UnlikeTweetCommentResponse {
  export type AsObject = {
    success: boolean,
  }
}

export class LikeTweetCommentRequest extends jspb.Message {
  getCommentId(): number;
  setCommentId(value: number): LikeTweetCommentRequest;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): LikeTweetCommentRequest.AsObject;
  static toObject(includeInstance: boolean, msg: LikeTweetCommentRequest): LikeTweetCommentRequest.AsObject;
  static serializeBinaryToWriter(message: LikeTweetCommentRequest, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): LikeTweetCommentRequest;
  static deserializeBinaryFromReader(message: LikeTweetCommentRequest, reader: jspb.BinaryReader): LikeTweetCommentRequest;
}

export namespace LikeTweetCommentRequest {
  export type AsObject = {
    commentId: number,
  }
}

export class LikeTweetCommentResponse extends jspb.Message {
  getSuccess(): boolean;
  setSuccess(value: boolean): LikeTweetCommentResponse;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): LikeTweetCommentResponse.AsObject;
  static toObject(includeInstance: boolean, msg: LikeTweetCommentResponse): LikeTweetCommentResponse.AsObject;
  static serializeBinaryToWriter(message: LikeTweetCommentResponse, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): LikeTweetCommentResponse;
  static deserializeBinaryFromReader(message: LikeTweetCommentResponse, reader: jspb.BinaryReader): LikeTweetCommentResponse;
}

export namespace LikeTweetCommentResponse {
  export type AsObject = {
    success: boolean,
  }
}

export class DeleteTweetCommentRequest extends jspb.Message {
  getCommentId(): number;
  setCommentId(value: number): DeleteTweetCommentRequest;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): DeleteTweetCommentRequest.AsObject;
  static toObject(includeInstance: boolean, msg: DeleteTweetCommentRequest): DeleteTweetCommentRequest.AsObject;
  static serializeBinaryToWriter(message: DeleteTweetCommentRequest, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): DeleteTweetCommentRequest;
  static deserializeBinaryFromReader(message: DeleteTweetCommentRequest, reader: jspb.BinaryReader): DeleteTweetCommentRequest;
}

export namespace DeleteTweetCommentRequest {
  export type AsObject = {
    commentId: number,
  }
}

export class DeleteTweetCommentResponse extends jspb.Message {
  getSuccess(): boolean;
  setSuccess(value: boolean): DeleteTweetCommentResponse;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): DeleteTweetCommentResponse.AsObject;
  static toObject(includeInstance: boolean, msg: DeleteTweetCommentResponse): DeleteTweetCommentResponse.AsObject;
  static serializeBinaryToWriter(message: DeleteTweetCommentResponse, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): DeleteTweetCommentResponse;
  static deserializeBinaryFromReader(message: DeleteTweetCommentResponse, reader: jspb.BinaryReader): DeleteTweetCommentResponse;
}

export namespace DeleteTweetCommentResponse {
  export type AsObject = {
    success: boolean,
  }
}

export class CreateTweetCommentRequest extends jspb.Message {
  getTweetId(): number;
  setTweetId(value: number): CreateTweetCommentRequest;

  getContent(): string;
  setContent(value: string): CreateTweetCommentRequest;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): CreateTweetCommentRequest.AsObject;
  static toObject(includeInstance: boolean, msg: CreateTweetCommentRequest): CreateTweetCommentRequest.AsObject;
  static serializeBinaryToWriter(message: CreateTweetCommentRequest, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): CreateTweetCommentRequest;
  static deserializeBinaryFromReader(message: CreateTweetCommentRequest, reader: jspb.BinaryReader): CreateTweetCommentRequest;
}

export namespace CreateTweetCommentRequest {
  export type AsObject = {
    tweetId: number,
    content: string,
  }
}

export class CreateTweetCommentResponse extends jspb.Message {
  getSuccess(): boolean;
  setSuccess(value: boolean): CreateTweetCommentResponse;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): CreateTweetCommentResponse.AsObject;
  static toObject(includeInstance: boolean, msg: CreateTweetCommentResponse): CreateTweetCommentResponse.AsObject;
  static serializeBinaryToWriter(message: CreateTweetCommentResponse, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): CreateTweetCommentResponse;
  static deserializeBinaryFromReader(message: CreateTweetCommentResponse, reader: jspb.BinaryReader): CreateTweetCommentResponse;
}

export namespace CreateTweetCommentResponse {
  export type AsObject = {
    success: boolean,
  }
}

export class GetTweetCommentRequest extends jspb.Message {
  getPage(): number;
  setPage(value: number): GetTweetCommentRequest;

  getLimit(): number;
  setLimit(value: number): GetTweetCommentRequest;

  getTweetId(): number;
  setTweetId(value: number): GetTweetCommentRequest;

  getFilter(): PageFilter;
  setFilter(value: PageFilter): GetTweetCommentRequest;
  hasFilter(): boolean;
  clearFilter(): GetTweetCommentRequest;

  getSort(): PageSort;
  setSort(value: PageSort): GetTweetCommentRequest;
  hasSort(): boolean;
  clearSort(): GetTweetCommentRequest;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): GetTweetCommentRequest.AsObject;
  static toObject(includeInstance: boolean, msg: GetTweetCommentRequest): GetTweetCommentRequest.AsObject;
  static serializeBinaryToWriter(message: GetTweetCommentRequest, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): GetTweetCommentRequest;
  static deserializeBinaryFromReader(message: GetTweetCommentRequest, reader: jspb.BinaryReader): GetTweetCommentRequest;
}

export namespace GetTweetCommentRequest {
  export type AsObject = {
    page: number,
    limit: number,
    tweetId: number,
    filter?: PageFilter,
    sort?: PageSort,
  }

  export enum FilterCase { 
    _FILTER_NOT_SET = 0,
    FILTER = 4,
  }

  export enum SortCase { 
    _SORT_NOT_SET = 0,
    SORT = 5,
  }
}

export class GetTweetCommentsResponse extends jspb.Message {
  getCommentsList(): Array<CommentRecord>;
  setCommentsList(value: Array<CommentRecord>): GetTweetCommentsResponse;
  clearCommentsList(): GetTweetCommentsResponse;
  addComments(value?: CommentRecord, index?: number): CommentRecord;

  getPage(): number;
  setPage(value: number): GetTweetCommentsResponse;

  getLimit(): number;
  setLimit(value: number): GetTweetCommentsResponse;

  getTotal(): number;
  setTotal(value: number): GetTweetCommentsResponse;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): GetTweetCommentsResponse.AsObject;
  static toObject(includeInstance: boolean, msg: GetTweetCommentsResponse): GetTweetCommentsResponse.AsObject;
  static serializeBinaryToWriter(message: GetTweetCommentsResponse, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): GetTweetCommentsResponse;
  static deserializeBinaryFromReader(message: GetTweetCommentsResponse, reader: jspb.BinaryReader): GetTweetCommentsResponse;
}

export namespace GetTweetCommentsResponse {
  export type AsObject = {
    commentsList: Array<CommentRecord.AsObject>,
    page: number,
    limit: number,
    total: number,
  }
}

export class LikeTweetRequest extends jspb.Message {
  getTweetId(): number;
  setTweetId(value: number): LikeTweetRequest;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): LikeTweetRequest.AsObject;
  static toObject(includeInstance: boolean, msg: LikeTweetRequest): LikeTweetRequest.AsObject;
  static serializeBinaryToWriter(message: LikeTweetRequest, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): LikeTweetRequest;
  static deserializeBinaryFromReader(message: LikeTweetRequest, reader: jspb.BinaryReader): LikeTweetRequest;
}

export namespace LikeTweetRequest {
  export type AsObject = {
    tweetId: number,
  }
}

export class LikeTweetResponse extends jspb.Message {
  getSuccess(): boolean;
  setSuccess(value: boolean): LikeTweetResponse;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): LikeTweetResponse.AsObject;
  static toObject(includeInstance: boolean, msg: LikeTweetResponse): LikeTweetResponse.AsObject;
  static serializeBinaryToWriter(message: LikeTweetResponse, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): LikeTweetResponse;
  static deserializeBinaryFromReader(message: LikeTweetResponse, reader: jspb.BinaryReader): LikeTweetResponse;
}

export namespace LikeTweetResponse {
  export type AsObject = {
    success: boolean,
  }
}

export class UnlikeTweetRequest extends jspb.Message {
  getTweetId(): number;
  setTweetId(value: number): UnlikeTweetRequest;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): UnlikeTweetRequest.AsObject;
  static toObject(includeInstance: boolean, msg: UnlikeTweetRequest): UnlikeTweetRequest.AsObject;
  static serializeBinaryToWriter(message: UnlikeTweetRequest, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): UnlikeTweetRequest;
  static deserializeBinaryFromReader(message: UnlikeTweetRequest, reader: jspb.BinaryReader): UnlikeTweetRequest;
}

export namespace UnlikeTweetRequest {
  export type AsObject = {
    tweetId: number,
  }
}

export class UnlikeTweetResponse extends jspb.Message {
  getSuccess(): boolean;
  setSuccess(value: boolean): UnlikeTweetResponse;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): UnlikeTweetResponse.AsObject;
  static toObject(includeInstance: boolean, msg: UnlikeTweetResponse): UnlikeTweetResponse.AsObject;
  static serializeBinaryToWriter(message: UnlikeTweetResponse, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): UnlikeTweetResponse;
  static deserializeBinaryFromReader(message: UnlikeTweetResponse, reader: jspb.BinaryReader): UnlikeTweetResponse;
}

export namespace UnlikeTweetResponse {
  export type AsObject = {
    success: boolean,
  }
}

export class GetAllTweetRequest extends jspb.Message {
  getPage(): number;
  setPage(value: number): GetAllTweetRequest;

  getLimit(): number;
  setLimit(value: number): GetAllTweetRequest;

  getFilter(): PageFilter;
  setFilter(value: PageFilter): GetAllTweetRequest;
  hasFilter(): boolean;
  clearFilter(): GetAllTweetRequest;

  getSort(): PageSort;
  setSort(value: PageSort): GetAllTweetRequest;
  hasSort(): boolean;
  clearSort(): GetAllTweetRequest;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): GetAllTweetRequest.AsObject;
  static toObject(includeInstance: boolean, msg: GetAllTweetRequest): GetAllTweetRequest.AsObject;
  static serializeBinaryToWriter(message: GetAllTweetRequest, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): GetAllTweetRequest;
  static deserializeBinaryFromReader(message: GetAllTweetRequest, reader: jspb.BinaryReader): GetAllTweetRequest;
}

export namespace GetAllTweetRequest {
  export type AsObject = {
    page: number,
    limit: number,
    filter?: PageFilter,
    sort?: PageSort,
  }

  export enum FilterCase { 
    _FILTER_NOT_SET = 0,
    FILTER = 3,
  }

  export enum SortCase { 
    _SORT_NOT_SET = 0,
    SORT = 4,
  }
}

export class GetLoginTweetRequest extends jspb.Message {
  getPage(): number;
  setPage(value: number): GetLoginTweetRequest;

  getLimit(): number;
  setLimit(value: number): GetLoginTweetRequest;

  getFilter(): PageFilter;
  setFilter(value: PageFilter): GetLoginTweetRequest;
  hasFilter(): boolean;
  clearFilter(): GetLoginTweetRequest;

  getSort(): PageSort;
  setSort(value: PageSort): GetLoginTweetRequest;
  hasSort(): boolean;
  clearSort(): GetLoginTweetRequest;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): GetLoginTweetRequest.AsObject;
  static toObject(includeInstance: boolean, msg: GetLoginTweetRequest): GetLoginTweetRequest.AsObject;
  static serializeBinaryToWriter(message: GetLoginTweetRequest, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): GetLoginTweetRequest;
  static deserializeBinaryFromReader(message: GetLoginTweetRequest, reader: jspb.BinaryReader): GetLoginTweetRequest;
}

export namespace GetLoginTweetRequest {
  export type AsObject = {
    page: number,
    limit: number,
    filter?: PageFilter,
    sort?: PageSort,
  }

  export enum FilterCase { 
    _FILTER_NOT_SET = 0,
    FILTER = 3,
  }

  export enum SortCase { 
    _SORT_NOT_SET = 0,
    SORT = 4,
  }
}

export class GetTweetResponse extends jspb.Message {
  getTweetsList(): Array<TweetRecord>;
  setTweetsList(value: Array<TweetRecord>): GetTweetResponse;
  clearTweetsList(): GetTweetResponse;
  addTweets(value?: TweetRecord, index?: number): TweetRecord;

  getPage(): number;
  setPage(value: number): GetTweetResponse;

  getLimit(): number;
  setLimit(value: number): GetTweetResponse;

  getTotal(): number;
  setTotal(value: number): GetTweetResponse;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): GetTweetResponse.AsObject;
  static toObject(includeInstance: boolean, msg: GetTweetResponse): GetTweetResponse.AsObject;
  static serializeBinaryToWriter(message: GetTweetResponse, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): GetTweetResponse;
  static deserializeBinaryFromReader(message: GetTweetResponse, reader: jspb.BinaryReader): GetTweetResponse;
}

export namespace GetTweetResponse {
  export type AsObject = {
    tweetsList: Array<TweetRecord.AsObject>,
    page: number,
    limit: number,
    total: number,
  }
}

export class EditTweetRequest extends jspb.Message {
  getTweetId(): number;
  setTweetId(value: number): EditTweetRequest;

  getTitle(): string;
  setTitle(value: string): EditTweetRequest;

  getContent(): string;
  setContent(value: string): EditTweetRequest;

  getParentId(): number;
  setParentId(value: number): EditTweetRequest;
  hasParentId(): boolean;
  clearParentId(): EditTweetRequest;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): EditTweetRequest.AsObject;
  static toObject(includeInstance: boolean, msg: EditTweetRequest): EditTweetRequest.AsObject;
  static serializeBinaryToWriter(message: EditTweetRequest, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): EditTweetRequest;
  static deserializeBinaryFromReader(message: EditTweetRequest, reader: jspb.BinaryReader): EditTweetRequest;
}

export namespace EditTweetRequest {
  export type AsObject = {
    tweetId: number,
    title: string,
    content: string,
    parentId?: number,
  }

  export enum ParentIdCase { 
    _PARENT_ID_NOT_SET = 0,
    PARENT_ID = 4,
  }
}

export class EditTweetResponse extends jspb.Message {
  getSuccess(): boolean;
  setSuccess(value: boolean): EditTweetResponse;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): EditTweetResponse.AsObject;
  static toObject(includeInstance: boolean, msg: EditTweetResponse): EditTweetResponse.AsObject;
  static serializeBinaryToWriter(message: EditTweetResponse, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): EditTweetResponse;
  static deserializeBinaryFromReader(message: EditTweetResponse, reader: jspb.BinaryReader): EditTweetResponse;
}

export namespace EditTweetResponse {
  export type AsObject = {
    success: boolean,
  }
}

export class DeleteTweetRequest extends jspb.Message {
  getTweetId(): number;
  setTweetId(value: number): DeleteTweetRequest;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): DeleteTweetRequest.AsObject;
  static toObject(includeInstance: boolean, msg: DeleteTweetRequest): DeleteTweetRequest.AsObject;
  static serializeBinaryToWriter(message: DeleteTweetRequest, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): DeleteTweetRequest;
  static deserializeBinaryFromReader(message: DeleteTweetRequest, reader: jspb.BinaryReader): DeleteTweetRequest;
}

export namespace DeleteTweetRequest {
  export type AsObject = {
    tweetId: number,
  }
}

export class DeleteTweetResponse extends jspb.Message {
  getSuccess(): boolean;
  setSuccess(value: boolean): DeleteTweetResponse;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): DeleteTweetResponse.AsObject;
  static toObject(includeInstance: boolean, msg: DeleteTweetResponse): DeleteTweetResponse.AsObject;
  static serializeBinaryToWriter(message: DeleteTweetResponse, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): DeleteTweetResponse;
  static deserializeBinaryFromReader(message: DeleteTweetResponse, reader: jspb.BinaryReader): DeleteTweetResponse;
}

export namespace DeleteTweetResponse {
  export type AsObject = {
    success: boolean,
  }
}

export class FollowRequest extends jspb.Message {
  getUserId(): number;
  setUserId(value: number): FollowRequest;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): FollowRequest.AsObject;
  static toObject(includeInstance: boolean, msg: FollowRequest): FollowRequest.AsObject;
  static serializeBinaryToWriter(message: FollowRequest, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): FollowRequest;
  static deserializeBinaryFromReader(message: FollowRequest, reader: jspb.BinaryReader): FollowRequest;
}

export namespace FollowRequest {
  export type AsObject = {
    userId: number,
  }
}

export class CreateTweetRequest extends jspb.Message {
  getTitle(): string;
  setTitle(value: string): CreateTweetRequest;

  getContent(): string;
  setContent(value: string): CreateTweetRequest;

  getParentId(): number;
  setParentId(value: number): CreateTweetRequest;
  hasParentId(): boolean;
  clearParentId(): CreateTweetRequest;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): CreateTweetRequest.AsObject;
  static toObject(includeInstance: boolean, msg: CreateTweetRequest): CreateTweetRequest.AsObject;
  static serializeBinaryToWriter(message: CreateTweetRequest, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): CreateTweetRequest;
  static deserializeBinaryFromReader(message: CreateTweetRequest, reader: jspb.BinaryReader): CreateTweetRequest;
}

export namespace CreateTweetRequest {
  export type AsObject = {
    title: string,
    content: string,
    parentId?: number,
  }

  export enum ParentIdCase { 
    _PARENT_ID_NOT_SET = 0,
    PARENT_ID = 3,
  }
}

export class CreateTweetResponse extends jspb.Message {
  getSuccess(): boolean;
  setSuccess(value: boolean): CreateTweetResponse;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): CreateTweetResponse.AsObject;
  static toObject(includeInstance: boolean, msg: CreateTweetResponse): CreateTweetResponse.AsObject;
  static serializeBinaryToWriter(message: CreateTweetResponse, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): CreateTweetResponse;
  static deserializeBinaryFromReader(message: CreateTweetResponse, reader: jspb.BinaryReader): CreateTweetResponse;
}

export namespace CreateTweetResponse {
  export type AsObject = {
    success: boolean,
  }
}

export class GetUserRequest extends jspb.Message {
  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): GetUserRequest.AsObject;
  static toObject(includeInstance: boolean, msg: GetUserRequest): GetUserRequest.AsObject;
  static serializeBinaryToWriter(message: GetUserRequest, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): GetUserRequest;
  static deserializeBinaryFromReader(message: GetUserRequest, reader: jspb.BinaryReader): GetUserRequest;
}

export namespace GetUserRequest {
  export type AsObject = {
  }
}

export class UserResponse extends jspb.Message {
  getFirstName(): string;
  setFirstName(value: string): UserResponse;

  getLastName(): string;
  setLastName(value: string): UserResponse;

  getEmail(): string;
  setEmail(value: string): UserResponse;

  getActive(): boolean;
  setActive(value: boolean): UserResponse;

  getFollowers(): number;
  setFollowers(value: number): UserResponse;

  getFollowing(): number;
  setFollowing(value: number): UserResponse;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): UserResponse.AsObject;
  static toObject(includeInstance: boolean, msg: UserResponse): UserResponse.AsObject;
  static serializeBinaryToWriter(message: UserResponse, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): UserResponse;
  static deserializeBinaryFromReader(message: UserResponse, reader: jspb.BinaryReader): UserResponse;
}

export namespace UserResponse {
  export type AsObject = {
    firstName: string,
    lastName: string,
    email: string,
    active: boolean,
    followers: number,
    following: number,
  }
}

export class LogoutUserRequest extends jspb.Message {
  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): LogoutUserRequest.AsObject;
  static toObject(includeInstance: boolean, msg: LogoutUserRequest): LogoutUserRequest.AsObject;
  static serializeBinaryToWriter(message: LogoutUserRequest, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): LogoutUserRequest;
  static deserializeBinaryFromReader(message: LogoutUserRequest, reader: jspb.BinaryReader): LogoutUserRequest;
}

export namespace LogoutUserRequest {
  export type AsObject = {
  }
}

export class LogoutUserResponse extends jspb.Message {
  getSuccess(): boolean;
  setSuccess(value: boolean): LogoutUserResponse;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): LogoutUserResponse.AsObject;
  static toObject(includeInstance: boolean, msg: LogoutUserResponse): LogoutUserResponse.AsObject;
  static serializeBinaryToWriter(message: LogoutUserResponse, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): LogoutUserResponse;
  static deserializeBinaryFromReader(message: LogoutUserResponse, reader: jspb.BinaryReader): LogoutUserResponse;
}

export namespace LogoutUserResponse {
  export type AsObject = {
    success: boolean,
  }
}

export class LoginUserRequest extends jspb.Message {
  getEmail(): string;
  setEmail(value: string): LoginUserRequest;

  getPassword(): string;
  setPassword(value: string): LoginUserRequest;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): LoginUserRequest.AsObject;
  static toObject(includeInstance: boolean, msg: LoginUserRequest): LoginUserRequest.AsObject;
  static serializeBinaryToWriter(message: LoginUserRequest, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): LoginUserRequest;
  static deserializeBinaryFromReader(message: LoginUserRequest, reader: jspb.BinaryReader): LoginUserRequest;
}

export namespace LoginUserRequest {
  export type AsObject = {
    email: string,
    password: string,
  }
}

export class LoginUserResponse extends jspb.Message {
  getSuccess(): boolean;
  setSuccess(value: boolean): LoginUserResponse;

  getToken(): string;
  setToken(value: string): LoginUserResponse;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): LoginUserResponse.AsObject;
  static toObject(includeInstance: boolean, msg: LoginUserResponse): LoginUserResponse.AsObject;
  static serializeBinaryToWriter(message: LoginUserResponse, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): LoginUserResponse;
  static deserializeBinaryFromReader(message: LoginUserResponse, reader: jspb.BinaryReader): LoginUserResponse;
}

export namespace LoginUserResponse {
  export type AsObject = {
    success: boolean,
    token: string,
  }
}

export class RegisterUserRequest extends jspb.Message {
  getEmail(): string;
  setEmail(value: string): RegisterUserRequest;

  getPassword(): string;
  setPassword(value: string): RegisterUserRequest;

  getFirstName(): string;
  setFirstName(value: string): RegisterUserRequest;

  getLastName(): string;
  setLastName(value: string): RegisterUserRequest;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): RegisterUserRequest.AsObject;
  static toObject(includeInstance: boolean, msg: RegisterUserRequest): RegisterUserRequest.AsObject;
  static serializeBinaryToWriter(message: RegisterUserRequest, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): RegisterUserRequest;
  static deserializeBinaryFromReader(message: RegisterUserRequest, reader: jspb.BinaryReader): RegisterUserRequest;
}

export namespace RegisterUserRequest {
  export type AsObject = {
    email: string,
    password: string,
    firstName: string,
    lastName: string,
  }
}

export class RegisterUserResponse extends jspb.Message {
  getSuccess(): boolean;
  setSuccess(value: boolean): RegisterUserResponse;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): RegisterUserResponse.AsObject;
  static toObject(includeInstance: boolean, msg: RegisterUserResponse): RegisterUserResponse.AsObject;
  static serializeBinaryToWriter(message: RegisterUserResponse, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): RegisterUserResponse;
  static deserializeBinaryFromReader(message: RegisterUserResponse, reader: jspb.BinaryReader): RegisterUserResponse;
}

export namespace RegisterUserResponse {
  export type AsObject = {
    success: boolean,
  }
}

export class TweetRecord extends jspb.Message {
  getId(): number;
  setId(value: number): TweetRecord;

  getContent(): string;
  setContent(value: string): TweetRecord;

  getTitle(): string;
  setTitle(value: string): TweetRecord;

  getUserId(): number;
  setUserId(value: number): TweetRecord;

  getCreatedAt(): google_protobuf_timestamp_pb.Timestamp | undefined;
  setCreatedAt(value?: google_protobuf_timestamp_pb.Timestamp): TweetRecord;
  hasCreatedAt(): boolean;
  clearCreatedAt(): TweetRecord;

  getUpdatedAt(): google_protobuf_timestamp_pb.Timestamp | undefined;
  setUpdatedAt(value?: google_protobuf_timestamp_pb.Timestamp): TweetRecord;
  hasUpdatedAt(): boolean;
  clearUpdatedAt(): TweetRecord;

  getParentId(): number;
  setParentId(value: number): TweetRecord;
  hasParentId(): boolean;
  clearParentId(): TweetRecord;

  getLikes(): number;
  setLikes(value: number): TweetRecord;

  getComments(): number;
  setComments(value: number): TweetRecord;

  getLiked(): boolean;
  setLiked(value: boolean): TweetRecord;
  hasLiked(): boolean;
  clearLiked(): TweetRecord;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): TweetRecord.AsObject;
  static toObject(includeInstance: boolean, msg: TweetRecord): TweetRecord.AsObject;
  static serializeBinaryToWriter(message: TweetRecord, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): TweetRecord;
  static deserializeBinaryFromReader(message: TweetRecord, reader: jspb.BinaryReader): TweetRecord;
}

export namespace TweetRecord {
  export type AsObject = {
    id: number,
    content: string,
    title: string,
    userId: number,
    createdAt?: google_protobuf_timestamp_pb.Timestamp.AsObject,
    updatedAt?: google_protobuf_timestamp_pb.Timestamp.AsObject,
    parentId?: number,
    likes: number,
    comments: number,
    liked?: boolean,
  }

  export enum ParentIdCase { 
    _PARENT_ID_NOT_SET = 0,
    PARENT_ID = 7,
  }

  export enum LikedCase { 
    _LIKED_NOT_SET = 0,
    LIKED = 10,
  }
}

export class CommentRecord extends jspb.Message {
  getId(): number;
  setId(value: number): CommentRecord;

  getContent(): string;
  setContent(value: string): CommentRecord;

  getTweetId(): number;
  setTweetId(value: number): CommentRecord;

  getLikes(): number;
  setLikes(value: number): CommentRecord;

  getCreatedAt(): google_protobuf_timestamp_pb.Timestamp | undefined;
  setCreatedAt(value?: google_protobuf_timestamp_pb.Timestamp): CommentRecord;
  hasCreatedAt(): boolean;
  clearCreatedAt(): CommentRecord;

  getUpdatedAt(): google_protobuf_timestamp_pb.Timestamp | undefined;
  setUpdatedAt(value?: google_protobuf_timestamp_pb.Timestamp): CommentRecord;
  hasUpdatedAt(): boolean;
  clearUpdatedAt(): CommentRecord;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): CommentRecord.AsObject;
  static toObject(includeInstance: boolean, msg: CommentRecord): CommentRecord.AsObject;
  static serializeBinaryToWriter(message: CommentRecord, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): CommentRecord;
  static deserializeBinaryFromReader(message: CommentRecord, reader: jspb.BinaryReader): CommentRecord;
}

export namespace CommentRecord {
  export type AsObject = {
    id: number,
    content: string,
    tweetId: number,
    likes: number,
    createdAt?: google_protobuf_timestamp_pb.Timestamp.AsObject,
    updatedAt?: google_protobuf_timestamp_pb.Timestamp.AsObject,
  }
}

export enum PageSort { 
  SORT_CREATED_AT = 0,
  SORT_UPDATED_AT = 1,
}
export enum PageFilter { 
  FILTER_CREATED_AT = 0,
  FILTER_UPDATED_AT = 1,
}
