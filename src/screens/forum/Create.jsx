import { useMutation } from "react-query";
import { createPostAPI } from "../../services/post";
import { useState } from "react";
import { DateTime } from "luxon";

const Create = () => {
  const { mutate, isError, isLoading, error } = useMutation(createPostAPI);
  const [post, setPost] = useState({
    title: "",
    content: "",
    date: DateTime.now().toFormat("dd-MM-yyyy HH:mm:ss"),
    userId: "",
  });
  const handleSubmit = (e) => {
    e.preventDefault();
    mutate({
      post: post,
    });
  };

  const onChange = (e) => {
    setPost({ ...post, [e.target.name]: e.target.value });
  };

  return (
    <div className="max-w-6xl mx-auto p-4">
      <form onSubmit={handleSubmit} className="flex flex-col">
        <h1 className="text-2xl ">Crear Post</h1>
        <input
          className="input"
          type="text"
          name="title"
          placeholder="Titulo"
          onChange={onChange}
        ></input>
        <textarea
          placeholder="Yo pienso que..."
          name="content"
          id="content"
          cols="30"
          rows="20"
          className="input"
          onChange={onChange}
        ></textarea>
        <button className="btn">Crear</button>
        {isLoading && <p>Cargando...</p>}
        {isError && <p>Error: {error.message}</p>}
      </form>
    </div>
  );
};

export default Create;
