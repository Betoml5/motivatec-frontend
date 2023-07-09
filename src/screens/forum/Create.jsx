import { useMutation } from "react-query";
import { createPostAPI } from "../../services/post";
import { toast } from "react-toastify";

import { Controller, useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";

import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";

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
    handleSubmit,
    formState: { errors },
    control,
  } = useForm();

  const onSubmit = (post) => {
    mutate({
      ...post,
      userId: "",
      date: "",
    });
  };

  return (
    <div className="max-w-6xl m-4 mr-auto  border border-red-500">
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="flex flex-col  lg:flex-row">
          <Controller
            name="content"
            control={control}
            render={({ field }) => (
              <ReactQuill value={field.value} onChange={field.onChange} />
            )}
          />
          <div className="flex flex-col p-4 ">
            <label htmlFor="title">Titulo</label>
            <input className="input" type="text" id="title" name="title" />
          </div>
        </div>

        <button className="btn mx-2">Crear post</button>
      </form>
    </div>
  );
};

export default Create;
