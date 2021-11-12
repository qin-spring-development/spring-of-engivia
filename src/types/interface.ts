export interface UserType {
  name: string;
  photoUrl: string;
  uid: string;
}
export interface JoinUserType {
  likes: number;
  name: string;
  photoUrl: string;
  uid: string;
}
export interface EngiviaType {
  body: string;
  createdAt: string;
  engiviaNumber: number;
  featureStatus: string;
  id: string;
  joinUsers: JoinUserType[];
  postUser: UserType;
  totalLikes: number;
}

export interface BroadcastType {
  broadCastUrl: string;
  broadCastingDate: string;
  engiviaCount: number;
  featureCount: number;
  featureId: string;
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
export interface BroadcastFormType {
  date: string;
  title: string;
}
