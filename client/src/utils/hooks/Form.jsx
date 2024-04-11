import React from "react";
import { useState } from 'react';
import { useForm } from "react-hook-form";
import Axios from "axios";
import logo_contact from "../../assets//logo_contact.png";
import { useReport } from "../../context/Report_context";

function Form() {

  const { register, handleSubmit, formState: { errors }, } = useForm();
  const { register_report, report, errorsServer } = useReport();

  const onSubmit = handleSubmit(async (values) => {
    const formData = new FormData();

    formData.append("name", values.name)
    formData.append("reported_name", values.reported_name)
    formData.append("email", values.email)
    formData.append("date_sighting", values.date_sighting)
    formData.append("phone", values.phone)
    formData.append("state", values.state)
    formData.append("description", values.description)
    formData.append("image", values.photo[0])

    register_report(formData);
  })

  return (
    <div className="container_form">
      <div className="container_form_img">
        <img src={logo_contact} className="form_img"></img>
      </div>
      <form onSubmit={onSubmit} className="form_contact">

        <input
          type="text" id="name"
          placeholder="Nombre Completo"
          className="input_form_contact input_contact"
          {...register("name", { required: true })}
        />
        {errors.name && (<p className="p-input">Se requiere su nombre completo</p>)}

        <input
          type="email"
          id="email"
          placeholder="Email"
          className="input_form_contact input_contact"
          {...register("email", { required: true })}
        />
        {errors.email && (<p className="p-input">Se requiere su email</p>)}

        <input
          type="tel"
          id="phone"
          placeholder="Teléfono"
          className="input_form_contact input_contact"
          {...register("phone", { required: true })}
        />
        {errors.phone && (<p className="p-input">Se requiere su teléfono</p>)}

        <input
          type="text" id="reported_name"
          placeholder="Nombre del Reportado"
          className="input_form_contact input_contact"
          {...register("reported_name", { required: true })}
        />
        {errors.reported_name && (<p className="p-input">Se requiere el nombre del reportado</p>)}

        <div className="input_contact_date">
          <label htmlFor="date_sighting" name="date_sighting" className="label_contact_date">Avistamiento</label>
          <input
            type="date"
            id="date_sighting"
            className="input_contact input_date_sighting"
            {...register("date_sighting", { required: true })}
          />
        </div>
        {errors.date_sighting && (<p className="p-input" >Se requiere la fecha del avistamiento</p>)}

        <div className="input_contact_radio">
          <label htmlFor="reported" className="radio_contact label_contact_report">Reportado
            <input
              type="radio"
              id="reported"
              name="state"
              value="Reportado"
              className="radio_report"
              {...register("state", { required: true })}
            />
          </label>
          <label htmlFor="missing" className="radio_contact label_contact_missing">Desaparecido
            <input
              type="radio"
              id="missing"
              name="state"
              value="Desaparecido"
              className="radio_missing"
              {...register("state", { required: true })}
            />
          </label>
        </div>
        {errors.state && (<p className="p-input" >Se requiere saber que clase de reporte es</p>)}

        <textarea
          id="description_report"
          className="description_area"
          placeholder="Descripción del avistamiento"
          {...register("description", { required: true })}
        ></textarea>
        {errors.description && (<p className="p-input">Se requiere detalles del caso</p>)}

        <div className="input_contact_file">
          <label htmlFor="photo" className="label_contact_evidence">Evidencia</label>
          <input
            type="file"
            id="photo"
            name="photo"
            accept="image/*"
            className="input_file"
            {...register("photo", { required: true })}
          />
          <label htmlFor="photo" className="contact_evidence_button">Subir archivo</label>
        </div>
        {errors.photo && (<p className="p-input">Se requiere una foto para la evidencia</p>)}
        {//Mostrar errores
          errorsServer.map((error, i) => (
            <div className="p-error-user" key={i}>
              <p>{error}</p>
            </div>
          ))
        }

        <input type="submit" className="contact_submit_button" />
      </form>
    </div>
  );
}

export default Form;