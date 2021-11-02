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
  broadCastingDate: string;
  engiviaCount: number;
  id: string;
  status: string;
  title: string;
}
export interface WithOutToken {
  email: string | null;
  name: string | null;
  photoURL: string | undefined;
  provider: string | undefined;
  uid: string;
}

export interface Broadcast {
  broadCastUrl: string;
  broadCastingDate: string;
  engiviaCount: number;
  featureID: string;
  id: string;
  status: string;
  title: string;
}
