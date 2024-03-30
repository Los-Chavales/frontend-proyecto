import React from "react";
import { useState } from 'react';
import Axios from "axios";

function Form (){

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [date_sighting, setDateSighting] = useState("");
  const [phone, setPhone] = useState("");
  const [state, setState] = useState("");
  const [number_sighting, setNumberSighting] = useState(0);

  const registerReport = () =>{
    Axios.post("http://localhost:4000/report/",{
      name:name,
      email:email,
      date_sighting:date_sighting,
      phone:phone,
      state:state,
      number_sighting:number_sighting
    })
  }

  return(
    <div>
      <form>
        <label htmlFor="name" name="name">Nombre completo</label>
        <input 
          type="text" id="name" 
          onChange={(e)=>{setName(e.target.value)}}
        />   <br></br>

        <label htmlFor="email" name="email">Email</label>
        <input 
          type="email" 
          id="email" 
          onChange={(e)=>{setEmail(e.target.value)}}
        />   <br></br>

        <label htmlFor="date_sighting" name="date_sighting">Fecha del avistamiento más reciente</label>
        <input 
          type="date" 
          id="date_sighting"
          onChange={(e)=>{setDateSighting(e.target.value)}} 
        />  <br></br>

        <label htmlFor="phone" name="phone" >Teléfono</label>
        <input 
          type="tel" 
          id="phone" 
          onChange={(e)=>{setPhone(e.target.value)}}
        />  <br></br>

        <label htmlFor="reported">Reportado</label>
        <input 
          type="radio" 
          id="reported" 
          name="state" 
          value="Reportado"
          onClick={(e)=>{setState(e.target.value)}}
        />
        <label htmlFor="missing">Desaparecido</label>  
        <input 
          type="radio" 
          id="missing" 
          name="state" 
          value="Desaparecido" 
          onClick={(e)=>{setState(e.target.value)}}
        />  <br></br>

        <label htmlFor="number_sighting" name="number_sighting">Número de avistamientos</label>
        <input 
          type="number" 
          id="number_sighting" 
          onClick={(e)=>{setNumberSighting(e.target.value)}}
        />  <br></br>
  {/*       <label htmlFor="photo" name="photo">Foto del avistamiento</label>
        <input type="file" id="photo" />  <br></br> */}
        <input type="submit" onClick={registerReport} />
      </form>
    </div>
  );
}

export default Form;