import axios from "axios";

const API_TRANSLATE = async (text) => {
  const encodedParams = new URLSearchParams();
  encodedParams.set('source_language', 'auto'); //Reconocimiento de lenguaje automático
  encodedParams.set('target_language', 'es'); //Traducir al español
  encodedParams.set('text', text);  //Recibir texto

  const options = {
    method: 'POST',
    url: import.meta.env.VITE_URL_API_TRANSLATOR,
    headers: {
      'content-type': 'application/x-www-form-urlencoded',
      'X-RapidAPI-Key': import.meta.env.VITE_KEY_API_TRANSLATOR,
      'X-RapidAPI-Host': import.meta.env.VITE_HOST_API_TRANSLATOR
    },
    data: encodedParams,
  };

  try {
    const response = await axios.request(options);
    console.log(response.data);
    return response.data
  } catch (error) {
    if (error.response.data.message) {
      console.error("Error al traducir:", error.response.data.message);
    } else {
      console.error("Error al traducir (API)");
    }
    return { data: false };
  }
};

export default API_TRANSLATE;