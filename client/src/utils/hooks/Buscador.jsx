import { useState, useEffect } from "react"

import API_INTERPOL from "../api/conexion_api.js"
import { active_debounce } from "./debounce.jsx";
import Coincidencia from "../../components/Coincidencia.jsx"
import Loading from "../../components/Loading.jsx";

function Buscador() {
  const [buscar, setBuscar] = useState("");
  const [usuarios, setUsuarios] = useState([]);
  const [carga, setCarga] = useState(false);
  const [alerta, setAlerta] = useState(false)
  const [mensaje, setMensaje] = useState("");

  const debounceTexto = active_debounce(buscar, 650);

  //Buscar usuarios
  const fETCH_USERS = async (valorB) => {
    const RESPONSE = await API_INTERPOL
      .get("/red", {
        params: {
          nationality: valorB,
          resultPerPage: 2
        }
      })
      .catch((error) => {
        //console.error('Error al realizar la búsqueda:', error.message);
        console.debug(error)
        //console.error(`Error al realizar la búsqueda. Código: ${error.response.status}. Mensaje: ${error.response.data.message}`)
        return { data: false };
      });
    const dataRes = RESPONSE.data;
    console.debug("Respuesta:", dataRes);
    if (!dataRes) {
      setMensaje('Ha ocurrido un error al realizar la búsqueda.')
      setAlerta(true);
      setCarga(false);
      return
    };

    if (dataRes.total == 0) {
      setMensaje('No se han encontrado coincidencias.')
      setAlerta(true);
      setCarga(false);
      return
    }
    let notices = [];
    let cError = 0;
    let items = dataRes._embedded.notices;

    for (const notice of items) {
      //let LINK_IMAGE = notice._links.images.href;
      delete notice._links;//Eliminar los links
      notice.entity_id = notice.entity_id.replace("/", '-');//Para cambiar el '/' por '-' en el ID, para realizar otras búsquedas
      
      //Para convertir las nacionalidades de array a string
      notice.nationalities = notice.nationalities.toString().replace(/,/g, ', ');
      
      //Para buscar el link de la imagen
      let image = '';
      const RESPONSE2 = await API_INTERPOL.get(`/red/${notice.entity_id}/images`)
        .catch((error) => {
          console.warn('Notice:', notice.entity_id, 'Error:', error.message);
          cError++
          //console.debug(error);
          return { data: false }
        });
      let imageRes = RESPONSE2.data._embedded.images;
      //console.debug(imageRes);
      if (imageRes && Array.isArray(imageRes) && imageRes.length > 0) {
        //console.log(imageRes[imageRes.length - 1]._links.self.href);
        image = imageRes.pop()._links.self.href;
        if (!image) { image = '' };
      }
      notice.image = image;

      notices.push(notice)
    }
    console.table(notices);
    //if (cError === 3) setCarga(false);
    //return setUsuarios(notices);
    return setCarga(false)
  }

  /* Loading */
  useEffect(() => {
    setUsuarios([]);
    setAlerta(false);
    let textoBusq = debounceTexto.trim()//Evitar buscar si está vacío
    if (textoBusq.length > 39) {
      setMensaje('La consulta supera el límite de caracteres');
      setAlerta(true);
    } else if (textoBusq) {
      console.debug('Actualizando texto:', textoBusq);
      setCarga(true);
      fETCH_USERS(textoBusq)
    }
  }, [debounceTexto])

  //Detectar texto en el input
  const debounceRes = (valorBusq) => {
    setBuscar(valorBusq);
    //console.info('escribiendo:', valorBusq);
  }

  //Para ocultar los usuarios mientras se están cargando
  const [mostrar, setMostrar] = useState('flex');
  const estiloUsers = {
    display: mostrar,
  };
  useEffect(() => {
    if (carga) {
      setMostrar('none');
      //console.info('Oculto');
    } else {
      setMostrar('flex');
      //console.info('Mostrar');
    }
  }, [carga]);

  const visible = () => {
    if (carga) {
      //console.debug("hola. Ya cargué (usuarios)");
      setCarga(false);
    }
  }

  return (
    <>
      <div className="buscadorContainer">
        <h1>Ingresa el código de nacionalidad</h1>
        <p>Ejemplo: VE</p>
        <input type="text" id="input" placeholder="Buscar usuarios" onChange={(e) => debounceRes(e.target.value)}></input>
        {carga && <Loading />}
        {alerta && <h2 className="buscador-mensaje">{mensaje}</h2>}
        <div className='usuariosContainer' style={estiloUsers} onLoad={visible}>
          {
            usuarios.map(usuario => (
              <Coincidencia
                key={usuario.id}
                avatar_url={usuario.avatar_url}
                name={usuario.name}
                login={usuario.login}
                company={usuario.company}
                public_repos={usuario.public_repos}
                enlace_github={usuario.html_url}
              />
            ))
          }
        </div>
      </div>
    </>
  )
}

export default Buscador