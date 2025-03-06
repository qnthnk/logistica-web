import React, { useState, useContext } from 'react';
import { Context } from '../js/store/appContext.js';
import './Afiliaciones.css'
import RedirectToHome from '../components/RedirectHome.jsx';


const Afiliaciones = () => {

  const { actions } = useContext(Context)
  const [afiliaciones, setAfiliaciones] = useState({
    clave_elector: "",
    apellido_paterno: "",
    apellido_materno: "",
    nombre: "",
  })

  const handlerafiliacion = (e) => {
    let value = e.target.value
    let name = e.target.name
    setAfiliaciones({ ...afiliaciones, [name]: value })
  }

  const handleConsulta = async () => {
    try {
      actions.getAfiliacion(afiliaciones)
    } catch (e) {
      console.error(e)
    }
  }
  const token = localStorage.getItem('token');

  return (
    <div>
      {
        token ? (

          <div >
            <div className='title '>
              <h2 className="heading">Verifica Afiliación</h2>
            </div>
            <div className='former'>
              <div className="caja-input">
                <span className='subheading '>Clave de elector</span>
                <input type="text" className='input' name="clave_elector" onChange={handlerafiliacion} placeholder="clave" aria-label="clave" aria-describedby="addon-wrapping" />
              </div>
              <div className="caja-input">
                <span className='subheading'>Apellido paterno</span>
                <input type="text" className='input' name="apellido_paterno" onChange={handlerafiliacion} placeholder="apellido paterno" aria-label="apellido paterno" aria-describedby="addon-wrapping" />
              </div>
              <div className="caja-input">
                <span className='subheading'>Apellido materno</span>
                <input type="text" className='input' name="apellido_materno" onChange={handlerafiliacion} placeholder="apellido materno" aria-label="apellido materno" aria-describedby="addon-wrapping" />
              </div>
              <div className="caja-input">
                <span className='subheading'>Nombre completo</span>
                <input type="text" className='input' name="nombre" onChange={handlerafiliacion} placeholder="nombre" aria-label="nombre" aria-describedby="addon-wrapping" />
              </div>
              <button className='login-button' onClick={handleConsulta}>
              Consultar
            </button>
            </div>
            
          </div>

        )
          :
          (
            <RedirectToHome />
          )
      }




    </div>
  )
}

export default Afiliaciones