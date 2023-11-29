import { useState, useEffect } from 'react'
import ModalAlert from './ModalAlert'

const TablaExamen = () => {
  const BASE_URL = import.meta.env.VITE_BASE_URL
  const [pacientes, setPacientes] = useState([])
  const [pacienteSeleccionado, setPacienteSeleccionado] = useState('')
  const [submitted, setSubmitted] = useState(false)
  const [infoPaciente, setInfoPaciente] = useState([])
  const [registroExitoso, setRegistroExitoso] = useState(false)

  const [isModalOpen, setIsModalOpen] = useState(false)
  const [modalAMessage, setModalAMessage] = useState('')
  const closeAModal = () => {
    setIsModalOpen(false)
  }
  const handleTabKeyPress = (e) => {
    if (isModalOpen && e.key === 'Tab') {
      e.preventDefault()
    }
  }

  const [isSubmitting, setIsSubmitting] = useState(false)

  
  useEffect(() => {
    fetch(`${BASE_URL}/pacientes`)
      .then((response) => response.json())
      .then((data) => {
        setPacientes(data)
        setFilteredPacientes(data)
      })
      .catch((error) => {
        setModalAMessage('Error: No se pudo establecer conexión con el servidor.')
        setIsModalOpen(true)
        console.error(error)
      })
  }, [BASE_URL])

  const handlePacienteSeleccionado = (e) => {
    setPacienteSeleccionado(e.target.value)
  }

  const handleSubmit1 = (e) => {
    e.preventDefault()
    setIsSubmitting(true)
    fetch(`${BASE_URL}/pacientes/${pacienteSeleccionado}`)
      .then((response) => {
        if (!response.ok) {
          throw new Error('Hubo un error al obtener los datos')
        }
        return response.json()
      })
      .then((responseData) => {
        setInfoPaciente(responseData)
        setDatosFormulario((prevDatos) => ({
          ...prevDatos,
          pacienteId: responseData.id,
        }));
        setSubmitted(true)
      })
      .catch((error) => {
        if (error.message === 'Hubo un error al obtener los datos') {
          setModalAMessage('Hubo un error al obtener los datos')
          setIsModalOpen(true)
        } else {
          setModalAMessage('Error: No se pudo establecer conexión con el servidor.')
          setIsModalOpen(true)
          console.error(error)
        }
      })
      .finally(() => {
        setIsSubmitting(false)
      })
  }

  const isButtonDisabled = pacienteSeleccionado === ''
  const handleReloadPage = () => {
    window.location.reload()
  }

  const [searchTerm, setSearchTerm] = useState('')
  const [filteredPacientes, setFilteredPacientes] = useState(pacientes)
  const handleSearchChange = (e) => {
    const newSearchTerm = e.target.value
    setSearchTerm(newSearchTerm)
    if (newSearchTerm === '') {
      setFilteredPacientes(pacientes)
    } else {
      const filtered = pacientes.filter((paciente) =>
        `${paciente.nombres} ${paciente.apellidos}`.toLowerCase().includes(newSearchTerm.toLowerCase())
      )
      setFilteredPacientes(filtered)
    }
  }

  const scrollToBottom = () => {
    window.scrollTo({
      top: document.documentElement.scrollHeight,
      behavior: 'smooth'
    })
  }
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    })
  }



  const [datosFormulario, setDatosFormulario] = useState({
    pacienteId: '',
    campo1: '',
    campo2: '',
    campo3: '',
  });

  const manejarCambio = (event) => {
    const { name, value } = event.target;
    setDatosFormulario((prevDatos) => ({
      ...prevDatos,
      [name]: value,
    }));
  };

  const manejarSubmit = async (event) => {
    event.preventDefault();

    try {
      console.log('POST:', JSON.stringify(datosFormulario));
      const response = await fetch('http://localhost:8085/api/tabla_examen/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(datosFormulario),
      });      
      if (response.ok) {
        console.log('Registro insertado con éxito.');
        setRegistroExitoso(true)
      } else {
        console.error('Error al insertar el registro.');
      }
    } catch (error) {
      console.error('Error de red:', error);
    }
  };

  if (registroExitoso) {
    return (
      <div>
        <center>
          <br />
          <h2>Registro realizado con éxito</h2>
          <br />
          <button onClick={handleReloadPage}>Realizar un Nuevo Registro</button>
        </center>
      </div>
    )
  }

  return (
    <div>
      <div onKeyDown={handleTabKeyPress}>
        <ModalAlert
          message={modalAMessage}
          isOpen={isModalOpen}
          onClose={closeAModal}
        />
      </div>
      {!submitted && (
        <center>
          <div>
            <br />
            <h2>Tabla de Datos y Exámenes</h2> <br />
            <form onSubmit={handleSubmit1}>
              <div>
                <input
                  name='buscarPaciente'
                  type='text'
                  placeholder='Buscar paciente'
                  value={searchTerm}
                  onChange={handleSearchChange}
                />
                <select name='seleccionarPaciente' value={pacienteSeleccionado} onChange={handlePacienteSeleccionado}>
                  <option value=''>Seleccione un paciente</option>
                  {filteredPacientes
                    .sort((a, b) => a.nombres.localeCompare(b.nombres))
                    .map((paciente) => (
                      <option key={paciente.id} value={paciente.id}>
                        {paciente.nombres} {paciente.apellidos}
                      </option>
                  ))}
                </select>
              </div>
              <br />
              <button type='submit' disabled={isButtonDisabled || isSubmitting}>Continuar</button>
            </form>
          </div>
        </center>
      )}
      {submitted && (
        <center>
          <div className='tableContainer'> <br />
            <h2>Tabla de Datos y Exámenes</h2>
            <p><b>Paciente: </b>{infoPaciente.nombres + ' ' + infoPaciente.apellidos}</p>
            {/* <p><b>Paciente id: </b>{infoPaciente.id}</p> */}
            <button className='boton-scroll-bottom' onClick={scrollToBottom}>Ir al final</button> <br /> <br />
            <form>
              {/* <label>
                Paciente ID:
                <input
                  type="text"
                  name="pacienteId"
                  value={datosFormulario.pacienteId}
                  onChange={manejarCambio}
                />
              </label>
              <br /> */}
              <label>
                Campo 1:
                <input
                  type="text"
                  name="campo1"
                  value={datosFormulario.campo1}
                  onChange={manejarCambio}
                />
              </label>
              <br />
              <label>
                Campo 2:
                <input
                  type="text"
                  name="campo2"
                  value={datosFormulario.campo2}
                  onChange={manejarCambio}
                />
              </label>
              <br />
              <label>
                Campo 3:
                <input
                  type="text"
                  name="campo3"
                  value={datosFormulario.campo3}
                  onChange={manejarCambio}
                />
              </label>
              <br />
              {/* <br /><button type="submit">Insertar Registro</button> */}
              <br /> <button onClick={manejarSubmit}>Insertar Registro</button>
            </form>


            <br />  <button className='boton-scroll-top' onClick={scrollToTop}>Ir al principio</button>
            <br /> <br /> <button className='btnVolv' onClick={handleReloadPage}>Volver</button> <br /> <br />
          </div>
        </center>
      )}
    </div>
  )
}

export default TablaExamen
