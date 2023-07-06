import { UserClient } from "./axios/index.js";

export const getStudentsAPI = async () => {
  try {
    const response = await UserClient.get("/student");
    return response.data.body;
  } catch (error) {
    throw new Error(error);
  }
};

export const getStudentAPI = async (id) => {
  try {
    const response = await UserClient.get(`/student/${id}`);
    return response.data.body;
  } catch (error) {
    throw new Error(error);
  }
};

export const createStudentAPI = async (studentData) => {
  try {
    console.log(studentData);
    const response = await UserClient.post("/student", {
      student: studentData,
    });
    return response.data;
  } catch (error) {
    throw new Error(error);
  }
};

export const updateStudentAPI = async (id, studentData) => {
  try {
    const response = await UserClient.put(`/student/${id}`, {
      student: studentData,
    });
    return response.data;
  } catch (error) {
    throw new Error(error);
  }
};

export const deleteStudentAPI = async (id) => {
  try {
    const response = await UserClient.delete(`/students/${id}`);
    return response.data;
  } catch (error) {
    throw new Error(error);
  }
};
