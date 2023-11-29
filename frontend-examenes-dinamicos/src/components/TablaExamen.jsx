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
            <button className='boton-scroll-bottom' onClick={scrollToBottom}>Ir al final</button> <br /> <br />
            <form>

              <label>
                1. FCSRT:ㅤ
                <input
                  type="text"
                  name="campo1"
                  value={datosFormulario.campo1}
                  onChange={manejarCambio}
                />
              </label>
              <br />
              <label>
                Total identificación:ㅤ
                <input
                  type="text"
                  name="campo2"
                  value={datosFormulario.campo2}
                  onChange={manejarCambio}
                />
              </label>
              <br />
              <label>
                FCRST Recuerdo libre ensayo 1:ㅤ
                <input
                  type="text"
                  name="campo3"
                  value={datosFormulario.campo3}
                  onChange={manejarCambio}
                />
              </label>
              <br />
              <label>
                FCRST Recuerdo facilitado ensayo 1:ㅤ
                <input
                  type="text"
                  name="campo4"
                  value={datosFormulario.campo4}
                  onChange={manejarCambio}
                />
              </label>
              <br />
              <label>
                FCRST Recuerdo libre ensayo 2:ㅤ
                <input
                  type="text"
                  name="campo5"
                  value={datosFormulario.campo5}
                  onChange={manejarCambio}
                />
              </label>
              <br />
              <label>
                FCRST Recuerdo facilitado ensayo 2:ㅤ
                <input
                  type="text"
                  name="campo6"
                  value={datosFormulario.campo6}
                  onChange={manejarCambio}
                />
              </label>
              <br />
              <label>
                FCRST Recuerdo libre ensayo 3:ㅤ
                <input
                  type="text"
                  name="campo7"
                  value={datosFormulario.campo7}
                  onChange={manejarCambio}
                />
              </label>
              <br />
              <label>
                FCRST Recuerdo facilitado ensayo 3:ㅤ
                <input
                  type="text"
                  name="campo8"
                  value={datosFormulario.campo8}
                  onChange={manejarCambio}
                />
              </label>
              <br />
              <label>
                FCRST - RECUERDO DIFERIDO Recuerdo libre:ㅤ
                <input
                  type="text"
                  name="campo9"
                  value={datosFormulario.campo9}
                  onChange={manejarCambio}
                />
              </label>
              <br />
              <label>
                FCRST - RECUERDO DIFERIDO Recuerdo facilitado:ㅤ
                <input
                  type="text"
                  name="campo10"
                  value={datosFormulario.campo10}
                  onChange={manejarCambio}
                />
              </label>
              <br />
              <label>
                FCRST LIBRE TOTAL (0-48):ㅤ
                <input
                  type="text"
                  name="campo11"
                  value={datosFormulario.campo11}
                  onChange={manejarCambio}
                />
              </label>
              <br />
              <label>
                FCRST RECUERDO FACILITADO TOTAL (0-48):ㅤ
                <input
                  type="text"
                  name="campo12"
                  value={datosFormulario.campo12}
                  onChange={manejarCambio}
                />
              </label>
              <br />
              <label>
                FCRST RECUERDO DIFERIDO LIBRE (0-16):ㅤ
                <input
                  type="text"
                  name="campo13"
                  value={datosFormulario.campo13}
                  onChange={manejarCambio}
                />
              </label>
              <br />
              <label>
                FCRST RECUERDO DIFERIDO FACILITADO (0-16):ㅤ
                <input
                  type="text"
                  name="campo14"
                  value={datosFormulario.campo14}
                  onChange={manejarCambio}
                />
              </label>
              <br />
              <label>
                2. TEST VISIÓN DE COLORES - DVORINE:ㅤ
                <input
                  type="text"
                  name="campo15"
                  value={datosFormulario.campo15}
                  onChange={manejarCambio}
                />
              </label>
              <br />
              <label>
                Número de errores:ㅤ
                <input
                  type="text"
                  name="campo16"
                  value={datosFormulario.campo16}
                  onChange={manejarCambio}
                />
              </label>
              <br />
              <label>
                3. TEST DE MEMORIA DE TRABAJO VISUAL PARA FORMAS COLORES Y COMBINACIONES:ㅤ
                <input
                  type="text"
                  name="campo17"
                  value={datosFormulario.campo17}
                  onChange={manejarCambio}
                />
              </label>
              <br />
              <label>
                Percepción:ㅤ
                <input
                  type="text"
                  name="campo18"
                  value={datosFormulario.campo18}
                  onChange={manejarCambio}
                />
              </label>
              <br />
              <label>
                Correctas:ㅤ
                <input
                  type="text"
                  name="campo19"
                  value={datosFormulario.campo19}
                  onChange={manejarCambio}
                />
              </label>
              <br />
              <label>
                Porcentaje correctas:ㅤ
                <input
                  type="text"
                  name="campo20"
                  value={datosFormulario.campo20}
                  onChange={manejarCambio}
                />
              </label>
              <br />
              <label>
                Tiempo total:ㅤ
                <input
                  type="text"
                  name="campo21"
                  value={datosFormulario.campo21}
                  onChange={manejarCambio}
                />
              </label>
              <br />
              <label>
                Forma:ㅤ
                <input
                  type="text"
                  name="campo22"
                  value={datosFormulario.campo22}
                  onChange={manejarCambio}
                />
              </label>
              <br />
              <label>
                2 formas - Correctas:ㅤ
                <input
                  type="text"
                  name="campo23"
                  value={datosFormulario.campo23}
                  onChange={manejarCambio}
                />
              </label>
              <br />
              <label>
                2 formas - Porcentaje correctas:ㅤ
                <input
                  type="text"
                  name="campo24"
                  value={datosFormulario.campo24}
                  onChange={manejarCambio}
                />
              </label>
              <br />
              <label>
                3 formas - Correctas:ㅤ
                <input
                  type="text"
                  name="campo25"
                  value={datosFormulario.campo25}
                  onChange={manejarCambio}
                />
              </label>
              <br />
              <label>
                3 formas - Porcentaje correctas:ㅤ
                <input
                  type="text"
                  name="campo26"
                  value={datosFormulario.campo26}
                  onChange={manejarCambio}
                />
              </label>
              <br />
              <label>
                Tiempo total:ㅤ
                <input
                  type="text"
                  name="campo27"
                  value={datosFormulario.campo27}
                  onChange={manejarCambio}
                />
              </label>
              <br />
              <label>
                Binding:ㅤ
                <input
                  type="text"
                  name="campo28"
                  value={datosFormulario.campo28}
                  onChange={manejarCambio}
                />
              </label>
              <br />
              <label>
                2 Bindings - Correctas:ㅤ
                <input
                  type="text"
                  name="campo29"
                  value={datosFormulario.campo29}
                  onChange={manejarCambio}
                />
              </label>
              <br />
              <label>
                2 Bindings - Porcentaje correctas:ㅤ
                <input
                  type="text"
                  name="campo30"
                  value={datosFormulario.campo30}
                  onChange={manejarCambio}
                />
              </label>
              <br />
              <label>
                3 Bindings - Correctas:ㅤ
                <input
                  type="text"
                  name="campo31"
                  value={datosFormulario.campo31}
                  onChange={manejarCambio}
                />
              </label>
              <br />
              <label>
                3 Bindings - Porcentaje correctas:ㅤ
                <input
                  type="text"
                  name="campo32"
                  value={datosFormulario.campo32}
                  onChange={manejarCambio}
                />
              </label>
              <br />
              <label>
                Tiempo total en segundos:ㅤ
                <input
                  type="text"
                  name="campo33"
                  value={datosFormulario.campo33}
                  onChange={manejarCambio}
                />
              </label>
              <br />
              <label>
                4. ACER:ㅤ
                <input
                  type="text"
                  name="campo34"
                  value={datosFormulario.campo34}
                  onChange={manejarCambio}
                />
              </label>
              <br />
              <label>
                ACE Orientación:ㅤ
                <input
                  type="text"
                  name="campo35"
                  value={datosFormulario.campo35}
                  onChange={manejarCambio}
                />
              </label>
              <br />
              <label>
                ACE Atención:ㅤ
                <input
                  type="text"
                  name="campo36"
                  value={datosFormulario.campo36}
                  onChange={manejarCambio}
                />
              </label>
              <br />
              <label>
                ACE Memoria:ㅤ
                <input
                  type="text"
                  name="campo37"
                  value={datosFormulario.campo37}
                  onChange={manejarCambio}
                />
              </label>
              <br />
              <label>
                ACE Fluidez:ㅤ
                <input
                  type="text"
                  name="campo38"
                  value={datosFormulario.campo38}
                  onChange={manejarCambio}
                />
              </label>
              <br />
              <label>
                ACE Lenguaje:ㅤ
                <input
                  type="text"
                  name="campo39"
                  value={datosFormulario.campo39}
                  onChange={manejarCambio}
                />
              </label>
              <br />
              <label>
                ACE Visoespaciales:ㅤ
                <input
                  type="text"
                  name="campo40"
                  value={datosFormulario.campo40}
                  onChange={manejarCambio}
                />
              </label>
              <br />
              <label>
                ACE TOTAL:ㅤ
                <input
                  type="text"
                  name="campo41"
                  value={datosFormulario.campo41}
                  onChange={manejarCambio}
                />
              </label>
              <br />
              <label>
                MMSE:ㅤ
                <input
                  type="text"
                  name="campo42"
                  value={datosFormulario.campo42}
                  onChange={manejarCambio}
                />
              </label>
              <br />
              <label>
                5. ECOG:ㅤ
                <input
                  type="text"
                  name="campo43"
                  value={datosFormulario.campo43}
                  onChange={manejarCambio}
                />
              </label>
              <br />
              <label>
                ECOG Memoria:ㅤ
                <input
                  type="text"
                  name="campo44"
                  value={datosFormulario.campo44}
                  onChange={manejarCambio}
                />
              </label>
              <br />
              <label>
                ECOG Planificación:ㅤ
                <input
                  type="text"
                  name="campo45"
                  value={datosFormulario.campo45}
                  onChange={manejarCambio}
                />
              </label>
              <br />
              <label>
                ECOG Lenguaje:ㅤ
                <input
                  type="text"
                  name="campo46"
                  value={datosFormulario.campo46}
                  onChange={manejarCambio}
                />
              </label>
              <br />
              <label>
                ECOG Organización:ㅤ
                <input
                  type="text"
                  name="campo47"
                  value={datosFormulario.campo47}
                  onChange={manejarCambio}
                />
              </label>
              <br />
              <label>
                ECOG Atención:ㅤ
                <input
                  type="text"
                  name="campo48"
                  value={datosFormulario.campo48}
                  onChange={manejarCambio}
                />
              </label>
              <br />
              <label>
                ECOG Visuoespacial:ㅤ
                <input
                  type="text"
                  name="campo49"
                  value={datosFormulario.campo49}
                  onChange={manejarCambio}
                />
              </label>
              <br />
              <label>
                ECOG TOTAL:ㅤ
                <input
                  type="text"
                  name="campo50"
                  value={datosFormulario.campo50}
                  onChange={manejarCambio}
                />
              </label>
              <br />
              <label>
                6. ESCALA DEPRESIÓN GERIÁTRICA - YESAVAGE:ㅤ
                <input
                  type="text"
                  name="campo51"
                  value={datosFormulario.campo51}
                  onChange={manejarCambio}
                />
              </label>
              <br />
              <label>
                7. ESCALA DE HACHINSKI:ㅤ
                <input
                  type="text"
                  name="campo52"
                  value={datosFormulario.campo52}
                  onChange={manejarCambio}
                />
              </label>
              <br />
              <label>
                8. CERAD:ㅤ
                <input
                  type="text"
                  name="campo53"
                  value={datosFormulario.campo53}
                  onChange={manejarCambio}
                />
              </label>
              <br />
              <label>
                DENOMINACION (Test de Boston):ㅤ
                <input
                  type="text"
                  name="campo54"
                  value={datosFormulario.campo54}
                  onChange={manejarCambio}
                />
              </label>
              <br />
              <label>
                Puntaje alta:ㅤ
                <input
                  type="text"
                  name="campo55"
                  value={datosFormulario.campo55}
                  onChange={manejarCambio}
                />
              </label>
              <br />
              <label>
                Puntaje media:ㅤ
                <input
                  type="text"
                  name="campo56"
                  value={datosFormulario.campo56}
                  onChange={manejarCambio}
                />
              </label>
              <br />
              <label>
                Puntaje baja:ㅤ
                <input
                  type="text"
                  name="campo57"
                  value={datosFormulario.campo57}
                  onChange={manejarCambio}
                />
              </label>
              <br />
              <label>
                Puntaje total/15:ㅤ
                <input
                  type="text"
                  name="campo58"
                  value={datosFormulario.campo58}
                  onChange={manejarCambio}
                />
              </label>
              <br />
              <label>
                MEMORIA DE UNA LISTA DE PALABRAS:ㅤ
                <input
                  type="text"
                  name="campo59"
                  value={datosFormulario.campo59}
                  onChange={manejarCambio}
                />
              </label>
              <br />
              <label>
                Intento 1 totales:ㅤ
                <input
                  type="text"
                  name="campo60"
                  value={datosFormulario.campo60}
                  onChange={manejarCambio}
                />
              </label>
              <br />
              <label>
                Intento 1 intrusiones:ㅤ
                <input
                  type="text"
                  name="campo61"
                  value={datosFormulario.campo61}
                  onChange={manejarCambio}
                />
              </label>
              <br />
              <label>
                Intento 2 totales:ㅤ
                <input
                  type="text"
                  name="campo62"
                  value={datosFormulario.campo62}
                  onChange={manejarCambio}
                />
              </label>
              <br />
              <label>
                Intento 2 intrusiones:ㅤ
                <input
                  type="text"
                  name="campo63"
                  value={datosFormulario.campo63}
                  onChange={manejarCambio}
                />
              </label>
              <br />
              <label>
                Intento 3 totales:ㅤ
                <input
                  type="text"
                  name="campo64"
                  value={datosFormulario.campo64}
                  onChange={manejarCambio}
                />
              </label>
              <br />
              <label>
                Intento 3 intrusiones:ㅤ
                <input
                  type="text"
                  name="campo65"
                  value={datosFormulario.campo65}
                  onChange={manejarCambio}
                />
              </label>
              <br />
              <label>
                Total palabras:ㅤ
                <input
                  type="text"
                  name="campo66"
                  value={datosFormulario.campo66}
                  onChange={manejarCambio}
                />
              </label>
              <br />
              <label>
                Total intrusiones:ㅤ
                <input
                  type="text"
                  name="campo67"
                  value={datosFormulario.campo67}
                  onChange={manejarCambio}
                />
              </label>
              <br />
              <label>
                PRAXIAS CONSTRUCTIVAS:ㅤ
                <input
                  type="text"
                  name="campo68"
                  value={datosFormulario.campo68}
                  onChange={manejarCambio}
                />
              </label>
              <br />
              <label>
                Círculo - Item 1:ㅤ
                <input
                  type="text"
                  name="campo69"
                  value={datosFormulario.campo69}
                  onChange={manejarCambio}
                />
              </label>
              <br />
              <label>
                Rombo - Item 2:ㅤ
                <input
                  type="text"
                  name="campo70"
                  value={datosFormulario.campo70}
                  onChange={manejarCambio}
                />
              </label>
              <br />
              <label>
                Rectángulos - Item 3:ㅤ
                <input
                  type="text"
                  name="campo71"
                  value={datosFormulario.campo71}
                  onChange={manejarCambio}
                />
              </label>
              <br />
              <label>
                Cubo - Item 4:ㅤ
                <input
                  type="text"
                  name="campo72"
                  value={datosFormulario.campo72}
                  onChange={manejarCambio}
                />
              </label>
              <br />
              <label>
                Total 11:ㅤ
                <input
                  type="text"
                  name="campo73"
                  value={datosFormulario.campo73}
                  onChange={manejarCambio}
                />
              </label>
              <br />
              <label>
                RECUERDO DE UNA LISTA DE PALABRAS:ㅤ
                <input
                  type="text"
                  name="campo74"
                  value={datosFormulario.campo74}
                  onChange={manejarCambio}
                />
              </label>
              <br />
              <label>
                Total 10:ㅤ
                <input
                  type="text"
                  name="campo75"
                  value={datosFormulario.campo75}
                  onChange={manejarCambio}
                />
              </label>
              <br />
              <label>
                Total intrusiones:ㅤ
                <input
                  type="text"
                  name="campo76"
                  value={datosFormulario.campo76}
                  onChange={manejarCambio}
                />
              </label>
              <br />
              <label>
                RECONOCIMIENTO DE UNA LISTA DE PALABRAS:ㅤ
                <input
                  type="text"
                  name="campo77"
                  value={datosFormulario.campo77}
                  onChange={manejarCambio}
                />
              </label>
              <br />
              <label>
                Total SI correctos/10:ㅤ
                <input
                  type="text"
                  name="campo78"
                  value={datosFormulario.campo78}
                  onChange={manejarCambio}
                />
              </label>
              <br />
              <label>
                Total NO correctos/10:ㅤ
                <input
                  type="text"
                  name="campo79"
                  value={datosFormulario.campo79}
                  onChange={manejarCambio}
                />
              </label>
              <br />
              <label>
                EVOCACIÓN PRAXIAS CONSTRUCTIVAS:ㅤ
                <input
                  type="text"
                  name="campo80"
                  value={datosFormulario.campo80}
                  onChange={manejarCambio}
                />
              </label>
              <br />
              <label>
                Círculo - Item 1:ㅤ
                <input
                  type="text"
                  name="campo81"
                  value={datosFormulario.campo81}
                  onChange={manejarCambio}
                />
              </label>
              <br />
              <label>
                Rombo - Item 2:ㅤ
                <input
                  type="text"
                  name="campo82"
                  value={datosFormulario.campo82}
                  onChange={manejarCambio}
                />
              </label>
              <br />
              <label>
                Rectángulos - Item 3:ㅤ
                <input
                  type="text"
                  name="campo83"
                  value={datosFormulario.campo83}
                  onChange={manejarCambio}
                />
              </label>
              <br />
              <label>
                Cubo - Item 4:ㅤ
                <input
                  type="text"
                  name="campo84"
                  value={datosFormulario.campo84}
                  onChange={manejarCambio}
                />
              </label>
              <br />
              <label>
                Total 11:ㅤ
                <input
                  type="text"
                  name="campo85"
                  value={datosFormulario.campo85}
                  onChange={manejarCambio}
                />
              </label>
              <br />
              <label>
                TRAIL MAKING TEST (T.M.T) PARTE A:ㅤ
                <input
                  type="text"
                  name="campo86"
                  value={datosFormulario.campo86}
                  onChange={manejarCambio}
                />
              </label>
              <br />
              <label>
                Aciertos /24:ㅤ
                <input
                  type="text"
                  name="campo87"
                  value={datosFormulario.campo87}
                  onChange={manejarCambio}
                />
              </label>
              <br />
              <label>
                Errores:ㅤ
                <input
                  type="text"
                  name="campo88"
                  value={datosFormulario.campo88}
                  onChange={manejarCambio}
                />
              </label>
              <br />
              <label>
                Tiempo en segundos:ㅤ
                <input
                  type="text"
                  name="campo89"
                  value={datosFormulario.campo89}
                  onChange={manejarCambio}
                />
              </label>
              <br />
              <label>
                Ensayo a los 300’’:ㅤ
                <input
                  type="text"
                  name="campo90"
                  value={datosFormulario.campo90}
                  onChange={manejarCambio}
                />
              </label>
              <br />
              <label>
                TRAIL MAKING TEST (T.M.T) PARTE B:ㅤ
                <input
                  type="text"
                  name="campo91"
                  value={datosFormulario.campo91}
                  onChange={manejarCambio}
                />
              </label>
              <br />
              <label>
                Aciertos /24:ㅤ
                <input
                  type="text"
                  name="campo92"
                  value={datosFormulario.campo92}
                  onChange={manejarCambio}
                />
              </label>
              <br />
              <label>
                Errores:ㅤ
                <input
                  type="text"
                  name="campo93"
                  value={datosFormulario.campo93}
                  onChange={manejarCambio}
                />
              </label>
              <br />
              <label>
                Tiempo en segundos:ㅤ
                <input
                  type="text"
                  name="campo94"
                  value={datosFormulario.campo94}
                  onChange={manejarCambio}
                />
              </label>
              <br />
              <label>
                Ensayo a los 300’’:ㅤ
                <input
                  type="text"
                  name="campo95"
                  value={datosFormulario.campo95}
                  onChange={manejarCambio}
                />
              </label>
              <br />
              <label>
                FIGURA COMPLEJA DE REY - OSTERRIETH - COPIA:ㅤ
                <input
                  type="text"
                  name="campo96"
                  value={datosFormulario.campo96}
                  onChange={manejarCambio}
                />
              </label>
              <br />
              <label>
                Tiempo en segundos:ㅤ
                <input
                  type="text"
                  name="campo97"
                  value={datosFormulario.campo97}
                  onChange={manejarCambio}
                />
              </label>
              <br />
              <label>
                Puntaje:ㅤ
                <input
                  type="text"
                  name="campo98"
                  value={datosFormulario.campo98}
                  onChange={manejarCambio}
                />
              </label>
              <br />
              <label>
                FIGURA COMPLEJA DE REY - OSTERRIETH - EVOCACIÓN:ㅤ
                <input
                  type="text"
                  name="campo99"
                  value={datosFormulario.campo99}
                  onChange={manejarCambio}
                />
              </label>
              <br />
              <label>
                Tiempo en segundos:ㅤ
                <input
                  type="text"
                  name="campo100"
                  value={datosFormulario.campo100}
                  onChange={manejarCambio}
                />
              </label>
              <br />
              <label>
                Puntaje:ㅤ
                <input
                  type="text"
                  name="campo101"
                  value={datosFormulario.campo101}
                  onChange={manejarCambio}
                />
              </label>
              <br />
              <label>
                FLUIDEZ VERBAL:ㅤ
                <input
                  type="text"
                  name="campo102"
                  value={datosFormulario.campo102}
                  onChange={manejarCambio}
                />
              </label>
              <br />
              <label>
                Total F:ㅤ
                <input
                  type="text"
                  name="campo103"
                  value={datosFormulario.campo103}
                  onChange={manejarCambio}
                />
              </label>
              <br />
              <label>
                Total A:ㅤ
                <input
                  type="text"
                  name="campo104"
                  value={datosFormulario.campo104}
                  onChange={manejarCambio}
                />
              </label>
              <br />
              <label>
                Total S:ㅤ
                <input
                  type="text"
                  name="campo105"
                  value={datosFormulario.campo105}
                  onChange={manejarCambio}
                />
              </label>
              <br />
              <label>
                Pérdida de categoría:ㅤ
                <input
                  type="text"
                  name="campo106"
                  value={datosFormulario.campo106}
                  onChange={manejarCambio}
                />
              </label>
              <br />
              <label>
                Puntuación total:ㅤ
                <input
                  type="text"
                  name="campo107"
                  value={datosFormulario.campo107}
                  onChange={manejarCambio}
                />
              </label>
              <br />
              <label>
                9. ESCALA DE TRASTORNOS DE MEMORIA:ㅤ
                <input
                  type="text"
                  name="campo108"
                  value={datosFormulario.campo108}
                  onChange={manejarCambio}
                />
              </label>
              <br />
              <label>
                QF Total:ㅤ
                <input
                  type="text"
                  name="campo109"
                  value={datosFormulario.campo109}
                  onChange={manejarCambio}
                />
              </label>
              <br />
              <label>
                QP Total:ㅤ
                <input
                  type="text"
                  name="campo110"
                  value={datosFormulario.campo110}
                  onChange={manejarCambio}
                />
              </label>
              <br />
              <label>
                10. ESCALA GLOBAL DE DETERIORO:ㅤ
                <input
                  type="text"
                  name="campo111"
                  value={datosFormulario.campo111}
                  onChange={manejarCambio}
                />
              </label>
              <br />
              <label>
                Puntaje:ㅤ
                <input
                  type="text"
                  name="campo112"
                  value={datosFormulario.campo112}
                  onChange={manejarCambio}
                />
              </label>
              <br />
              <label>
                11. ESCALA DE BARTHEL DE AVD Y ALIMENTACIÓN:ㅤ
                <input
                  type="text"
                  name="campo113"
                  value={datosFormulario.campo113}
                  onChange={manejarCambio}
                />
              </label>
              <br />
              <label>
                Puntaje /50:ㅤ
                <input
                  type="text"
                  name="campo114"
                  value={datosFormulario.campo114}
                  onChange={manejarCambio}
                />
              </label>
              <br />
              <label>
                12. ESCALA DE LAWTON Y BRODY:ㅤ
                <input
                  type="text"
                  name="campo115"
                  value={datosFormulario.campo115}
                  onChange={manejarCambio}
                />
              </label>
              <br />
              <label>
                Total /5 o Total /8:ㅤ
                <input
                  type="text"
                  name="campo116"
                  value={datosFormulario.campo116}
                  onChange={manejarCambio}
                />
              </label>
              <br />
              <label>
                13. THE TECHONOLOGY - ACTIVITIES OF DAILY LIVING QUESTIONNAIRE (T-ADLQ):ㅤ
                <input
                  type="text"
                  name="campo117"
                  value={datosFormulario.campo117}
                  onChange={manejarCambio}
                />
              </label>
              <br />
              <label>
                Puntaje de deterioro funcional:ㅤ
                <input
                  type="text"
                  name="campo118"
                  value={datosFormulario.campo118}
                  onChange={manejarCambio}
                />
              </label>
              <br />
              <label>
                14. FUNCIONES DETALLADAS DE LA VIDA DIARIA (FDVD):ㅤ
                <input
                  type="text"
                  name="campo119"
                  value={datosFormulario.campo119}
                  onChange={manejarCambio}
                />
              </label>
              <br />
              <label>
                Total funciones relacionales ( R ) (/52):ㅤ
                <input
                  type="text"
                  name="campo120"
                  value={datosFormulario.campo120}
                  onChange={manejarCambio}
                />
              </label>
              <br />
              <label>
                Puntaje de deterioro funcional ( C ) (/30):ㅤ
                <input
                  type="text"
                  name="campo121"
                  value={datosFormulario.campo121}
                  onChange={manejarCambio}
                />
              </label>
              <br />
              <label>
                15.INECO FRONTAL SCREENING (IFS):ㅤ
                <input
                  type="text"
                  name="campo122"
                  value={datosFormulario.campo122}
                  onChange={manejarCambio}
                />
              </label>
              <br />
              <label>
                Índice de Memoria de Trabajo (Dígitos atrás + corsi):ㅤ
                <input
                  type="text"
                  name="campo123"
                  value={datosFormulario.campo123}
                  onChange={manejarCambio}
                />
              </label>
              <br />
              <label>
                Puntaje total:ㅤ
                <input
                  type="text"
                  name="campo124"
                  value={datosFormulario.campo124}
                  onChange={manejarCambio}
                />
              </label>
              <br />

              <br /> <button onClick={manejarSubmit}>Realizar Registro</button>

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
