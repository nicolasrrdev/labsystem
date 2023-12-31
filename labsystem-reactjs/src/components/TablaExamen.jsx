import { useState, useEffect, useRef } from 'react'
import ModalAlert from './ModalAlert'
import AuthService from '../services/auth.service'

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

  const currentUser = AuthService.getCurrentUser()

  const accessTokenRef = useRef(currentUser.accessToken)

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`${BASE_URL}/pacientes`, {
          headers: {
            'Authorization': `Bearer ${accessTokenRef.current}`,
          },
        })
        const data = await response.json()
        setPacientes(data)
        setFilteredPacientes(data)
      } catch (error) {
        setModalAMessage('Error: No se pudo establecer conexión con el servidor')
        setIsModalOpen(true)
        console.error(error)
      }
    }
    fetchData()
  }, [BASE_URL, accessTokenRef])

  const handlePacienteSeleccionado = (e) => {
    setPacienteSeleccionado(e.target.value)
  }

  const handleSubmit1 = (e) => {
    e.preventDefault()
    setIsSubmitting(true)
    fetch(`${BASE_URL}/pacientes/${pacienteSeleccionado}`, {
      headers: {
        'Authorization': `Bearer ${currentUser.accessToken}`,
      },
    })
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
        }))
        setSubmitted(true)
      })
      .catch((error) => {
        if (error.message === 'Hubo un error al obtener los datos') {
          setModalAMessage('Hubo un error al obtener los datos')
          setIsModalOpen(true)
        } else {
          setModalAMessage('Error: No se pudo establecer conexión con el servidor')
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
    if (Array.isArray(pacientes)) {
      const filtered = newSearchTerm === ''
        ? pacientes
        : pacientes.filter((paciente) =>
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
    fechaRegistro: '',
    campo1: '',
    campo2: '',
    campo3: '',
    campo4: '',
    campo5: '',
    campo6: '',
    campo7: '',
    campo8: '',
    campo9: '',
    campo10: '',
    campo11: '',
    campo12: '',
    campo13: '',
    campo14: '',
    campo15: '',
    campo16: '',
    campo17: '',
    campo18: '',
    campo19: '',
    campo20: '',
    campo21: '',
    campo22: '',
    campo23: '',
    campo24: '',
    campo25: '',
    campo26: '',
    campo27: '',
    campo28: '',
    campo29: '',
    campo30: '',
    campo31: '',
    campo32: '',
    campo33: '',
    campo34: '',
    campo35: '',
    campo36: '',
    campo37: '',
    campo38: '',
    campo39: '',
    campo40: '',
    campo41: '',
    campo42: '',
    campo43: '',
    campo44: '',
    campo45: '',
    campo46: '',
    campo47: '',
    campo48: '',
    campo49: '',
    campo50: '',
    campo51: '',
    campo52: '',
    campo53: '',
    campo54: '',
    campo55: '',
    campo56: '',
    campo57: '',
    campo58: '',
    campo59: '',
    campo60: '',
    campo61: '',
    campo62: '',
    campo63: '',
    campo64: '',
    campo65: '',
    campo66: '',
    campo67: '',
    campo68: '',
    campo69: '',
    campo70: '',
    campo71: '',
    campo72: '',
    campo73: '',
    campo74: '',
    campo75: '',
    campo76: '',
    campo77: '',
    campo78: '',
    campo79: '',
    campo80: '',
    campo81: '',
    campo82: '',
    campo83: '',
    campo84: '',
    campo85: '',
    campo86: '',
    campo87: '',
    campo88: '',
    campo89: '',
    campo90: '',
    campo91: '',
    campo92: '',
    campo93: '',
    campo94: '',
    campo95: '',
    campo96: '',
    campo97: '',
    campo98: '',
    campo99: '',
    campo100: '',
    campo101: '',
    campo102: '',
    campo103: '',
    campo104: '',
    campo105: '',
    campo106: '',
    campo107: '',
    campo108: '',
    campo109: '',
    campo110: '',
    campo111: '',
    campo112: '',
    campo113: '',
    campo114: '',
    campo115: '',
    campo116: '',
    campo117: '',
    campo118: '',
    campo119: '',
    campo120: '',
    campo121: '',
    campo122: '',
    campo123: '',
    campo124: '',
  })

  const manejarCambio = (event) => {
    const { name, value } = event.target
    setDatosFormulario((prevDatos) => ({
      ...prevDatos,
      [name]: value,
    }))
  }

  const manejarSubmit = async (event) => {
    event.preventDefault()
    try {
      // console.log('POST:', JSON.stringify(datosFormulario))
      const response = await fetch(`${BASE_URL}/api/tabla_examen/post`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${currentUser.accessToken}`,
        },
        body: JSON.stringify(datosFormulario),
      })
      if (response.ok) {
        console.log('Registro insertado con éxito')
        setRegistroExitoso(true)
      } else {
        // console.log(currentUser.accessToken.substr(currentUser.accessToken))
        setModalAMessage('Error al insertar el registro')
        setIsModalOpen(true)
        console.error('Error al insertar el registro')
      }
    } catch (error) {
      console.error('Error de red:', error)
    }
  }

  const [parteSeleccionada, setParteSeleccionada] = useState('parte1')
  const handleParteClick = (parte) => {
    setParteSeleccionada(parte)
  }

  const maxDate = new Date().toISOString().split('T')[0]

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
                <select name='paciente' value={pacienteSeleccionado} onChange={handlePacienteSeleccionado}>
                  <option value=''>Seleccione un paciente</option>
                  {filteredPacientes && filteredPacientes.length > 0
                    ? filteredPacientes
                      .sort((a, b) => a.nombres.localeCompare(b.nombres))
                      .map((paciente) => (
                        <option key={paciente.id} value={paciente.id}>
                          {paciente.nombres} {paciente.apellidos}
                        </option>
                      ))
                    : <option value='' disabled>No hay pacientes disponibles</option>
                  }
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

            <div>
              <button
                style={{ marginRight: '10px' }}
                onClick={() => handleParteClick('parte1')}
                className={parteSeleccionada === 'parte1' ? 'selected' : ''}
              >Parte 1
              </button>
              <button
                style={{ marginRight: '10px' }}
                onClick={() => handleParteClick('parte2')}
                className={parteSeleccionada === 'parte2' ? 'selected' : ''}
              >Parte 2
              </button>
              <button
                style={{ marginRight: '10px' }}
                onClick={() => handleParteClick('parte3')}
                className={parteSeleccionada === 'parte3' ? 'selected' : ''}
              >Parte 3
              </button>
            </div>
            <br />

            <form>

              <table>
                <tbody>

                  {parteSeleccionada === 'parte1' && (
                    <>
                      <tr>
                        <td>Fecha de registro:ㅤ</td>
                        <td>
                          <input
                            type='date'
                            name='fechaRegistro'
                            value={datosFormulario.fechaRegistro}
                            onChange={manejarCambio}
                            min='2000-01-01'
                            max={maxDate}
                          />
                        </td>
                      </tr>

                      <tr>
                        <td>(1) 1. FCSRT:ㅤ</td>
                        <td>
                          <input
                            type='text'
                            name='campo1'
                            value={datosFormulario.campo1}
                            onChange={manejarCambio}
                          />
                        </td>
                      </tr>

                      <tr>
                        <td>(2) Total identificación:ㅤ</td>
                        <td>
                          <input
                            type='text'
                            name='campo2'
                            value={datosFormulario.campo2}
                            onChange={manejarCambio}
                          />
                        </td>
                      </tr>

                      <tr>
                        <td>(3) FCRST Recuerdo libre ensayo 1:ㅤ</td>
                        <td>
                          <input
                            type='text'
                            name='campo3'
                            value={datosFormulario.campo3}
                            onChange={manejarCambio}
                          />
                        </td>
                      </tr>

                      <tr>
                        <td>(4) FCRST Recuerdo facilitado ensayo 1:ㅤ</td>
                        <td>
                          <input
                            type='text'
                            name='campo4'
                            value={datosFormulario.campo4}
                            onChange={manejarCambio}
                          />
                        </td>
                      </tr>

                      <tr>
                        <td>(5) FCRST Recuerdo libre ensayo 2:ㅤ</td>
                        <td>
                          <input
                            type='text'
                            name='campo5'
                            value={datosFormulario.campo5}
                            onChange={manejarCambio}
                          />
                        </td>
                      </tr>

                      <tr>
                        <td>(6) FCRST Recuerdo facilitado ensayo 2:ㅤ</td>
                        <td>
                          <input
                            type='text'
                            name='campo6'
                            value={datosFormulario.campo6}
                            onChange={manejarCambio}
                          />
                        </td>
                      </tr>

                      <tr>
                        <td>(7) FCRST Recuerdo libre ensayo 3:ㅤ</td>
                        <td>
                          <input
                            type='text'
                            name='campo7'
                            value={datosFormulario.campo7}
                            onChange={manejarCambio}
                          />
                        </td>
                      </tr>

                      <tr>
                        <td>(8) FCRST Recuerdo facilitado ensayo 3:ㅤ</td>
                        <td>
                          <input
                            type='text'
                            name='campo8'
                            value={datosFormulario.campo8}
                            onChange={manejarCambio}
                          />
                        </td>
                      </tr>

                      <tr>
                        <td>(9) FCRST - RECUERDO DIFERIDO Recuerdo libre:ㅤ</td>
                        <td>
                          <input
                            type='text'
                            name='campo9'
                            value={datosFormulario.campo9}
                            onChange={manejarCambio}
                          />
                        </td>
                      </tr>

                      <tr>
                        <td>(10) FCRST - RECUERDO DIFERIDO Recuerdo facilitado:ㅤ</td>
                        <td>
                          <input
                            type='text'
                            name='campo10'
                            value={datosFormulario.campo10}
                            onChange={manejarCambio}
                          />
                        </td>
                      </tr>

                      <tr>
                        <td>(11) FCRST LIBRE TOTAL (0-48):ㅤ</td>
                        <td>
                          <input
                            type='text'
                            name='campo11'
                            value={datosFormulario.campo11}
                            onChange={manejarCambio}
                          />
                        </td>
                      </tr>

                      <tr>
                        <td>(12) FCRST RECUERDO FACILITADO TOTAL (0-48):ㅤ</td>
                        <td>
                          <input
                            type='text'
                            name='campo12'
                            value={datosFormulario.campo12}
                            onChange={manejarCambio}
                          />
                        </td>
                      </tr>

                      <tr>
                        <td>(13) FCRST RECUERDO DIFERIDO LIBRE (0-16):ㅤ</td>
                        <td>
                          <input
                            type='text'
                            name='campo13'
                            value={datosFormulario.campo13}
                            onChange={manejarCambio}
                          />
                        </td>
                      </tr>

                      <tr>
                        <td>(14) FCRST RECUERDO DIFERIDO FACILITADO (0-16):ㅤ</td>
                        <td>
                          <input
                            type='text'
                            name='campo14'
                            value={datosFormulario.campo14}
                            onChange={manejarCambio}
                          />
                        </td>
                      </tr>

                      <tr>
                        <td>(15) 2. TEST VISIÓN DE COLORES - DVORINE:ㅤ</td>
                        <td>
                          <input
                            type='text'
                            name='campo15'
                            value={datosFormulario.campo15}
                            onChange={manejarCambio}
                          />
                        </td>
                      </tr>

                      <tr>
                        <td>(16) Número de errores:ㅤ</td>
                        <td>
                          <input
                            type='text'
                            name='campo16'
                            value={datosFormulario.campo16}
                            onChange={manejarCambio}
                          />
                        </td>
                      </tr>

                      <tr>
                        <td>(17) 3. TEST DE MEMORIA DE TRABAJO VISUAL PARA FORMAS COLORES Y COMBINACIONES:ㅤ</td>
                        <td>
                          <input
                            type='text'
                            name='campo17'
                            value={datosFormulario.campo17}
                            onChange={manejarCambio}
                          />
                        </td>
                      </tr>

                      <tr>
                        <td>(18) Percepción:ㅤ</td>
                        <td>
                          <input
                            type='text'
                            name='campo18'
                            value={datosFormulario.campo18}
                            onChange={manejarCambio}
                          />
                        </td>
                      </tr>

                      <tr>
                        <td>(19) Correctas:ㅤ</td>
                        <td>
                          <input
                            type='text'
                            name='campo19'
                            value={datosFormulario.campo19}
                            onChange={manejarCambio}
                          />
                        </td>
                      </tr>

                      <tr>
                        <td>(20) Porcentaje correctas:ㅤ</td>
                        <td>
                          <input
                            type='text'
                            name='campo20'
                            value={datosFormulario.campo20}
                            onChange={manejarCambio}
                          />
                        </td>
                      </tr>

                      <tr>
                        <td>(21) Tiempo total:ㅤ</td>
                        <td>
                          <input
                            type='text'
                            name='campo21'
                            value={datosFormulario.campo21}
                            onChange={manejarCambio}
                          />
                        </td>
                      </tr>

                      <tr>
                        <td>(22) Forma:ㅤ</td>
                        <td>
                          <input
                            type='text'
                            name='campo22'
                            value={datosFormulario.campo22}
                            onChange={manejarCambio}
                          />
                        </td>
                      </tr>

                      <tr>
                        <td>(23) 2 formas - Correctas:ㅤ</td>
                        <td>
                          <input
                            type='text'
                            name='campo23'
                            value={datosFormulario.campo23}
                            onChange={manejarCambio}
                          />
                        </td>
                      </tr>

                      <tr>
                        <td>(24) 2 formas - Porcentaje correctas:ㅤ</td>
                        <td>
                          <input
                            type='text'
                            name='campo24'
                            value={datosFormulario.campo24}
                            onChange={manejarCambio}
                          />
                        </td>
                      </tr>

                      <tr>
                        <td>(25) 3 formas - Correctas:ㅤ</td>
                        <td>
                          <input
                            type='text'
                            name='campo25'
                            value={datosFormulario.campo25}
                            onChange={manejarCambio}
                          />
                        </td>
                      </tr>

                      <tr>
                        <td>(26) 3 formas - Porcentaje correctas:ㅤ</td>
                        <td>
                          <input
                            type='text'
                            name='campo26'
                            value={datosFormulario.campo26}
                            onChange={manejarCambio}
                          />
                        </td>
                      </tr>

                      <tr>
                        <td>(27) Tiempo total:ㅤ</td>
                        <td>
                          <input
                            type='text'
                            name='campo27'
                            value={datosFormulario.campo27}
                            onChange={manejarCambio}
                          />
                        </td>
                      </tr>

                      <tr>
                        <td>(28) Binding:ㅤ</td>
                        <td>
                          <input
                            type='text'
                            name='campo28'
                            value={datosFormulario.campo28}
                            onChange={manejarCambio}
                          />
                        </td>
                      </tr>

                      <tr>
                        <td>(29) 2 Bindings - Correctas:ㅤ</td>
                        <td>
                          <input
                            type='text'
                            name='campo29'
                            value={datosFormulario.campo29}
                            onChange={manejarCambio}
                          />
                        </td>
                      </tr>

                      <tr>
                        <td>(30) 2 Bindings - Porcentaje correctas:ㅤ</td>
                        <td>
                          <input
                            type='text'
                            name='campo30'
                            value={datosFormulario.campo30}
                            onChange={manejarCambio}
                          />
                        </td>
                      </tr>

                      <tr>
                        <td>(31) 3 Bindings - Correctas:ㅤ</td>
                        <td>
                          <input
                            type='text'
                            name='campo31'
                            value={datosFormulario.campo31}
                            onChange={manejarCambio}
                          />
                        </td>
                      </tr>

                      <tr>
                        <td>(32) 3 Bindings - Porcentaje correctas:ㅤ</td>
                        <td>
                          <input
                            type='text'
                            name='campo32'
                            value={datosFormulario.campo32}
                            onChange={manejarCambio}
                          />
                        </td>
                      </tr>

                      <tr>
                        <td>(33) Tiempo total en segundos:ㅤ</td>
                        <td>
                          <input
                            type='text'
                            name='campo33'
                            value={datosFormulario.campo33}
                            onChange={manejarCambio}
                          />
                        </td>
                      </tr>

                      <tr>
                        <td>(34) 4. ACER:ㅤ</td>
                        <td>
                          <input
                            type='text'
                            name='campo34'
                            value={datosFormulario.campo34}
                            onChange={manejarCambio}
                          />
                        </td>
                      </tr>

                      <tr>
                        <td>(35) ACE Orientación:ㅤ</td>
                        <td>
                          <input
                            type='text'
                            name='campo35'
                            value={datosFormulario.campo35}
                            onChange={manejarCambio}
                          />
                        </td>
                      </tr>

                      <tr>
                        <td>(36) ACE Atención:ㅤ</td>
                        <td>
                          <input
                            type='text'
                            name='campo36'
                            value={datosFormulario.campo36}
                            onChange={manejarCambio}
                          />
                        </td>
                      </tr>

                      <tr>
                        <td>(37) ACE Memoria:ㅤ</td>
                        <td>
                          <input
                            type='text'
                            name='campo37'
                            value={datosFormulario.campo37}
                            onChange={manejarCambio}
                          />
                        </td>
                      </tr>

                      <tr>
                        <td>(38) ACE Fluidez:ㅤ</td>
                        <td>
                          <input
                            type='text'
                            name='campo38'
                            value={datosFormulario.campo38}
                            onChange={manejarCambio}
                          />
                        </td>
                      </tr>

                      <tr>
                        <td>(39) ACE Lenguaje:ㅤ</td>
                        <td>
                          <input
                            type='text'
                            name='campo39'
                            value={datosFormulario.campo39}
                            onChange={manejarCambio}
                          />
                        </td>
                      </tr>

                      <tr>
                        <td>(40) ACE Visoespaciales:ㅤ</td>
                        <td>
                          <input
                            type='text'
                            name='campo40'
                            value={datosFormulario.campo40}
                            onChange={manejarCambio}
                          />
                        </td>
                      </tr>

                      <tr>
                        <td>(41) ACE TOTAL:ㅤ</td>
                        <td>
                          <input
                            type='text'
                            name='campo41'
                            value={datosFormulario.campo41}
                            onChange={manejarCambio}
                          />
                        </td>
                      </tr>

                      <tr>
                        <td>(42) MMSE:ㅤ</td>
                        <td>
                          <input
                            type='text'
                            name='campo42'
                            value={datosFormulario.campo42}
                            onChange={manejarCambio}
                          />
                        </td>
                      </tr>

                      <tr>
                        <td>(43) 5. ECOG:ㅤ</td>
                        <td>
                          <input
                            type='text'
                            name='campo43'
                            value={datosFormulario.campo43}
                            onChange={manejarCambio}
                          />
                        </td>
                      </tr>

                      <tr>
                        <td>(44) ECOG Memoria:ㅤ</td>
                        <td>
                          <input
                            type='text'
                            name='campo44'
                            value={datosFormulario.campo44}
                            onChange={manejarCambio}
                          />
                        </td>
                      </tr>

                      <tr>
                        <td>(45) ECOG Planificación:ㅤ</td>
                        <td>
                          <input
                            type='text'
                            name='campo45'
                            value={datosFormulario.campo45}
                            onChange={manejarCambio}
                          />
                        </td>
                      </tr>

                      <tr>
                        <td>(46) ECOG Lenguaje:ㅤ</td>
                        <td>
                          <input
                            type='text'
                            name='campo46'
                            value={datosFormulario.campo46}
                            onChange={manejarCambio}
                          />
                        </td>
                      </tr>

                      <tr>
                        <td>(47) ECOG Organización:ㅤ</td>
                        <td>
                          <input
                            type='text'
                            name='campo47'
                            value={datosFormulario.campo47}
                            onChange={manejarCambio}
                          />
                        </td>
                      </tr>

                      <tr>
                        <td>(48) ECOG Atención:ㅤ</td>
                        <td>
                          <input
                            type='text'
                            name='campo48'
                            value={datosFormulario.campo48}
                            onChange={manejarCambio}
                          />
                        </td>
                      </tr>

                      <tr>
                        <td>(49) ECOG Visuoespacial:ㅤ</td>
                        <td>
                          <input
                            type='text'
                            name='campo49'
                            value={datosFormulario.campo49}
                            onChange={manejarCambio}
                          />
                        </td>
                      </tr>

                      <tr>
                        <td>(50) ECOG TOTAL:ㅤ</td>
                        <td>
                          <input
                            type='text'
                            name='campo50'
                            value={datosFormulario.campo50}
                            onChange={manejarCambio}
                          />
                        </td>
                      </tr>

                      <tr>
                        <td>(51) 6. ESCALA DEPRESIÓN GERIÁTRICA - YESAVAGE:ㅤ</td>
                        <td>
                          <input
                            type='text'
                            name='campo51'
                            value={datosFormulario.campo51}
                            onChange={manejarCambio}
                          />
                        </td>
                      </tr>

                      <tr>
                        <td>(52) 7. ESCALA DE HACHINSKI:ㅤ</td>
                        <td>
                          <input
                            type='text'
                            name='campo52'
                            value={datosFormulario.campo52}
                            onChange={manejarCambio}
                          />
                        </td>
                      </tr>
                    </>
                  )}

                  {parteSeleccionada === 'parte2' && (
                    <>
                      <tr>
                        <td>(53) 8. CERAD:ㅤ</td>
                        <td>
                          <input
                            type='text'
                            name='campo53'
                            value={datosFormulario.campo53}
                            onChange={manejarCambio}
                          />
                        </td>
                      </tr>

                      <tr>
                        <td>(54) DENOMINACION (Test de Boston):ㅤ</td>
                        <td>
                          <input
                            type='text'
                            name='campo54'
                            value={datosFormulario.campo54}
                            onChange={manejarCambio}
                          />
                        </td>
                      </tr>

                      <tr>
                        <td>(55) Puntaje alta:ㅤ</td>
                        <td>
                          <input
                            type='text'
                            name='campo55'
                            value={datosFormulario.campo55}
                            onChange={manejarCambio}
                          />
                        </td>
                      </tr>

                      <tr>
                        <td>(56) Puntaje media:ㅤ</td>
                        <td>
                          <input
                            type='text'
                            name='campo56'
                            value={datosFormulario.campo56}
                            onChange={manejarCambio}
                          />
                        </td>
                      </tr>

                      <tr>
                        <td>(57) Puntaje baja:ㅤ</td>
                        <td>
                          <input
                            type='text'
                            name='campo57'
                            value={datosFormulario.campo57}
                            onChange={manejarCambio}
                          />
                        </td>
                      </tr>

                      <tr>
                        <td>(58) Puntaje total/15:ㅤ</td>
                        <td>
                          <input
                            type='text'
                            name='campo58'
                            value={datosFormulario.campo58}
                            onChange={manejarCambio}
                          />
                        </td>
                      </tr>

                      <tr>
                        <td>(59) MEMORIA DE UNA LISTA DE PALABRAS:ㅤ</td>
                        <td>
                          <input
                            type='text'
                            name='campo59'
                            value={datosFormulario.campo59}
                            onChange={manejarCambio}
                          />
                        </td>
                      </tr>

                      <tr>
                        <td>(60) Intento 1 totales:ㅤ</td>
                        <td>
                          <input
                            type='text'
                            name='campo60'
                            value={datosFormulario.campo60}
                            onChange={manejarCambio}
                          />
                        </td>
                      </tr>

                      <tr>
                        <td>(61) Intento 1 intrusiones:ㅤ</td>
                        <td>
                          <input
                            type='text'
                            name='campo61'
                            value={datosFormulario.campo61}
                            onChange={manejarCambio}
                          />
                        </td>
                      </tr>

                      <tr>
                        <td>(62) Intento 2 totales:ㅤ</td>
                        <td>
                          <input
                            type='text'
                            name='campo62'
                            value={datosFormulario.campo62}
                            onChange={manejarCambio}
                          />
                        </td>
                      </tr>

                      <tr>
                        <td>(63) Intento 2 intrusiones:ㅤ</td>
                        <td>
                          <input
                            type='text'
                            name='campo63'
                            value={datosFormulario.campo63}
                            onChange={manejarCambio}
                          />
                        </td>
                      </tr>

                      <tr>
                        <td>(64) Intento 3 totales:ㅤ</td>
                        <td>
                          <input
                            type='text'
                            name='campo64'
                            value={datosFormulario.campo64}
                            onChange={manejarCambio}
                          />
                        </td>
                      </tr>

                      <tr>
                        <td>(65) Intento 3 intrusiones:ㅤ</td>
                        <td>
                          <input
                            type='text'
                            name='campo65'
                            value={datosFormulario.campo65}
                            onChange={manejarCambio}
                          />
                        </td>
                      </tr>

                      <tr>
                        <td>(66) Total palabras:ㅤ</td>
                        <td>
                          <input
                            type='text'
                            name='campo66'
                            value={datosFormulario.campo66}
                            onChange={manejarCambio}
                          />
                        </td>
                      </tr>

                      <tr>
                        <td>(67) Total intrusiones:ㅤ</td>
                        <td>
                          <input
                            type='text'
                            name='campo67'
                            value={datosFormulario.campo67}
                            onChange={manejarCambio}
                          />
                        </td>
                      </tr>

                      <tr>
                        <td>(68) PRAXIAS CONSTRUCTIVAS:ㅤ</td>
                        <td>
                          <input
                            type='text'
                            name='campo68'
                            value={datosFormulario.campo68}
                            onChange={manejarCambio}
                          />
                        </td>
                      </tr>

                      <tr>
                        <td>(69) Círculo - Item 1:ㅤ</td>
                        <td>
                          <input
                            type='text'
                            name='campo69'
                            value={datosFormulario.campo69}
                            onChange={manejarCambio}
                          />
                        </td>
                      </tr>

                      <tr>
                        <td>(70) Rombo - Item 2:ㅤ</td>
                        <td>
                          <input
                            type='text'
                            name='campo70'
                            value={datosFormulario.campo70}
                            onChange={manejarCambio}
                          />
                        </td>
                      </tr>

                      <tr>
                        <td>(71) Rectángulos - Item 3:ㅤ</td>
                        <td>
                          <input
                            type='text'
                            name='campo71'
                            value={datosFormulario.campo71}
                            onChange={manejarCambio}
                          />
                        </td>
                      </tr>

                      <tr>
                        <td>(72) Cubo - Item 4:ㅤ</td>
                        <td>
                          <input
                            type='text'
                            name='campo72'
                            value={datosFormulario.campo72}
                            onChange={manejarCambio}
                          />
                        </td>
                      </tr>

                      <tr>
                        <td>(73) Total 11:ㅤ</td>
                        <td>
                          <input
                            type='text'
                            name='campo73'
                            value={datosFormulario.campo73}
                            onChange={manejarCambio}
                          />
                        </td>
                      </tr>

                      <tr>
                        <td>(74) RECUERDO DE UNA LISTA DE PALABRAS:ㅤ</td>
                        <td>
                          <input
                            type='text'
                            name='campo74'
                            value={datosFormulario.campo74}
                            onChange={manejarCambio}
                          />
                        </td>
                      </tr>

                      <tr>
                        <td>(75) Total 10:ㅤ</td>
                        <td>
                          <input
                            type='text'
                            name='campo75'
                            value={datosFormulario.campo75}
                            onChange={manejarCambio}
                          />
                        </td>
                      </tr>

                      <tr>
                        <td>(76) Total intrusiones:ㅤ</td>
                        <td>
                          <input
                            type='text'
                            name='campo76'
                            value={datosFormulario.campo76}
                            onChange={manejarCambio}
                          />
                        </td>
                      </tr>

                      <tr>
                        <td>(77) RECONOCIMIENTO DE UNA LISTA DE PALABRAS:ㅤ</td>
                        <td>
                          <input
                            type='text'
                            name='campo77'
                            value={datosFormulario.campo77}
                            onChange={manejarCambio}
                          />
                        </td>
                      </tr>

                      <tr>
                        <td>(78) Total SI correctos/10:ㅤ</td>
                        <td>
                          <input
                            type='text'
                            name='campo78'
                            value={datosFormulario.campo78}
                            onChange={manejarCambio}
                          />
                        </td>
                      </tr>

                      <tr>
                        <td>(79) Total NO correctos/10:ㅤ</td>
                        <td>
                          <input
                            type='text'
                            name='campo79'
                            value={datosFormulario.campo79}
                            onChange={manejarCambio}
                          />
                        </td>
                      </tr>

                      <tr>
                        <td>(80) EVOCACIÓN PRAXIAS CONSTRUCTIVAS:ㅤ</td>
                        <td>
                          <input
                            type='text'
                            name='campo80'
                            value={datosFormulario.campo80}
                            onChange={manejarCambio}
                          />
                        </td>
                      </tr>

                      <tr>
                        <td>(81) Círculo - Item 1:ㅤ</td>
                        <td>
                          <input
                            type='text'
                            name='campo81'
                            value={datosFormulario.campo81}
                            onChange={manejarCambio}
                          />
                        </td>
                      </tr>

                      <tr>
                        <td>(82) Rombo - Item 2:ㅤ</td>
                        <td>
                          <input
                            type='text'
                            name='campo82'
                            value={datosFormulario.campo82}
                            onChange={manejarCambio}
                          />
                        </td>
                      </tr>

                      <tr>
                        <td>(83) Rectángulos - Item 3:ㅤ</td>
                        <td>
                          <input
                            type='text'
                            name='campo83'
                            value={datosFormulario.campo83}
                            onChange={manejarCambio}
                          />
                        </td>
                      </tr>

                      <tr>
                        <td>(84) Cubo - Item 4:ㅤ</td>
                        <td>
                          <input
                            type='text'
                            name='campo84'
                            value={datosFormulario.campo84}
                            onChange={manejarCambio}
                          />
                        </td>
                      </tr>

                      <tr>
                        <td>(85) Total 11:ㅤ</td>
                        <td>
                          <input
                            type='text'
                            name='campo85'
                            value={datosFormulario.campo85}
                            onChange={manejarCambio}
                          />
                        </td>
                      </tr>

                      <tr>
                        <td>(86) TRAIL MAKING TEST (T.M.T) PARTE A:ㅤ</td>
                        <td>
                          <input
                            type='text'
                            name='campo86'
                            value={datosFormulario.campo86}
                            onChange={manejarCambio}
                          />
                        </td>
                      </tr>

                      <tr>
                        <td>(87) Aciertos /24:ㅤ</td>
                        <td>
                          <input
                            type='text'
                            name='campo87'
                            value={datosFormulario.campo87}
                            onChange={manejarCambio}
                          />
                        </td>
                      </tr>

                      <tr>
                        <td>(88) Errores:ㅤ</td>
                        <td>
                          <input
                            type='text'
                            name='campo88'
                            value={datosFormulario.campo88}
                            onChange={manejarCambio}
                          />
                        </td>
                      </tr>

                      <tr>
                        <td>(89) Tiempo en segundos:ㅤ</td>
                        <td>
                          <input
                            type='text'
                            name='campo89'
                            value={datosFormulario.campo89}
                            onChange={manejarCambio}
                          />
                        </td>
                      </tr>

                      <tr>
                        <td>(90) Ensayo a los 300’’:ㅤ</td>
                        <td>
                          <input
                            type='text'
                            name='campo90'
                            value={datosFormulario.campo90}
                            onChange={manejarCambio}
                          />
                        </td>
                      </tr>

                      <tr>
                        <td>(91) TRAIL MAKING TEST (T.M.T) PARTE B:ㅤ</td>
                        <td>
                          <input
                            type='text'
                            name='campo91'
                            value={datosFormulario.campo91}
                            onChange={manejarCambio}
                          />
                        </td>
                      </tr>

                      <tr>
                        <td>(92) Aciertos /24:ㅤ</td>
                        <td>
                          <input
                            type='text'
                            name='campo92'
                            value={datosFormulario.campo92}
                            onChange={manejarCambio}
                          />
                        </td>
                      </tr>

                      <tr>
                        <td>(93) Errores:ㅤ</td>
                        <td>
                          <input
                            type='text'
                            name='campo93'
                            value={datosFormulario.campo93}
                            onChange={manejarCambio}
                          />
                        </td>
                      </tr>

                      <tr>
                        <td>(94) Tiempo en segundos:ㅤ</td>
                        <td>
                          <input
                            type='text'
                            name='campo94'
                            value={datosFormulario.campo94}
                            onChange={manejarCambio}
                          />
                        </td>
                      </tr>

                      <tr>
                        <td>(95) Ensayo a los 300’’:ㅤ</td>
                        <td>
                          <input
                            type='text'
                            name='campo95'
                            value={datosFormulario.campo95}
                            onChange={manejarCambio}
                          />
                        </td>
                      </tr>

                      <tr>
                        <td>(96) FIGURA COMPLEJA DE REY - OSTERRIETH - COPIA:ㅤ</td>
                        <td>
                          <input
                            type='text'
                            name='campo96'
                            value={datosFormulario.campo96}
                            onChange={manejarCambio}
                          />
                        </td>
                      </tr>

                      <tr>
                        <td>(97) Tiempo en segundos:ㅤ</td>
                        <td>
                          <input
                            type='text'
                            name='campo97'
                            value={datosFormulario.campo97}
                            onChange={manejarCambio}
                          />
                        </td>
                      </tr>

                      <tr>
                        <td>(98) Puntaje:ㅤ</td>
                        <td>
                          <input
                            type='text'
                            name='campo98'
                            value={datosFormulario.campo98}
                            onChange={manejarCambio}
                          />
                        </td>
                      </tr>

                      <tr>
                        <td>(99) FIGURA COMPLEJA DE REY - OSTERRIETH - EVOCACIÓN:ㅤ</td>
                        <td>
                          <input
                            type='text'
                            name='campo99'
                            value={datosFormulario.campo99}
                            onChange={manejarCambio}
                          />
                        </td>
                      </tr>

                      <tr>
                        <td>(100) Tiempo en segundos:ㅤ</td>
                        <td>
                          <input
                            type='text'
                            name='campo100'
                            value={datosFormulario.campo100}
                            onChange={manejarCambio}
                          />
                        </td>
                      </tr>

                      <tr>
                        <td>(101) Puntaje:ㅤ</td>
                        <td>
                          <input
                            type='text'
                            name='campo101'
                            value={datosFormulario.campo101}
                            onChange={manejarCambio}
                          />
                        </td>
                      </tr>

                      <tr>
                        <td>(102) FLUIDEZ VERBAL:ㅤ</td>
                        <td>
                          <input
                            type='text'
                            name='campo102'
                            value={datosFormulario.campo102}
                            onChange={manejarCambio}
                          />
                        </td>
                      </tr>

                      <tr>
                        <td>(103) Total F:ㅤ</td>
                        <td>
                          <input
                            type='text'
                            name='campo103'
                            value={datosFormulario.campo103}
                            onChange={manejarCambio}
                          />
                        </td>
                      </tr>

                      <tr>
                        <td>(104) Total A:ㅤ</td>
                        <td>
                          <input
                            type='text'
                            name='campo104'
                            value={datosFormulario.campo104}
                            onChange={manejarCambio}
                          />
                        </td>
                      </tr>

                      <tr>
                        <td>(105) Total S:ㅤ</td>
                        <td>
                          <input
                            type='text'
                            name='campo105'
                            value={datosFormulario.campo105}
                            onChange={manejarCambio}
                          />
                        </td>
                      </tr>

                      <tr>
                        <td>(106) Pérdida de categoría:ㅤ</td>
                        <td>
                          <input
                            type='text'
                            name='campo106'
                            value={datosFormulario.campo106}
                            onChange={manejarCambio}
                          />
                        </td>
                      </tr>

                      <tr>
                        <td>(107) Puntuación total:ㅤ</td>
                        <td>
                          <input
                            type='text'
                            name='campo107'
                            value={datosFormulario.campo107}
                            onChange={manejarCambio}
                          />
                        </td>
                      </tr>
                    </>
                  )}

                  {parteSeleccionada === 'parte3' && (
                    <>
                      <tr>
                        <td>(108) 9. ESCALA DE TRASTORNOS DE MEMORIA:ㅤ</td>
                        <td>
                          <input
                            type='text'
                            name='campo108'
                            value={datosFormulario.campo108}
                            onChange={manejarCambio}
                          />
                        </td>
                      </tr>

                      <tr>
                        <td>(109) QF Total:ㅤ</td>
                        <td>
                          <input
                            type='text'
                            name='campo109'
                            value={datosFormulario.campo109}
                            onChange={manejarCambio}
                          />
                        </td>
                      </tr>

                      <tr>
                        <td>(110) QP Total:ㅤ</td>
                        <td>
                          <input
                            type='text'
                            name='campo110'
                            value={datosFormulario.campo110}
                            onChange={manejarCambio}
                          />
                        </td>
                      </tr>

                      <tr>
                        <td>(111) 10. ESCALA GLOBAL DE DETERIORO:ㅤ</td>
                        <td>
                          <input
                            type='text'
                            name='campo111'
                            value={datosFormulario.campo111}
                            onChange={manejarCambio}
                          />
                        </td>
                      </tr>

                      <tr>
                        <td>(112) Puntaje:ㅤ</td>
                        <td>
                          <input
                            type='text'
                            name='campo112'
                            value={datosFormulario.campo112}
                            onChange={manejarCambio}
                          />
                        </td>
                      </tr>

                      <tr>
                        <td>(113) 11. ESCALA DE BARTHEL DE AVD Y ALIMENTACIÓN:ㅤ</td>
                        <td>
                          <input
                            type='text'
                            name='campo113'
                            value={datosFormulario.campo113}
                            onChange={manejarCambio}
                          />
                        </td>
                      </tr>

                      <tr>
                        <td>(114) Puntaje /50:ㅤ</td>
                        <td>
                          <input
                            type='text'
                            name='campo114'
                            value={datosFormulario.campo114}
                            onChange={manejarCambio}
                          />
                        </td>
                      </tr>

                      <tr>
                        <td>(115) 12. ESCALA DE LAWTON Y BRODY:ㅤ</td>
                        <td>
                          <input
                            type='text'
                            name='campo115'
                            value={datosFormulario.campo115}
                            onChange={manejarCambio}
                          />
                        </td>
                      </tr>

                      <tr>
                        <td>(116) Total /5 o Total /8:ㅤ</td>
                        <td>
                          <input
                            type='text'
                            name='campo116'
                            value={datosFormulario.campo116}
                            onChange={manejarCambio}
                          />
                        </td>
                      </tr>

                      <tr>
                        <td>(117) 13. THE TECHONOLOGY - ACTIVITIES OF DAILY LIVING QUESTIONNAIRE (T-ADLQ):ㅤ</td>
                        <td>
                          <input
                            type='text'
                            name='campo117'
                            value={datosFormulario.campo117}
                            onChange={manejarCambio}
                          />
                        </td>
                      </tr>

                      <tr>
                        <td>(118) Puntaje de deterioro funcional:ㅤ</td>
                        <td>
                          <input
                            type='text'
                            name='campo118'
                            value={datosFormulario.campo118}
                            onChange={manejarCambio}
                          />
                        </td>
                      </tr>

                      <tr>
                        <td>(119) 14. FUNCIONES DETALLADAS DE LA VIDA DIARIA (FDVD):ㅤ</td>
                        <td>
                          <input
                            type='text'
                            name='campo119'
                            value={datosFormulario.campo119}
                            onChange={manejarCambio}
                          />
                        </td>
                      </tr>

                      <tr>
                        <td>(120) Total funciones relacionales ( R ) (/52):ㅤ</td>
                        <td>
                          <input
                            type='text'
                            name='campo120'
                            value={datosFormulario.campo120}
                            onChange={manejarCambio}
                          />
                        </td>
                      </tr>

                      <tr>
                        <td>(121) Puntaje de deterioro funcional ( C ) (/30):ㅤ</td>
                        <td>
                          <input
                            type='text'
                            name='campo121'
                            value={datosFormulario.campo121}
                            onChange={manejarCambio}
                          />
                        </td>
                      </tr>

                      <tr>
                        <td>(122) 15. INECO FRONTAL SCREENING (IFS):ㅤ</td>
                        <td>
                          <input
                            type='text'
                            name='campo122'
                            value={datosFormulario.campo122}
                            onChange={manejarCambio}
                          />
                        </td>
                      </tr>

                      <tr>
                        <td>(123) Índice de Memoria de Trabajo (Dígitos atrás + corsi):ㅤ</td>
                        <td>
                          <input
                            type='text'
                            name='campo123'
                            value={datosFormulario.campo123}
                            onChange={manejarCambio}
                          />
                        </td>
                      </tr>

                      <tr>
                        <td>(124) Puntaje total:ㅤ</td>
                        <td>
                          <input
                            type='text'
                            name='campo124'
                            value={datosFormulario.campo124}
                            onChange={manejarCambio}
                          />
                        </td>
                      </tr>
                    </>
                  )}

                </tbody>
              </table>

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
