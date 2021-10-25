import { TimestampType } from "src/lib/firebase";

export interface EngiviaType {
  postUser: {
    name?: string;
    photoUrl: string;
    uid: string;
  };
  body: string;
  createdAt: TimestampType;
  featureStatus: string;
  id: string;
  likes: number;
}

export interface BroadcastType {
  broadCastUrl: string;
  broadCastingDate: TimestampType;
  engiviaCount: number;
  id: string;
  status: string;
  title: string;
}
