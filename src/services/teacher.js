import { UserClient } from "./axios/index.js";

export const getTeachersAPI = async () => {
  try {
    const response = await UserClient.get("/teacher");
    return response.data.body;
  } catch (error) {
    throw new Error(error);
  }
};

export const getTeacherAPI = async (id) => {
  try {
    const response = await UserClient.get(`/teacher/${id}`);
    return response.data.body;
  } catch (error) {
    throw new Error(error);
  }
};

export const createTeacherAPI = async (teacherData) => {
  try {
    const response = await UserClient.post("/teacher", {
      teacher: teacherData,
    });
    return response.data;
  } catch (error) {
    throw new Error(error);
  }
};

export const updateTeacherAPI = async (id, teacherData) => {
  try {
    const response = await UserClient.put(`/teacher/${id}`, {
      teacher: teacherData,
    });
    return response.data;
  } catch (error) {
    throw new Error(error);
  }
};

export const deleteTeacherAPI = async (id) => {
  try {
    const response = await UserClient.delete(`/teacher/${id}`);
    return response.data;
  } catch (error) {
    throw new Error(error);
  }
};

export const deleteManyTeachersAPI = async (ids) => {
  try {
    const response = await UserClient.delete("/teacher", {
      data: {
        ids: ids,
      },
    });

    if (response.status !== 200) throw new Error("Error");

    return response.data;
  } catch (error) {
    throw new Error(error);
  }
};
