import IComment from './IComment.ts';

export default interface ITweet {
  id: string;
  userId: string;
  userName: string;
  tweet: string;
  createdAt: number;
  photo?: string;
  liked?: string[];
  comments?: IComment[];
}
