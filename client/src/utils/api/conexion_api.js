import axios from "axios";

const URL_BASE = import.meta.env.VITE_URL_API;
const HEADER = { 'Accept': 'application / json' };

if (!URL_BASE) {
  let errorENV = 'No se encontró alguna de las variables en el archivo .env'
  throw errorENV //Archivo .env
}

const API_INTERPOL = axios.create({
  baseURL: URL_BASE,
  headers: HEADER,
  timeout: 60000,
});

export default API_INTERPOL;