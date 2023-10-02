import { atom, selector } from "recoil";
import { recoilPersist } from "recoil-persist";

const { persistAtom } = recoilPersist({
  key: "recoil-persist",
  storage: localStorage,
});

export interface IToDo {
  text: string;
  id: number;
}

export const categoryState = atom<string>({
  key: "category",
  default: "TO_DO",
});

export const toDoState = atom<{ [key: string]: IToDo[] }>({
  key: "toDo",
  default: {
    TO_DO: [],
    DOING: [],
    DONE: [],
  },
  effects_UNSTABLE: [persistAtom],
});

export const toDoSelector = selector({
  key: "toDoSelector",
  get: ({ get }) => {
    const toDos = get(toDoState);
    const category = get(categoryState);
    return toDos[category];
  },
});
