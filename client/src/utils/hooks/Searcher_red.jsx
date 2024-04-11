import { useState, useEffect } from "react"

import API_INTERPOL from "../api/conexion_api.js"
import active_debounce from "./debounce.jsx";
import Coincidence from "../../components/Coincidence_red.jsx"
import Loading from "../../components/Loading.jsx"
import Search_glass from "../../assets/search-sharp.png"

function Searcher_red() {
  const [search, setSearch] = useState("");
  const [notices, setNotices] = useState([]);
  const [load, setLoad] = useState(false);
  const [alert, setAlert] = useState(false)
  const [message, setMessage] = useState("");
  const [parameter, setParameter] = useState('forename');

  const debounceText = active_debounce(search, 650);

  //Buscar usuarios
  const fETCH_NOTICES = async (valueS) => {
    const RESPONSE = await API_INTERPOL
      .get("/red", {
        params: {
          [parameter]: valueS,//Buscar por
          resultPerPage: 15 //LIMITAR RESULTADOS
        }
      })
      .catch((error) => {
        console.error('Error al realizar la búsqueda:', error.message);
        //console.debug(error)
        //console.error(`Error al realizar la búsqueda. Código: ${error.response.status}. Mensaje: ${error.response.data.message}`)
        return { data: false };
      });
    const dataRes = RESPONSE.data;
    console.debug("Respuesta:", dataRes);
    if (!dataRes) {
      setMessage('Ha ocurrido un error al realizar la búsqueda.')
      setAlert(true);
      setLoad(false);
      return
    };

    if (dataRes.total == 0) {
      setMessage('No se han encontrado coincidencias.')
      setAlert(true);
      setLoad(false);
      return
    }
    let noticesArr = [];
    let cError = 0;
    let items = dataRes._embedded.notices;
    console.log(dataRes)
    console.log(items)

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

      //Para buscar los crimenes de la persona
      let arrest_details = ""
      //const RESPONSE3 = await API_INTERPOL.get(`/red/${notice.entity_id}/images`)
      const RESPONSE3 = await API_INTERPOL.get(`/red/${notice.entity_id}`)
      .catch((error) => {
        console.warn('Notice:', notice.entity_id, 'Error:', error.message);
        cError++
        //console.debug(error);
        return { data: false }
      });

      if(RESPONSE3){
        let cases = RESPONSE3.data.arrest_warrants
        arrest_details = ""
        for (let i = 0; i < cases.length; i++) {
          arrest_details += cases[i].charge
        }
      }
      notice.arrest_details = arrest_details;
      noticesArr.push(notice)
    }
    console.table(noticesArr);
    setLoad(false);
    return setNotices(noticesArr);
  }

  /* Loading */
  useEffect(() => {
    setNotices([]);
    setAlert(false);
    let textSearch = debounceText.trim()//Evitar buscar si está vacío
    if (textSearch.length > 10) {
      setMessage('La consulta supera el límite de caracteres');
      setAlert(true);
    } else if (textSearch) {
      console.debug('Actualizando texto:', textSearch);
      setLoad(true);
      fETCH_NOTICES(textSearch)
    }
  }, [debounceText])

  //Detectar texto en el input
  const debounceRes = (valueSearch) => {
    setSearch(valueSearch);
    //console.info('escribiendo:', valueSearch);
  }

  //Para ocultar los usuarios mientras se están cargando
  const [show, setShow] = useState('flex');
  const styleUsers = {
    display: show,
  };
  useEffect(() => {
    if (load) {
      setShow('none');
      //console.info('Oculto');
    } else {
      setShow('flex');
      //console.info('Mostrar');
    }
  }, [load]);

  const visible = () => {
    if (load) {
      //console.debug("hola. Ya cargué (usuarios)");
      setLoad(false);
    }
  }

  return (
    <>
      <div className="searcherContainer">
        <div className="searchBarContainer">
          <div className="searchBar red_alert">
            <input type="text" id="input" /* placeholder="Buscar alertas rojas" */ onChange={(e) => debounceRes(e.target.value)}></input>
            <img className="searchGlass" src={Search_glass} />
          </div>
        </div>
        <p>Selecciona el parámetro de búsqueda:</p>
        <select name="parameterS" id="selectParam" onChange={(e) => setParameter(e.target.value)}>
          <option value="forename">Nombre</option>
          <option value="name">Apellido</option>
          <option value="nationality">Nacionalidad</option>
        </select>
        <h1>Reportados</h1>
        {load && <Loading />}
        {alert && <h2 className="buscador-mensaje">{message}</h2>}
        <div className='usuariosContainer' style={styleUsers} onLoad={visible}>
          {
            notices.map(noticeDat => (
              <Coincidence
                key={noticeDat.entity_id}
                image_url={noticeDat.image}
                name={noticeDat.forename}
                lastname={noticeDat.name}
                nationality={noticeDat.nationalities}
                date={noticeDat.date_of_birth}
                link={`https://ws-public.interpol.int/notices/v1/red/${noticeDat.entity_id}`}
                arrest_details={noticeDat.arrest_details} 
                values={noticeDat}
              />
            ))
          }
        </div>
      </div>
    </>
  )
}

export default Searcher_red