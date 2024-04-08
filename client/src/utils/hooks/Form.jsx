import React from "react";
import { useState } from 'react';
import Axios from "axios";

function Form (){

  const [name, setName] = useState("");
  const [reported_name, setReportedName] = useState("");
  const [email, setEmail] = useState("");
  const [date_sighting, setDateSighting] = useState("");
  const [phone, setPhone] = useState("");
  const [state, setState] = useState("");
  const [description, setDescription] = useState(""); 
  const [photo, setPhoto] = useState();

  const registerReport = (e) => {
    e.preventDefault();
    const formData = new FormData();

    formData.append("name", name)
    formData.append("reported_name", reported_name)
    formData.append("email", email)
    formData.append("date_sighting", date_sighting)
    formData.append("phone", phone)
    formData.append("state", state)
    formData.append("description", description)
    formData.append("image", photo)

    Axios.post(
      "http://localhost:4000/report/", 
      formData,
      {
        headers: {"Content-Type": "multipart/form-data"},
      }
    )
  }
  
  return(
    <div className="container_form">
      <form onSubmit={registerReport} className="form_contact">
        <label htmlFor="name" name="name">Su nombre completo</label>
        <input 
          type="text" id="name" 
          onChange={(e)=>{setName(e.target.value)}}
        />  

        <label htmlFor="reported_name" name="reported_name">Nombre de la persona que reconoció</label>
        <input 
          type="text" id="reported_name" 
          onChange={(e)=>{setReportedName(e.target.value)}}
        />   

        <label htmlFor="email" name="email">Email</label>
        <input 
          type="email" 
          id="email" 
          onChange={(e)=>{setEmail(e.target.value)}}
        />   

        <label htmlFor="date_sighting" name="date_sighting">Fecha del avistamiento más reciente</label>
        <input 
          type="date" 
          id="date_sighting"
          onChange={(e)=>{setDateSighting(e.target.value)}} 
        />  

        <label htmlFor="phone" name="phone" >Teléfono</label>
        <input 
          type="tel" 
          id="phone" 
          onChange={(e)=>{setPhone(e.target.value)}}
        /> 

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
        />  

        <label htmlFor="description_report" name="description">Detalles del avistamiento</label>
        <textarea  
          id="description_report"
          onChange={(e)=>{setDescription(e.target.value)}}
          className="description_area"
        ></textarea>

        <label htmlFor="photo">Foto del avistamiento más reciente</label>
        <input 
          type="file" 
          id="photo" 
          name="photo" 
          accept="image/*" 
          onChange={(e)=>{setPhoto(e.target.files[0])}}
        />  

        <input type="submit" />
      </form>
    </div>
  );
}

export default Form;