import axios from "axios";
const API_URL = import.meta.env.VITE_API_URL;
const ENV = import.meta.env.VITE_ENV;
export const AuthClient = axios.create({
  baseURL: `${ENV === "development" ? "http://localhost:3000/api" : API_URL}`,
  headers: {
    "Content-Type": "application/json",
  },
  withCredentials: true,
});

export const UserClient = axios.create({
  baseURL: `${ENV === "development" ? "http://localhost:3000/api" : API_URL}`,
  headers: {
    "Content-Type": "application/json",
  },
  withCredentials: true,
});

export const ConfigClient = axios.create({
  baseURL: `${ENV === "development" ? "http://localhost:3000/api" : API_URL}`,
  headers: {
    "Content-Type": "application/json",
  },
  withCredentials: true,
});
