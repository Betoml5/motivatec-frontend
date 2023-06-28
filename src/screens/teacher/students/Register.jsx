import { useState } from "react";
import { useQuery } from "react-query";
import { getGroupsAPI } from "../../../services/group";

const Register = () => {
  const { data: groups, error, isLoading } = useQuery("groups", getGroupsAPI);

  const [student, setStudent] = useState({
    name: "",
    lastName: "",
    controlNumber: "",
    groupId: "",
  });

  const onChange = (event) => {
    const { name, value } = event.target;
    setStudent({ ...student, [name]: value });
  };

  const onSubmit = (event) => {
    event.preventDefault();
    console.log("submit");
  };

  return (
    <div className="p-4">
      <form id="form__student" className="form__student">
        <label className="label" htmlFor="name">
          Nombre
        </label>
        <input
          className="input"
          id="name"
          type="text"
          placeholder="Nombre"
          name="name"
          onChange={onChange}
        ></input>
        <label className="label" htmlFor="lastName">
          Apellidos
        </label>
        <input
          className="input"
          id="lastName"
          type="text"
          name="lastName"
          placeholder="Apellidos"
          onChange={onChange}
        ></input>
        <label className="label" htmlFor="controlNumber">
          Numero de control
        </label>
        <input
          className="input"
          id="controlNumber"
          type="text"
          name="controlNumber"
          placeholder="Numero de control"
          onChange={onChange}
        ></input>
        <label className="label" htmlFor="group">
          Grupo
        </label>

        {isLoading ? (
          <p>Cargando...</p>
        ) : error ? (
          <p>Error al cargar los grupos</p>
        ) : (
          <select
            onChange={onChange}
            className="input"
            id="groupId"
            type="text"
            name="groupId"
            placeholder="Grupo"
          >
            <option value="" disabled selected>
              Selecciona un grupo
            </option>
            {groups?.map((group) => (
              <option key={group.id} value={group.id}>
                {group.name}
              </option>
            ))}
          </select>
        )}

        <button onClick={onSubmit} className="btn" type="submit">
          Registrar
        </button>
      </form>
    </div>
  );
};

export default Register;
