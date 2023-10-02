import { useForm } from "react-hook-form";
import { useSetRecoilState } from "recoil";
import { toDoState } from "../atoms";

interface IForm {
  category: string;
}

const CreateCategory = () => {
  const { register, handleSubmit, setValue } = useForm<IForm>();
  const setToDoState = useSetRecoilState(toDoState);
  const onValid = handleSubmit(({ category }: IForm) => {
    setToDoState((prev) => ({
      ...prev,
      [category]: [],
    }));
    setValue("category", "");
  });

  return (
    <form onSubmit={onValid}>
      <input
        {...register("category", {
          required: "Write a category",
        })}
        placeholder="Write a category"
      />
      <button type="submit">추가</button>
    </form>
  );
};

export default CreateCategory;
