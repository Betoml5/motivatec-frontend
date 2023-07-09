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
    <div className="max-w-6xl mx-auto my-2 bg-white">
      
      <form onSubmit={handleSubmit(onSubmit)}>
        <Controller
          name="content"
          control={control}
          render={({ field }) => (
            <ReactQuill
              value={field.value}
              onChange={field.onChange}
              className="h-full"
            />
          )}
        />
      </form>
    </div>
  );
};

export default Create;
