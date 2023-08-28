import useUser from "../../hooks/useUser";
import Spinner from "../loading/Spinner";
import Modal from "../../components/shared/Modal";
import { PiStudentThin } from "react-icons/pi";
import { useState } from "react";
import { useForm } from "react-hook-form";
const Settings = () => {
  const { user } = useUser();
  const [show, setShow] = useState(false);
  const { changePassword, isPasswordLoading } = useUser();

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();

  const onSubmit = (data) => {
    if (window.confirm("¿Estás seguro de cambiar la contraseña?"))
      changePassword(data);
    reset();
    setShow(false);
  };

  if (!user) return <Spinner />;

  return (
    <div className="max-w-xl mx-auto  my-4">
      <Modal show={show} setShow={setShow}>
        <div className="p-4 bg-white rounded-md w-full max-w-xl">
          <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col">
            <label htmlFor="oldpassword" className="label">
              Contraseña actual
            </label>
            <input
              type="password"
              name="oldpassword"
              id="oldpassword"
              className="input"
              {...register("oldPassword", {
                required: true,
              })}
            />
            {errors.oldPassword && (
              <span className="text-red-500 text-sm">
                Este campo es requerido
              </span>
            )}
            <label htmlFor="newpassword" className="label">
              Nueva contraseña
            </label>
            <input
              type="password"
              name="newpassword"
              id="newpassword"
              className="input"
              {...register("newPassword", {
                required: true,
              })}
            />
            {errors.newPassword && (
              <span className="text-red-500 text-sm">
                Este campo es requerido
              </span>
            )}
            <button className="btn">
              <span>
                {isPasswordLoading ? "Cargando..." : "Cambiar contraseña"}
              </span>
            </button>
          </form>
        </div>
      </Modal>
      <div className="flex flex-col  p-4 py-20 bg-white mx-4 rounded-md ">
        <div className="w-20 h-20 shadow rounded-full p-2 self-center">
          <PiStudentThin size={50} className="w-full h-full" />
        </div>

        <p className="font-semibold self-center my-2">
          {user.name} {user.lastName}
        </p>

        <p className="font-semibold text-center">{user.user.email}</p>
        <button
          onClick={() => setShow(true)}
          className="text-center text-blue-500 underline mt-4"
        >
          <span>Cambiar contraseña </span>
        </button>
      </div>
    </div>
  );
};

export default Settings;
