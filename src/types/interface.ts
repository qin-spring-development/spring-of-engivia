export interface EngiviaType {
  postUser: {
    name?: string;
    photoUrl: string;
    uid: string;
  };
  body: string;
  createdAt: any;
  featureStatus: string;
  id: string;
  totalLikes: number;
}

export interface BroadcastType {
  broadCastUrl: string;
  broadCastingDate: any;
  engiviaCount: number;
  id: string;
  status: string;
  title: string;
}
