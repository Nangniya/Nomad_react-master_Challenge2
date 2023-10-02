import React from "react";
import { useRecoilState, useRecoilValue } from "recoil";
import { IToDo, categoryState, toDoState } from "../atoms";

function ToDo({ text, id }: IToDo) {
  const categories = useRecoilValue(toDoState);
  const currentCategory = useRecoilValue(categoryState);
  const [toDos, setToDos] = useRecoilState(toDoState);
  const onClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    const {
      currentTarget: { name },
    } = event;
    setToDos((prevToDos) => {
      return {
        ...prevToDos,
        [currentCategory]: prevToDos[currentCategory].filter(
          (toDo) => toDo.id !== id
        ),
        [name]: [...(prevToDos[name] || []), { text, id }],
      };
    });
  };
  return (
    <li>
      <span>{text}</span>
      {Object.keys(categories).map(
        (category) =>
          category !== currentCategory && (
            <button key={category} onClick={onClick} name={category}>
              {category}
            </button>
          )
      )}
    </li>
  );
}

export default ToDo;
