export type PostUserType = {
  image: string;
  name: string;
  id: string;
};
export type JoinUserType = {
  likes: number;
  name: string;
  image: string;
  id: string;
};

export type featureStatusType = "BEFORE" | "IN_FEATURE" | "DONE";

export type EngiviaType = {
  body: string;
  createdAt: string;
  engiviaNumber: number | null;
  featureStatus: featureStatusType;
  id: string;
  postUser: PostUserType;
  totalLikes: number;
  joinUsersCount: number;
};

export type BroadcastType = {
  broadCastUrl: string;
  broadCastingDate: string;
  engiviaCount: number;
  engiviaCurrentCount: number | null;
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
  id: string;
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
