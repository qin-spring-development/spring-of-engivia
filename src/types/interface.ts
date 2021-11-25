export type UserType = {
  email: string;
  image: string;
  isAdmin: boolean;
  name: string;
  provider: string;
  uid: string;
};
export type PostUserType = {
  image: string;
  name: string;
  uid: string;
};
export type JoinUserType = {
  likes: number;
  name: string;
  image: string;
  uid: string;
};

export type featureStatusType = "BEFORE" | "IN_FEATURE" | "DONE";

export type EngiviaType = {
  body: string;
  createdAt: string;
  engiviaNumber: number;
  featureStatus: featureStatusType;
  id: string;
  postUser: PostUserType;
  totalLikes: number;
};

export type BroadcastType = {
  broadCastUrl: string;
  broadCastingDate: string;
  engiviaCount: number;
  featureCount: number;
  featureId: string;
  id: string;
  status: string;
  title: string;
};
export type WithOutToken = {
  email: string | null;
  name: string | null;
  photoURL: string | undefined;
  provider: string | undefined;
  uid: string;
};
export type Broadcast = {
  broadCastUrl: string;
  broadCastingDate: string;
  engiviaCount: number;
  featureID: string;
  id: string;
  status: string;
  title: string;
};
export type BroadcastFormType = {
  title: string;
  broadCastingDate: string;
};
