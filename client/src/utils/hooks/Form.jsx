import React from "react";
import { useState } from 'react';
import Axios from "axios";
import logo_contact from "../../assets//logo_contact.png"

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
      <div className="container_form_img"> 
        <img src={logo_contact} className="form_img"></img>
      </div>
      <form onSubmit={registerReport} className="form_contact">
        <input 
          type="text" id="name" 
          onChange={(e)=>{setName(e.target.value)}}
          placeholder="Nombre Completo"
          className="input_form_contact input_contact"
        />  

        <input 
          type="email" 
          id="email" 
          onChange={(e)=>{setEmail(e.target.value)}}
          placeholder="Email"
          className="input_form_contact input_contact"
        />   

        <input 
          type="tel" 
          id="phone" 
          onChange={(e)=>{setPhone(e.target.value)}}
          placeholder="Teléfono"
          className="input_form_contact input_contact"
        /> 

        <input 
          type="text" id="reported_name" 
          onChange={(e)=>{setReportedName(e.target.value)}}
          placeholder="Nombre del Reportado"
          className="input_form_contact input_contact"
        />   

        <div className="input_contact_date">
          <label htmlFor="date_sighting" name="date_sighting" className="label_contact_date">Avistamiento</label> 
            <input 
              type="date" 
              id="date_sighting"
              onChange={(e)=>{setDateSighting(e.target.value)}}
              className="input_contact input_date_sighting" 
            />  
        </div>

        <div className="input_contact_radio">
          <label htmlFor="reported" className="radio_contact label_contact_report">Reportado
            <input 
              type="radio" 
              id="reported" 
              name="state" 
              value="Reportado"
              onClick={(e)=>{setState(e.target.value)}}
              className="radio_report"
            />
          </label>
          <label htmlFor="missing" className="radio_contact label_contact_missing">Desaparecido 
            <input 
              type="radio" 
              id="missing" 
              name="state" 
              value="Desaparecido" 
              onClick={(e)=>{setState(e.target.value)}}
              className="radio_missing"
            />  
          </label> 
        </div>

        <textarea  
          id="description_report"
          onChange={(e)=>{setDescription(e.target.value)}}
          className="description_area"
          placeholder="Descripción del avistamiento"
        ></textarea>

        <div className="input_contact_file">
          <label htmlFor="photo" className="label_contact_evidence">Evidencia</label>
          <input 
            type="file" 
            id="photo" 
            name="photo" 
            accept="image/*" 
            onChange={(e)=>{setPhoto(e.target.files[0])}}
            className="input_file"
          />  
          <label htmlFor="photo" className="contact_evidence_button">Subir archivo</label>
        </div>

        <input type="submit" className="contact_submit_button"/>
      </form>
    </div>
  );
}

export default Form;