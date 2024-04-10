import axios from "axios";

const URL_BASE = import.meta.env.VITE_URL_SERVER;
const HEADER = {
  "Accept": "*/*",
  "Content-Type": "application/json"
};

if (!URL_BASE) {
  let errorENV = 'No se encontró alguna de las variables en el archivo .env'
  throw errorENV //Archivo .env
}

export const API_SERVER = axios.create({
  baseURL: URL_BASE + 'auth/',
  headers: HEADER,
  withCredentials: true,
  timeout: 60000,
});

export const API_REPORTS_FILES = axios.create({
  baseURL: URL_BASE + 'report/',
  headers: { "Content-Type": "multipart/form-data" },
  withCredentials: true,
  timeout: 60000,
});

export const API_REPORTS = axios.create({
  baseURL: URL_BASE + 'report/',
  headers: HEADER,
  withCredentials: true,
  timeout: 60000,
});

export const API_REPORTSV = axios.create({
  baseURL: URL_BASE + 'verified/',
  headers: HEADER,
  withCredentials: true,
  timeout: 60000,
});