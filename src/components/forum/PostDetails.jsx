import { useMutation, useQuery } from "react-query";
import { useParams } from "react-router-dom";
import { useState } from "react";
import { getPostAPI } from "../../services/post";
import { calculateTimeSinceCreation } from "../../utils/dates";

import Spinner from "../../screens/loading/Spinner";
import Modal from "../shared/Modal";
import Comments from "../../containers/forum/Comments";

import { PiStudentThin } from "react-icons/pi";
import { AiOutlineClockCircle } from "react-icons/ai";

import ReactQuill from "react-quill";
import "react-quill/dist/quill.bubble.css";
import { createCommentAPI } from "../../services/comment";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";

const PostDetails = () => {
  const { id } = useParams();
  const [showComments, setShowComments] = useState(false);
  const [showCreateComment, setShowCreateComment] = useState(false);
  const {
    data: post,
    isLoading,
    error,
    refetch,
  } = useQuery("post", () => getPostAPI(id));
  const { mutate: createComment, isLoading: isCreatingComment } = useMutation(
    "createComment",
    (comment) => createCommentAPI(comment),
    {
      onSuccess: () => {
        refetch();
      },
      onError: () => {
        toast.error("Error al crear el comentario");
      },
    }
  );
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = (data) => {
    createComment({
      content: data.content,
      postId: post.id,
    });
    setShowCreateComment(false);
  };

  if (isLoading) return <Spinner />;
  if (error) return <div>Something went wrong</div>;

  return (
    <div className="relative">
      <div className="flex flex-col justify-center w-full h-60 -z-50 bg-blog bg-cover p-4 lg:p-10">
        <h1 className=" bottom-10 left-5 text-white font-semibold text-3xl ">
          {post.title}
        </h1>
        <div className="flex items-center mt-6">
          <div className="bg-white shadow-md rounded-full w-fit p-2 mr-2">
            <PiStudentThin size={20} />
          </div>
          <p className="text-white">{post.user.entity.name}</p>

          <div className="post__user-date-time text-white">
            <AiOutlineClockCircle className="mx-2" size={15} />
            <p>Hace {calculateTimeSinceCreation(post.date)} </p>
          </div>
        </div>
      </div>
      <div className=" text-lg max-w-4xl mx-2  mt-6 mb-10 leading-8  md:mx-auto">
        <ReactQuill
          className="bg-white p-4 rounded-md"
          value={post.content}
          readOnly={true}
          theme={"bubble"}
        />
        <Modal show={showComments} setShow={setShowComments}>
          <div className="relative bg-white w-full max-w-7xl mx-2 rounded-md">
            {post.comments.length > 0 ? (
              <Comments comments={post.comments} />
            ) : (
              <div className="text-center p-4">
                <p className=" text-gray-500  ">No hay comentarios</p>
                <button
                  onClick={() => {
                    setShowComments(false);
                    setShowCreateComment(true);
                  }}
                  className="underline text-blue-500"
                >
                  Hacer uno
                </button>
              </div>
            )}
          </div>
        </Modal>

        <Modal show={showCreateComment} setShow={setShowCreateComment}>
          <form
            onSubmit={handleSubmit(onSubmit)}
            className="flex flex-col mx-2 w-full max-w-2xl  p-4 bg-white rounded-md"
          >
            <label className="label" htmlFor="content">
              Hacer comentario
            </label>
            <textarea
              {...register("content", { required: true })}
              className="input h-56"
              id="content"
            ></textarea>
            {errors.content && (
              <span className="text-red-500">Este campo es requerido</span>
            )}
            <button className="btn">
              {isCreatingComment ? "Enviando..." : "Crear comentario"}
            </button>
          </form>
        </Modal>

        <button
          onClick={() => setShowComments(!showComments)}
          className="text-right text-blue-500 text-sm hover:underline"
        >
          Ver comentarios
        </button>
      </div>
    </div>
  );
};

export default PostDetails;
