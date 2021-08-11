import { ModelInit, MutableModel, PersistentModelConstructor } from "@aws-amplify/datastore";





type CommentMetaData = {
  readOnlyFields: 'createdAt' | 'updatedAt';
}

type UserMetaData = {
  readOnlyFields: 'createdAt' | 'updatedAt';
}

type VideoMetaData = {
  readOnlyFields: 'createdAt' | 'updatedAt';
}

export declare class Comment {
  readonly id: string;
  readonly comment: string;
  readonly likes: number;
  readonly dislikes: number;
  readonly replies: number;
  readonly videoID?: string;
  readonly User?: User;
  readonly Video?: Video;
  readonly userID?: string;
  readonly createdAt?: string;
  readonly updatedAt?: string;
  constructor(init: ModelInit<Comment, CommentMetaData>);
  static copyOf(source: Comment, mutator: (draft: MutableModel<Comment, CommentMetaData>) => MutableModel<Comment, CommentMetaData> | void): Comment;
}

export declare class User {
  readonly id: string;
  readonly name: string;
  readonly image?: string;
  readonly subscribers?: number;
  readonly Videos?: (Video | null)[];
  readonly Comments?: (Comment | null)[];
  readonly sub?: string;
  readonly createdAt?: string;
  readonly updatedAt?: string;
  constructor(init: ModelInit<User, UserMetaData>);
  static copyOf(source: User, mutator: (draft: MutableModel<User, UserMetaData>) => MutableModel<User, UserMetaData> | void): User;
}

export declare class Video {
  readonly id: string;
  readonly title: string;
  readonly thumbnail: string;
  readonly videoUrl: string;
  readonly duration: number;
  readonly views: number;
  readonly tags?: string;
  readonly likes: number;
  readonly dislikes: number;
  readonly User?: User;
  readonly Comments?: (Comment | null)[];
  readonly userID?: string;
  readonly createdAt?: string;
  readonly updatedAt?: string;
  constructor(init: ModelInit<Video, VideoMetaData>);
  static copyOf(source: Video, mutator: (draft: MutableModel<Video, VideoMetaData>) => MutableModel<Video, VideoMetaData> | void): Video;
}