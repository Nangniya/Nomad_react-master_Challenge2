import { atom, selector } from "recoil";

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
});

export const toDoSelector = selector({
  key: "toDoSelector",
  get: ({ get }) => {
    const toDos = get(toDoState);
    const category = get(categoryState);
    return toDos[category];
  },
});
