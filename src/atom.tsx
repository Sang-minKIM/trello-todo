import { atom } from "recoil";

import { recoilPersist } from "recoil-persist";

const { persistAtom } = recoilPersist({
  storage: localStorage,
});

interface ITodo {
  id: number;
  text: string;
}

interface IToDoState {
  [key: string]: ITodo[];
}

export const toDoState = atom<IToDoState>({
  key: "boards",
  default: {
    "To Do": [],
    Doing: [],
    Done: [],
  },
  effects_UNSTABLE: [persistAtom],
});

export const newBoardState = atom<string | null>({
  key: "new",
  default: null,
});
