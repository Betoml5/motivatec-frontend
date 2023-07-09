import { useMutation } from "react-query";
import { createPostAPI } from "../../services/post";
import { toast } from "react-toastify";

import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";

const Create = () => {
  const navigate = useNavigate();
  const { mutate } = useMutation((post) => createPostAPI(post), {
    onSettled: (data, error) => {
      if (error) {
        toast.error("Error al crear los cambios");
      }
      if (data) {
        toast.success("Post creado");
        navigate("/forum");
      }
    },
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = (post) => {
    mutate({
      ...post,
      userId: "",
      date: "",
    });
  };

  return (
    <div className="max-w-6xl mx-auto p-4">
      <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col">
        <h1 className="text-2xl ">Crear Post</h1>
        <input
          className="input"
          type="text"
          name="title"
          placeholder="Titulo"
          {...register("title", { required: true })}
        ></input>
        {errors.title && (
          <span className="text-red-500 text-sm">
            El titulo no puede estar vacio
          </span>
        )}
        <textarea
          placeholder="Yo pienso que..."
          name="content"
          id="content"
          cols="30"
          rows="20"
          className="input"
          {...register("content", { required: true })}
        ></textarea>
        {errors.content && (
          <span className="text-red-500 text-sm">
            El contenido no puede estar vacio
          </span>
        )}
        <button className="btn">Crear</button>
      </form>
    </div>
  );
};

export default Create;
