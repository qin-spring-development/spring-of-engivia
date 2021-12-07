import { EngiviaType } from "src/types/interface";

export const initialBroadcastInfo = {
  broadCastUrl: "",
  broadCastingDate: new Date().toISOString(),
  engiviaCount: 0,
  id: "",
  status: "",
  title: "",
};

export const initialEngiviaInfo: EngiviaType = {
  body: "",
  createdAt: new Date().toISOString(),
  engiviaNumber: 0,
  featureStatus: "BEFORE",
  id: "",
  joinUsersCount: 0,
  postUser: {
    image: "",
    name: "",
    id: "",
  },
  totalLikes: 0,
};
