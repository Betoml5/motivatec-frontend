import { useQuery } from "react-query";
import { getGroupsAPI } from "../../services/group";
import { useState } from "react";

const Survey = () => {
  const { data: groups, isLoading, error } = useQuery("groups", getGroupsAPI);
  const [copied, setCopied] = useState(false);
  const [groupId, setGroupId] = useState("");

  const copyToClipboard = async (e) => {
    e.preventDefault();
    try {
      await navigator.clipboard.writeText(
        `http://127.0.0.1:5173/survey?groupId=${groupId}&teacherId=1`
      );
      setCopied(true);
    } catch (error) {
      console.error("Error al copiar al portapapeles:", error);
    }
  };

  return (
    <div className="max-w-2xl mx-auto m-4 p-4 shadow-xl">
      <form className="flex flex-col">
        <label className="label" htmlFor="groupId">
          Grupo
        </label>
        <select
          onChange={(e) => setGroupId(e.target.value)}
          className="input"
          name="groupId"
          id="groupId"
        >
          <option value="" selected disabled>
            Selecciona un grupo
          </option>
          {isLoading ? (
            <option>Cargando...</option>
          ) : error ? (
            <option>Error al cargar los grupos</option>
          ) : (
            groups?.map((group) => (
              <option key={group.id} value={group.id}>
                {group.name}
              </option>
            ))
          )}
        </select>
        {copied && <p>¡Copiado al portapapeles!</p>}
        <button type="submit" onClick={copyToClipboard} className="btn">
          Copiar enlace
        </button>
      </form>
    </div>
  );
};

export default Survey;
