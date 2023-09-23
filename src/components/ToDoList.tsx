import { useState } from "react";
import { useForm } from "react-hook-form";

interface IForm {
  Email: string;
  First_Name: string;
  Last_Name: string;
  User_Name: string;
  Password: string;
  Confirmation: string;
  extraError?: string;
}

// function TodoList() {
//   const [todo, setTodo] = useState("");
//   const [todoError, setTodoError] = useState("");
//   const onChange = (event: React.FormEvent<HTMLInputElement>) => {
//     const {
//       currentTarget: { value },
//     } = event;
//     setTodoError("");
//     setTodo(value);
//   };
//   const onSubmit = (event: React.FormEvent<HTMLFormElement>) => {
//     event.preventDefault();
//     if (todo.length < 10) {
//       return setTodoError("To do should be longer");
//     }
//     console.log("submit");
//   };
//   return (
//     <div>
//       <form onSubmit={onSubmit}>
//         <input value={todo} onChange={onChange} placeholder="Write a ato do" />
//         <button>Add</button>
//         {todoError !== "" ? todoError : null}
//       </form>
//     </div>
//   );
// }

function TodoList() {
  const {
    register,
    handleSubmit,
    formState: { errors },
    setError,
  } = useForm<IForm>({
    defaultValues: {
      Email: "@naver.com",
    },
  });
  const onValid = (data: IForm) => {
    if (data.Password !== data.Confirmation) {
      setError(
        "Confirmation",
        { message: "Password are not the same" },
        { shouldFocus: true }
      );
    }
    setError("extraError", { message: "Server offLine" });
  };
  console.log(errors);
  return (
    <div>
      <h1>To Dos</h1>
      <hr />
      <form onSubmit={handleSubmit(onValid)}>
        <input
          {...register("Email", {
            required: "Email is required",
          })}
          placeholder="Email"
        />
        <span>{errors?.Email?.message}</span>
        <input
          {...register("First_Name", {
            required: "Write here",
            validate: {
              noNico: (value) =>
                !value.includes("nico") ? "no nicos allowed" : true,
              noNick: (value) =>
                !value.includes("nick") ? "no nicks allowed" : true,
            },
          })}
          placeholder="First Namel"
        />
        <span>{errors?.First_Name?.message}</span>
        <input
          {...register("Last_Name", { required: "Write here" })}
          placeholder="Last Name"
        />
        <span>{errors?.Last_Name?.message}</span>
        <input
          {...register("User_Name", { required: "Write here", minLength: 10 })}
          placeholder="User Name"
        />
        <span>{errors?.User_Name?.message}</span>
        <input
          {...register("Password", {
            required: "Password is required",
            minLength: 5,
          })}
          placeholder="Password"
        />
        <span>{errors?.Password?.message}</span>
        <input
          {...register("Confirmation", {
            required: "Write here",
            minLength: { value: 5, message: "Your password is too short." },
          })}
          placeholder="Confirmation"
        />
        <span>{errors?.Confirmation?.message}</span>
        <button>Add</button>
        {errors?.extraError?.message}
      </form>
    </div>
  );
}

export default TodoList;
