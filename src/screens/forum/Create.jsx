import { useMutation } from "react-query";
import { createPostAPI } from "../../services/post";
import { toast } from "react-toastify";

import { Controller, useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";

import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";

const Create = () => {
  const navigate = useNavigate();
  const { mutate, isLoading } = useMutation((post) => createPostAPI(post), {
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

  const { handleSubmit, control } = useForm();

  const onSubmit = (post) => {
    mutate({
      ...post,
      userId: "",
      date: "",
    });
  };

  return (
    <div className="max-w-7xl mx-auto my-4  rounded-md">
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="flex flex-col lg:flex-row">
          <Controller
            name="content"
            control={control}
            render={({ field }) => (
              <ReactQuill
                theme="snow"
                value={field.value}
                onChange={field.onChange}
                className="border p-4  lg:w-3/4"
              />
            )}
          />
          <div className="flex flex-col p-4 ">
            <Controller
              name="title"
              control={control}
              rules={{ required: true }}
              render={({ field }) => (
                <div className="flex flex-col">
                  <label htmlFor="title">Titulo</label>
                  <input
                    className="input"
                    type="text"
                    id="title"
                    name="title"
                    {...field}
                  />
                </div>
              )}
            />
            <button disabled={isLoading} type="submit" className="btn my-0">
              {isLoading ? "Creando..." : "Crear"}
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default Create;
