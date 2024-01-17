import { useState, useEffect, useRef } from 'react'
import ModalAlert from './ModalAlert'
import AuthService from '../services/auth.service'

const EditarTablaExamen = () => {
  const BASE_URL = import.meta.env.VITE_BASE_URL
  const [pacientes, setPacientes] = useState([])
  const [pacienteSeleccionado, setPacienteSeleccionado] = useState('')
  const [initialPage, setInitialPage] = useState(true)
  const [submitted1, setSubmitted1] = useState(false)
  const [submitted2, setSubmitted2] = useState(false)
  const [infoPaciente, setInfoPaciente] = useState([])
  const [registroExitoso, setRegistroExitoso] = useState(false)
  const [tablaExamenData, setTablaExamenData] = useState([])
  const [registroSeleccionado, setRegistroSeleccionado] = useState()
  const [dataId, setDataId] = useState()
  const [inputValues, setInputValues] = useState()
  const [fechaFormateada, setFechaFormateada] = useState('')

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

  const handleInputChange = (e) => {
    const { name, value } = e.target
    setInputValues({
      ...inputValues,
      [name]: value,
    })
  }

  useEffect(() => {
    dataId &&
      fetch(`${BASE_URL}/api/tabla_examen/${dataId}`, {
        headers: {
          'Authorization': `Bearer ${accessTokenRef.current}`,
        },
      })
        .then((response) => {
          if (response.status === 404) {
            throw new Error('No se encontró el registro')
          }
          if (response.status === 500) {
            throw new Error('Ha ocurrido un error inesperado')
          }
          return response.json()
        })
        .then((response) => {
          const { fechaRegistro, campo1, campo2, campo3, campo4, campo5, campo6, campo7, campo8, campo9, campo10, campo11, campo12, campo13, campo14, campo15, campo16, campo17, campo18, campo19, campo20, campo21, campo22, campo23, campo24, campo25, campo26, campo27, campo28, campo29, campo30, campo31, campo32, campo33, campo34, campo35, campo36, campo37, campo38, campo39, campo40, campo41, campo42, campo43, campo44, campo45, campo46, campo47, campo48, campo49, campo50, campo51, campo52, campo53, campo54, campo55, campo56, campo57, campo58, campo59, campo60, campo61, campo62, campo63, campo64, campo65, campo66, campo67, campo68, campo69, campo70, campo71, campo72, campo73, campo74, campo75, campo76, campo77, campo78, campo79, campo80, campo81, campo82, campo83, campo84, campo85, campo86, campo87, campo88, campo89, campo90, campo91, campo92, campo93, campo94, campo95, campo96, campo97, campo98, campo99, campo100, campo101, campo102, campo103, campo104, campo105, campo106, campo107, campo108, campo109, campo110, campo111, campo112, campo113, campo114, campo115, campo116, campo117, campo118, campo119, campo120, campo121, campo122, campo123, campo124 } = response
          setInputValues({
            fechaRegistro: fechaRegistro || '',
            campo1: campo1 || '',
            campo2: campo2 || '',
            campo3: campo3 || '',
            campo4: campo4 || '',
            campo5: campo5 || '',
            campo6: campo6 || '',
            campo7: campo7 || '',
            campo8: campo8 || '',
            campo9: campo9 || '',
            campo10: campo10 || '',
            campo11: campo11 || '',
            campo12: campo12 || '',
            campo13: campo13 || '',
            campo14: campo14 || '',
            campo15: campo15 || '',
            campo16: campo16 || '',
            campo17: campo17 || '',
            campo18: campo18 || '',
            campo19: campo19 || '',
            campo20: campo20 || '',
            campo21: campo21 || '',
            campo22: campo22 || '',
            campo23: campo23 || '',
            campo24: campo24 || '',
            campo25: campo25 || '',
            campo26: campo26 || '',
            campo27: campo27 || '',
            campo28: campo28 || '',
            campo29: campo29 || '',
            campo30: campo30 || '',
            campo31: campo31 || '',
            campo32: campo32 || '',
            campo33: campo33 || '',
            campo34: campo34 || '',
            campo35: campo35 || '',
            campo36: campo36 || '',
            campo37: campo37 || '',
            campo38: campo38 || '',
            campo39: campo39 || '',
            campo40: campo40 || '',
            campo41: campo41 || '',
            campo42: campo42 || '',
            campo43: campo43 || '',
            campo44: campo44 || '',
            campo45: campo45 || '',
            campo46: campo46 || '',
            campo47: campo47 || '',
            campo48: campo48 || '',
            campo49: campo49 || '',
            campo50: campo50 || '',
            campo51: campo51 || '',
            campo52: campo52 || '',
            campo53: campo53 || '',
            campo54: campo54 || '',
            campo55: campo55 || '',
            campo56: campo56 || '',
            campo57: campo57 || '',
            campo58: campo58 || '',
            campo59: campo59 || '',
            campo60: campo60 || '',
            campo61: campo61 || '',
            campo62: campo62 || '',
            campo63: campo63 || '',
            campo64: campo64 || '',
            campo65: campo65 || '',
            campo66: campo66 || '',
            campo67: campo67 || '',
            campo68: campo68 || '',
            campo69: campo69 || '',
            campo70: campo70 || '',
            campo71: campo71 || '',
            campo72: campo72 || '',
            campo73: campo73 || '',
            campo74: campo74 || '',
            campo75: campo75 || '',
            campo76: campo76 || '',
            campo77: campo77 || '',
            campo78: campo78 || '',
            campo79: campo79 || '',
            campo80: campo80 || '',
            campo81: campo81 || '',
            campo82: campo82 || '',
            campo83: campo83 || '',
            campo84: campo84 || '',
            campo85: campo85 || '',
            campo86: campo86 || '',
            campo87: campo87 || '',
            campo88: campo88 || '',
            campo89: campo89 || '',
            campo90: campo90 || '',
            campo91: campo91 || '',
            campo92: campo92 || '',
            campo93: campo93 || '',
            campo94: campo94 || '',
            campo95: campo95 || '',
            campo96: campo96 || '',
            campo97: campo97 || '',
            campo98: campo98 || '',
            campo99: campo99 || '',
            campo100: campo100 || '',
            campo101: campo101 || '',
            campo102: campo102 || '',
            campo103: campo103 || '',
            campo104: campo104 || '',
            campo105: campo105 || '',
            campo106: campo106 || '',
            campo107: campo107 || '',
            campo108: campo108 || '',
            campo109: campo109 || '',
            campo110: campo110 || '',
            campo111: campo111 || '',
            campo112: campo112 || '',
            campo113: campo113 || '',
            campo114: campo114 || '',
            campo115: campo115 || '',
            campo116: campo116 || '',
            campo117: campo117 || '',
            campo118: campo118 || '',
            campo119: campo119 || '',
            campo120: campo120 || '',
            campo121: campo121 || '',
            campo122: campo122 || '',
            campo123: campo123 || '',
            campo124: campo124 || '',
          })
        })
        .catch((error) => {
          console.error(error)
        })
  }, [BASE_URL, dataId, accessTokenRef])

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

  useEffect(() => {
    if (pacienteSeleccionado) {
      fetch(`${BASE_URL}/pacientes/${pacienteSeleccionado}`, {
        headers: {
          'Authorization': `Bearer ${accessTokenRef.current}`,
        },
      })
        .then((response) => response.json())
        .then((data) => {
          setInfoPaciente(data)
        })
        .catch((error) => {
          console.error(error)
        })
    }
  }, [BASE_URL, pacienteSeleccionado, accessTokenRef])

  const handlePacienteSeleccionado = (e) => {
    setPacienteSeleccionado(e.target.value)
  }

  const handleSubmit1 = async (e) => {
    e.preventDefault()
    try {
      const response = await fetch(`${BASE_URL}/api/tabla_examen/por_paciente/${pacienteSeleccionado}`, {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${currentUser.accessToken}`,
        },
      })
      if (response.ok) {
        const data = await response.json()
        setTablaExamenData(data)
        setSubmitted1(true)
        setInitialPage(false)
        const partesFecha = infoPaciente.fechaNacimiento.split('-')
        const fechaFormateada2 = `${partesFecha[2]}-${partesFecha[1]}-${partesFecha[0]}`
        setFechaFormateada(fechaFormateada2)
      } else if (response.status === 404) {
        throw new Error('No se encontró el registro')
      } else {
        throw new Error('Ha ocurrido un error inesperado')
      }
    } catch (error) {
      console.log(error)
    } finally {
      setIsSubmitting(false)
    }
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

  const handleRegistroSeleccionado = (e) => {
    const selectedOption = e.target.options[e.target.selectedIndex]
    const selectedTimestamp = e.target.value
    const selectedId = selectedOption.dataset.id
    if (selectedTimestamp === '') {
      setRegistroSeleccionado(undefined)
    } else {
      setRegistroSeleccionado(selectedTimestamp)
    }
    setDataId(selectedId)
  }

  const handleSubmit2 = (e) => {
    e.preventDefault()
    setIsSubmitting(true)
    fetch(`${BASE_URL}/api/tabla_examen/${dataId}`, {
      headers: {
        'Authorization': `Bearer ${currentUser.accessToken}`,
      },
    })
      .then((response) => {
        if (response.status === 404) {
          throw new Error('No se encontró el registro')
        }
        if (response.status === 500) {
          throw new Error('Ha ocurrido un error inesperado')
        }
        return response.json()
      })
      .then(() => {
        setSubmitted1(false)
        setSubmitted2(true)
      })
      .catch((error) => {
        if (error.message === 'No se encontró el registro') {
          setModalAMessage('No se encontró el registro')
        } else if (error.message === 'Ha ocurrido un error inesperado') {
          setModalAMessage('Ha ocurrido un error inesperado')
        } else {
          setModalAMessage('Error: No se pudo establecer conexión con el servidor.')
          console.error(error)
        }
        setIsModalOpen(true)
      })
      .finally(() => {
        setIsSubmitting(false)
      })
  }

  const handleSubmit3 = (e) => {
    e.preventDefault()
    setIsSubmitting(true)
    const requestData = {
      fechaRegistro: inputValues.fechaRegistro || '',
      campo1: inputValues.campo1 || '',
      campo2: inputValues.campo2 || '',
      campo3: inputValues.campo3 || '',
      campo4: inputValues.campo4 || '',
      campo5: inputValues.campo5 || '',
      campo6: inputValues.campo6 || '',
      campo7: inputValues.campo7 || '',
      campo8: inputValues.campo8 || '',
      campo9: inputValues.campo9 || '',
      campo10: inputValues.campo10 || '',
      campo11: inputValues.campo11 || '',
      campo12: inputValues.campo12 || '',
      campo13: inputValues.campo13 || '',
      campo14: inputValues.campo14 || '',
      campo15: inputValues.campo15 || '',
      campo16: inputValues.campo16 || '',
      campo17: inputValues.campo17 || '',
      campo18: inputValues.campo18 || '',
      campo19: inputValues.campo19 || '',
      campo20: inputValues.campo20 || '',
      campo21: inputValues.campo21 || '',
      campo22: inputValues.campo22 || '',
      campo23: inputValues.campo23 || '',
      campo24: inputValues.campo24 || '',
      campo25: inputValues.campo25 || '',
      campo26: inputValues.campo26 || '',
      campo27: inputValues.campo27 || '',
      campo28: inputValues.campo28 || '',
      campo29: inputValues.campo29 || '',
      campo30: inputValues.campo30 || '',
      campo31: inputValues.campo31 || '',
      campo32: inputValues.campo32 || '',
      campo33: inputValues.campo33 || '',
      campo34: inputValues.campo34 || '',
      campo35: inputValues.campo35 || '',
      campo36: inputValues.campo36 || '',
      campo37: inputValues.campo37 || '',
      campo38: inputValues.campo38 || '',
      campo39: inputValues.campo39 || '',
      campo40: inputValues.campo40 || '',
      campo41: inputValues.campo41 || '',
      campo42: inputValues.campo42 || '',
      campo43: inputValues.campo43 || '',
      campo44: inputValues.campo44 || '',
      campo45: inputValues.campo45 || '',
      campo46: inputValues.campo46 || '',
      campo47: inputValues.campo47 || '',
      campo48: inputValues.campo48 || '',
      campo49: inputValues.campo49 || '',
      campo50: inputValues.campo50 || '',
      campo51: inputValues.campo51 || '',
      campo52: inputValues.campo52 || '',
      campo53: inputValues.campo53 || '',
      campo54: inputValues.campo54 || '',
      campo55: inputValues.campo55 || '',
      campo56: inputValues.campo56 || '',
      campo57: inputValues.campo57 || '',
      campo58: inputValues.campo58 || '',
      campo59: inputValues.campo59 || '',
      campo60: inputValues.campo60 || '',
      campo61: inputValues.campo61 || '',
      campo62: inputValues.campo62 || '',
      campo63: inputValues.campo63 || '',
      campo64: inputValues.campo64 || '',
      campo65: inputValues.campo65 || '',
      campo66: inputValues.campo66 || '',
      campo67: inputValues.campo67 || '',
      campo68: inputValues.campo68 || '',
      campo69: inputValues.campo69 || '',
      campo70: inputValues.campo70 || '',
      campo71: inputValues.campo71 || '',
      campo72: inputValues.campo72 || '',
      campo73: inputValues.campo73 || '',
      campo74: inputValues.campo74 || '',
      campo75: inputValues.campo75 || '',
      campo76: inputValues.campo76 || '',
      campo77: inputValues.campo77 || '',
      campo78: inputValues.campo78 || '',
      campo79: inputValues.campo79 || '',
      campo80: inputValues.campo80 || '',
      campo81: inputValues.campo81 || '',
      campo82: inputValues.campo82 || '',
      campo83: inputValues.campo83 || '',
      campo84: inputValues.campo84 || '',
      campo85: inputValues.campo85 || '',
      campo86: inputValues.campo86 || '',
      campo87: inputValues.campo87 || '',
      campo88: inputValues.campo88 || '',
      campo89: inputValues.campo89 || '',
      campo90: inputValues.campo90 || '',
      campo91: inputValues.campo91 || '',
      campo92: inputValues.campo92 || '',
      campo93: inputValues.campo93 || '',
      campo94: inputValues.campo94 || '',
      campo95: inputValues.campo95 || '',
      campo96: inputValues.campo96 || '',
      campo97: inputValues.campo97 || '',
      campo98: inputValues.campo98 || '',
      campo99: inputValues.campo99 || '',
      campo100: inputValues.campo100 || '',
      campo101: inputValues.campo101 || '',
      campo102: inputValues.campo102 || '',
      campo103: inputValues.campo103 || '',
      campo104: inputValues.campo104 || '',
      campo105: inputValues.campo105 || '',
      campo106: inputValues.campo106 || '',
      campo107: inputValues.campo107 || '',
      campo108: inputValues.campo108 || '',
      campo109: inputValues.campo109 || '',
      campo110: inputValues.campo110 || '',
      campo111: inputValues.campo111 || '',
      campo112: inputValues.campo112 || '',
      campo113: inputValues.campo113 || '',
      campo114: inputValues.campo114 || '',
      campo115: inputValues.campo115 || '',
      campo116: inputValues.campo116 || '',
      campo117: inputValues.campo117 || '',
      campo118: inputValues.campo118 || '',
      campo119: inputValues.campo119 || '',
      campo120: inputValues.campo120 || '',
      campo121: inputValues.campo121 || '',
      campo122: inputValues.campo122 || '',
      campo123: inputValues.campo123 || '',
      campo124: inputValues.campo124 || '',
    }
    fetch(`${BASE_URL}/api/tabla_examen/${dataId}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${currentUser.accessToken}`,
      },
      body: JSON.stringify(requestData),
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error('Hubo un error al enviar los datos')
        }
        setRegistroExitoso(true)
      })
      .catch((error) => {
        if (error.message === 'Hubo un error al enviar los datos') {
          setModalAMessage('Hubo un error al enviar los datos')
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

  const mapaTipoDocumento = {
    CEDULA_DE_CIUDADANIA: 'Cédula de Ciudadanía',
    CEDULA_DE_EXTRANJERIA: 'Cédula de Extranjeria',
    PASAPORTE: 'Pasaporte',
    REGISTRO_CIVIL: 'Registro Civil',
    TARJETA_DE_IDENTIDAD: 'Tarjeta de Identidad'
  }
  const mapaGenero = {
    MASCULINO: 'Masculino',
    FEMENINO: 'Femenino',
    OTRO: 'Otro',
  }

  const fechaNacimiento = new Date(infoPaciente.fechaNacimiento)
  const fechaActual = new Date()
  let edad = fechaActual.getFullYear() - fechaNacimiento.getFullYear()
  if (
    fechaActual.getMonth() < fechaNacimiento.getMonth() ||
    (fechaActual.getMonth() === fechaNacimiento.getMonth() &&
      fechaActual.getDate() < fechaNacimiento.getDate())
  ) {
    edad--
  }

  const downloadData = async () => {
    try {
      const response = await fetch(`${BASE_URL}/api/tabla_examen/${dataId}`, {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${currentUser.accessToken}`,
        },
      })
      if (!response.ok) {
        throw new Error('No se pudo obtener los datos')
      }
      const data = await response.json()
      if (typeof data !== 'object' || Array.isArray(data)) {
        throw new Error('Los datos no son válidos para la descarga')
      }
      let csvContent = 'Nombre;Tipo Documento;Documento;Fecha de nacimiento;Edad;Email;Género;Fecha de registro;(1) 1. FCSRT;(2) Total identificación;(3) FCRST Recuerdo libre ensayo 1;(4) FCRST Recuerdo facilitado ensayo 1;(5) FCRST Recuerdo libre ensayo 2;(6) FCRST Recuerdo facilitado ensayo 2;(7) FCRST Recuerdo libre ensayo 3;(8) FCRST Recuerdo facilitado ensayo 3;(9) FCRST - RECUERDO DIFERIDO Recuerdo libre;(10) FCRST - RECUERDO DIFERIDO Recuerdo facilitado;(11) FCRST LIBRE TOTAL (0-48);(12) FCRST RECUERDO FACILITADO TOTAL (0-48);(13) FCRST RECUERDO DIFERIDO LIBRE (0-16);(14) FCRST RECUERDO DIFERIDO FACILITADO (0-16);(15) 2. TEST VISIÓN DE COLORES - DVORINE;(16) Número de errores;(17) 3. TEST DE MEMORIA DE TRABAJO VISUAL PARA FORMAS COLORES Y COMBINACIONES;(18) Percepción;(19) Correctas;(20) Porcentaje correctas;(21) Tiempo total;(22) Forma;(23) 2 formas - Correctas;(24) 2 formas - Porcentaje correctas;(25) 3 formas - Correctas;(26) 3 formas - Porcentaje correctas;(27) Tiempo total;(28) Binding;(29) 2 Bindings - Correctas;(30) 2 Bindings - Porcentaje correctas;(31) 3 Bindings - Correctas;(32) 3 Bindings - Porcentaje correctas;(33) Tiempo total en segundos;(34) 4. ACER;(35) ACE Orientación;(36) ACE Atención;(37) ACE Memoria;(38) ACE Fluidez;(39) ACE Lenguaje;(40) ACE Visoespaciales;(41) ACE TOTAL;(42) MMSE;(43) 5. ECOG;(44) ECOG Memoria;(45) ECOG Planificación;(46) ECOG Lenguaje;(47) ECOG Organización;(48) ECOG Atención;(49) ECOG Visuoespacial;(50) ECOG TOTAL;(51) 6. ESCALA DEPRESIÓN GERIÁTRICA - YESAVAGE;(52) 7. ESCALA DE HACHINSKI;(53) 8. CERAD;(54) DENOMINACION (Test de Boston);(55) Puntaje alta;(56) Puntaje media;(57) Puntaje baja;(58) Puntaje total/15;(59) MEMORIA DE UNA LISTA DE PALABRAS;(60) Intento 1 totales;(61) Intento 1 intrusiones;(62) Intento 2 totales;(63) Intento 2 intrusiones;(64) Intento 3 totales;(65) Intento 3 intrusiones;(66) Total palabras;(67) Total intrusiones;(68) PRAXIAS CONSTRUCTIVAS;(69) Círculo - Item 1;(70) Rombo - Item 2;(71) Rectángulos - Item 3;(72) Cubo - Item 4;(73) Total 11;(74) RECUERDO DE UNA LISTA DE PALABRAS;(75) Total 10;(76) Total intrusiones;(77) RECONOCIMIENTO DE UNA LISTA DE PALABRAS;(78) Total SI correctos/10;(79) Total NO correctos/10;(80) EVOCACIÓN PRAXIAS CONSTRUCTIVAS;(81) Círculo - Item 1;(82) Rombo - Item 2;(83) Rectángulos - Item 3;(84) Cubo - Item 4;(85) Total 11;(86) TRAIL MAKING TEST (T.M.T) PARTE A;(87) Aciertos /24;(88) Errores;(89) Tiempo en segundos;(90) Ensayo a los 300’’;(91) TRAIL MAKING TEST (T.M.T) PARTE B;(92) Aciertos /24;(93) Errores;(94) Tiempo en segundos;(95) Ensayo a los 300’’;(96) FIGURA COMPLEJA DE REY - OSTERRIETH - COPIA;(97) Tiempo en segundos;(98) Puntaje;(99) FIGURA COMPLEJA DE REY - OSTERRIETH - EVOCACIÓN;(100) Tiempo en segundos;(101) Puntaje;(102) FLUIDEZ VERBAL;(103) Total F;(104) Total A;(105) Total S;(106) Pérdida de categoría;(107) Puntuación total;(108) 9. ESCALA DE TRASTORNOS DE MEMORIA;(109) QF Total;(110) QP Total;(111) 10. ESCALA GLOBAL DE DETERIORO;(112) Puntaje;(113) 11. ESCALA DE BARTHEL DE AVD Y ALIMENTACIÓN;(114) Puntaje /50;(115) 12. ESCALA DE LAWTON Y BRODY;(116) Total /5 o Total /8;(117) 13. THE TECHONOLOGY - ACTIVITIES OF DAILY LIVING QUESTIONNAIRE (T-ADLQ);(118) Puntaje de deterioro funcional;(119) 14. FUNCIONES DETALLADAS DE LA VIDA DIARIA (FDVD);(120) Total funciones relacionales ( R ) (/52);(121) Puntaje de deterioro funcional ( C ) (/30);(122) 15. INECO FRONTAL SCREENING (IFS);(123) Índice de Memoria de Trabajo (Dígitos atrás + corsi);(124) Puntaje total\n';
      const csvRow = `${infoPaciente.nombres + ' ' + infoPaciente.apellidos};${mapaTipoDocumento[infoPaciente.tipoDocumento]};${infoPaciente.documento};${fechaFormateada};${edad};${infoPaciente.email};${mapaGenero[infoPaciente.genero]};${data.fechaRegistro || ''};${data.campo1 || ''};${data.campo2 || ''};${data.campo3 || ''};${data.campo4 || ''};${data.campo5 || ''};${data.campo6 || ''};${data.campo7 || ''};${data.campo8 || ''};${data.campo9 || ''};${data.campo10 || ''};${data.campo11 || ''};${data.campo12 || ''};${data.campo13 || ''};${data.campo14 || ''};${data.campo15 || ''};${data.campo16 || ''};${data.campo17 || ''};${data.campo18 || ''};${data.campo19 || ''};${data.campo20 || ''};${data.campo21 || ''};${data.campo22 || ''};${data.campo23 || ''};${data.campo24 || ''};${data.campo25 || ''};${data.campo26 || ''};${data.campo27 || ''};${data.campo28 || ''};${data.campo29 || ''};${data.campo30 || ''};${data.campo31 || ''};${data.campo32 || ''};${data.campo33 || ''};${data.campo34 || ''};${data.campo35 || ''};${data.campo36 || ''};${data.campo37 || ''};${data.campo38 || ''};${data.campo39 || ''};${data.campo40 || ''};${data.campo41 || ''};${data.campo42 || ''};${data.campo43 || ''};${data.campo44 || ''};${data.campo45 || ''};${data.campo46 || ''};${data.campo47 || ''};${data.campo48 || ''};${data.campo49 || ''};${data.campo50 || ''};${data.campo51 || ''};${data.campo52 || ''};${data.campo53 || ''};${data.campo54 || ''};${data.campo55 || ''};${data.campo56 || ''};${data.campo57 || ''};${data.campo58 || ''};${data.campo59 || ''};${data.campo60 || ''};${data.campo61 || ''};${data.campo62 || ''};${data.campo63 || ''};${data.campo64 || ''};${data.campo65 || ''};${data.campo66 || ''};${data.campo67 || ''};${data.campo68 || ''};${data.campo69 || ''};${data.campo70 || ''};${data.campo71 || ''};${data.campo72 || ''};${data.campo73 || ''};${data.campo74 || ''};${data.campo75 || ''};${data.campo76 || ''};${data.campo77 || ''};${data.campo78 || ''};${data.campo79 || ''};${data.campo80 || ''};${data.campo81 || ''};${data.campo82 || ''};${data.campo83 || ''};${data.campo84 || ''};${data.campo85 || ''};${data.campo86 || ''};${data.campo87 || ''};${data.campo88 || ''};${data.campo89 || ''};${data.campo90 || ''};${data.campo91 || ''};${data.campo92 || ''};${data.campo93 || ''};${data.campo94 || ''};${data.campo95 || ''};${data.campo96 || ''};${data.campo97 || ''};${data.campo98 || ''};${data.campo99 || ''};${data.campo100 || ''};${data.campo101 || ''};${data.campo102 || ''};${data.campo103 || ''};${data.campo104 || ''};${data.campo105 || ''};${data.campo106 || ''};${data.campo107 || ''};${data.campo108 || ''};${data.campo109 || ''};${data.campo110 || ''};${data.campo111 || ''};${data.campo112 || ''};${data.campo113 || ''};${data.campo114 || ''};${data.campo115 || ''};${data.campo116 || ''};${data.campo117 || ''};${data.campo118 || ''};${data.campo119 || ''};${data.campo120 || ''};${data.campo121 || ''};${data.campo122 || ''};${data.campo123 || ''};${data.campo124 || ''}`
      csvContent += csvRow
      const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' })
      const link = document.createElement('a')
      if (link.download !== undefined) {
        const url = URL.createObjectURL(blob)
        link.setAttribute('href', url)
        link.setAttribute('download', `data.csv`)
        document.body.appendChild(link)
        link.click()
        document.body.removeChild(link)
        URL.revokeObjectURL(url)
      } else {
        throw new Error('El navegador no soporta la descarga de archivos')
      }
    } catch (error) {
      console.error(error)
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
          <h2>Registro editado con éxito</h2>
          <br />
          <button onClick={handleReloadPage}>Editar otro Registro</button>
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
      {initialPage && (
        <center>
          <div>
            <br />
            <h2>Editar Tabla de Datos y Exámenes</h2> <br />
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
      {submitted1 && (
        <center>
          <div>
            <br />
            <h2>Editar Tabla de Datos y Exámenes</h2>
            <p>Paciente: {infoPaciente.nombres + ' ' + infoPaciente.apellidos}</p>
            <form onSubmit={handleSubmit2}>
              <label className='labelFontSize' htmlFor='timestampSelect'>Registro: </label>
              <select id='timestampSelect' onChange={handleRegistroSeleccionado}>
                <option value=''>Seleccione un registro</option>
                {tablaExamenData
                  .filter(item => item.pacienteId === parseInt(pacienteSeleccionado))
                  .sort((a, b) => new Date(b.timestampColumn) - new Date(a.timestampColumn))
                  .map(item => (
                    <option key={item.timestampColumn} value={item.timestampColumn} data-id={item.id}>
                      {new Date(item.timestampColumn).toLocaleString()}
                    </option>
                  ))}
              </select>
              <br /> <br />
              <button type='submit' disabled={registroSeleccionado === undefined || isSubmitting}>Continuar</button>
              <br /> <br /> <button className='btnVolv' onClick={handleReloadPage}>Volver</button> <br />
            </form>
          </div> <br />
        </center>
      )}
      {submitted2 && (
        <center>
          <div className='tableContainer'> <br />
            <h2>Editar Tabla de Datos y Exámenes</h2>
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

            <form onSubmit={handleSubmit3}>

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
                            value={inputValues.fechaRegistro || ''}
                            onChange={handleInputChange}
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
                            value={inputValues.campo1 || ''}
                            onChange={handleInputChange}
                          />
                        </td>
                      </tr>

                      <tr>
                        <td>(2) Total identificación:ㅤ</td>
                        <td>
                          <input
                            type='text'
                            name='campo2'
                            value={inputValues.campo2 || ''}
                            onChange={handleInputChange}
                          />
                        </td>
                      </tr>

                      <tr>
                        <td>(3) FCRST Recuerdo libre ensayo 1:ㅤ</td>
                        <td>
                          <input
                            type='text'
                            name='campo3'
                            value={inputValues.campo3 || ''}
                            onChange={handleInputChange}
                          />
                        </td>
                      </tr>

                      <tr>
                        <td>(4) FCRST Recuerdo facilitado ensayo 1:ㅤ</td>
                        <td>
                          <input
                            type='text'
                            name='campo4'
                            value={inputValues.campo4 || ''}
                            onChange={handleInputChange}
                          />
                        </td>
                      </tr>

                      <tr>
                        <td>(5) FCRST Recuerdo libre ensayo 2:ㅤ</td>
                        <td>
                          <input
                            type='text'
                            name='campo5'
                            value={inputValues.campo5 || ''}
                            onChange={handleInputChange}
                          />
                        </td>
                      </tr>

                      <tr>
                        <td>(6) FCRST Recuerdo facilitado ensayo 2:ㅤ</td>
                        <td>
                          <input
                            type='text'
                            name='campo6'
                            value={inputValues.campo6 || ''}
                            onChange={handleInputChange}
                          />
                        </td>
                      </tr>

                      <tr>
                        <td>(7) FCRST Recuerdo libre ensayo 3:ㅤ</td>
                        <td>
                          <input
                            type='text'
                            name='campo7'
                            value={inputValues.campo7 || ''}
                            onChange={handleInputChange}
                          />
                        </td>
                      </tr>

                      <tr>
                        <td>(8) FCRST Recuerdo facilitado ensayo 3:ㅤ</td>
                        <td>
                          <input
                            type='text'
                            name='campo8'
                            value={inputValues.campo8 || ''}
                            onChange={handleInputChange}
                          />
                        </td>
                      </tr>

                      <tr>
                        <td>(9) FCRST - RECUERDO DIFERIDO Recuerdo libre:ㅤ</td>
                        <td>
                          <input
                            type='text'
                            name='campo9'
                            value={inputValues.campo9 || ''}
                            onChange={handleInputChange}
                          />
                        </td>
                      </tr>

                      <tr>
                        <td>(10) FCRST - RECUERDO DIFERIDO Recuerdo facilitado:ㅤ</td>
                        <td>
                          <input
                            type='text'
                            name='campo10'
                            value={inputValues.campo10 || ''}
                            onChange={handleInputChange}
                          />
                        </td>
                      </tr>

                      <tr>
                        <td>(11) FCRST LIBRE TOTAL (0-48):ㅤ</td>
                        <td>
                          <input
                            type='text'
                            name='campo11'
                            value={inputValues.campo11 || ''}
                            onChange={handleInputChange}
                          />
                        </td>
                      </tr>

                      <tr>
                        <td>(12) FCRST RECUERDO FACILITADO TOTAL (0-48):ㅤ</td>
                        <td>
                          <input
                            type='text'
                            name='campo12'
                            value={inputValues.campo12 || ''}
                            onChange={handleInputChange}
                          />
                        </td>
                      </tr>

                      <tr>
                        <td>(13) FCRST RECUERDO DIFERIDO LIBRE (0-16):ㅤ</td>
                        <td>
                          <input
                            type='text'
                            name='campo13'
                            value={inputValues.campo13 || ''}
                            onChange={handleInputChange}
                          />
                        </td>
                      </tr>

                      <tr>
                        <td>(14) FCRST RECUERDO DIFERIDO FACILITADO (0-16):ㅤ</td>
                        <td>
                          <input
                            type='text'
                            name='campo14'
                            value={inputValues.campo14 || ''}
                            onChange={handleInputChange}
                          />
                        </td>
                      </tr>

                      <tr>
                        <td>(15) 2. TEST VISIÓN DE COLORES - DVORINE:ㅤ</td>
                        <td>
                          <input
                            type='text'
                            name='campo15'
                            value={inputValues.campo15 || ''}
                            onChange={handleInputChange}
                          />
                        </td>
                      </tr>

                      <tr>
                        <td>(16) Número de errores:ㅤ</td>
                        <td>
                          <input
                            type='text'
                            name='campo16'
                            value={inputValues.campo16 || ''}
                            onChange={handleInputChange}
                          />
                        </td>
                      </tr>

                      <tr>
                        <td>(17) 3. TEST DE MEMORIA DE TRABAJO VISUAL PARA FORMAS COLORES Y COMBINACIONES:ㅤ</td>
                        <td>
                          <input
                            type='text'
                            name='campo17'
                            value={inputValues.campo17 || ''}
                            onChange={handleInputChange}
                          />
                        </td>
                      </tr>

                      <tr>
                        <td>(18) Percepción:ㅤ</td>
                        <td>
                          <input
                            type='text'
                            name='campo18'
                            value={inputValues.campo18 || ''}
                            onChange={handleInputChange}
                          />
                        </td>
                      </tr>

                      <tr>
                        <td>(19) Correctas:ㅤ</td>
                        <td>
                          <input
                            type='text'
                            name='campo19'
                            value={inputValues.campo19 || ''}
                            onChange={handleInputChange}
                          />
                        </td>
                      </tr>

                      <tr>
                        <td>(20) Porcentaje correctas:ㅤ</td>
                        <td>
                          <input
                            type='text'
                            name='campo20'
                            value={inputValues.campo20 || ''}
                            onChange={handleInputChange}
                          />
                        </td>
                      </tr>

                      <tr>
                        <td>(21) Tiempo total:ㅤ</td>
                        <td>
                          <input
                            type='text'
                            name='campo21'
                            value={inputValues.campo21 || ''}
                            onChange={handleInputChange}
                          />
                        </td>
                      </tr>

                      <tr>
                        <td>(22) Forma:ㅤ</td>
                        <td>
                          <input
                            type='text'
                            name='campo22'
                            value={inputValues.campo22 || ''}
                            onChange={handleInputChange}
                          />
                        </td>
                      </tr>

                      <tr>
                        <td>(23) 2 formas - Correctas:ㅤ</td>
                        <td>
                          <input
                            type='text'
                            name='campo23'
                            value={inputValues.campo23 || ''}
                            onChange={handleInputChange}
                          />
                        </td>
                      </tr>

                      <tr>
                        <td>(24) 2 formas - Porcentaje correctas:ㅤ</td>
                        <td>
                          <input
                            type='text'
                            name='campo24'
                            value={inputValues.campo24 || ''}
                            onChange={handleInputChange}
                          />
                        </td>
                      </tr>

                      <tr>
                        <td>(25) 3 formas - Correctas:ㅤ</td>
                        <td>
                          <input
                            type='text'
                            name='campo25'
                            value={inputValues.campo25 || ''}
                            onChange={handleInputChange}
                          />
                        </td>
                      </tr>

                      <tr>
                        <td>(26) 3 formas - Porcentaje correctas:ㅤ</td>
                        <td>
                          <input
                            type='text'
                            name='campo26'
                            value={inputValues.campo26 || ''}
                            onChange={handleInputChange}
                          />
                        </td>
                      </tr>

                      <tr>
                        <td>(27) Tiempo total:ㅤ</td>
                        <td>
                          <input
                            type='text'
                            name='campo27'
                            value={inputValues.campo27 || ''}
                            onChange={handleInputChange}
                          />
                        </td>
                      </tr>

                      <tr>
                        <td>(28) Binding:ㅤ</td>
                        <td>
                          <input
                            type='text'
                            name='campo28'
                            value={inputValues.campo28 || ''}
                            onChange={handleInputChange}
                          />
                        </td>
                      </tr>

                      <tr>
                        <td>(29) 2 Bindings - Correctas:ㅤ</td>
                        <td>
                          <input
                            type='text'
                            name='campo29'
                            value={inputValues.campo29 || ''}
                            onChange={handleInputChange}
                          />
                        </td>
                      </tr>

                      <tr>
                        <td>(30) 2 Bindings - Porcentaje correctas:ㅤ</td>
                        <td>
                          <input
                            type='text'
                            name='campo30'
                            value={inputValues.campo30 || ''}
                            onChange={handleInputChange}
                          />
                        </td>
                      </tr>

                      <tr>
                        <td>(31) 3 Bindings - Correctas:ㅤ</td>
                        <td>
                          <input
                            type='text'
                            name='campo31'
                            value={inputValues.campo31 || ''}
                            onChange={handleInputChange}
                          />
                        </td>
                      </tr>

                      <tr>
                        <td>(32) 3 Bindings - Porcentaje correctas:ㅤ</td>
                        <td>
                          <input
                            type='text'
                            name='campo32'
                            value={inputValues.campo32 || ''}
                            onChange={handleInputChange}
                          />
                        </td>
                      </tr>

                      <tr>
                        <td>(33) Tiempo total en segundos:ㅤ</td>
                        <td>
                          <input
                            type='text'
                            name='campo33'
                            value={inputValues.campo33 || ''}
                            onChange={handleInputChange}
                          />
                        </td>
                      </tr>

                      <tr>
                        <td>(34) 4. ACER:ㅤ</td>
                        <td>
                          <input
                            type='text'
                            name='campo34'
                            value={inputValues.campo34 || ''}
                            onChange={handleInputChange}
                          />
                        </td>
                      </tr>

                      <tr>
                        <td>(35) ACE Orientación:ㅤ</td>
                        <td>
                          <input
                            type='text'
                            name='campo35'
                            value={inputValues.campo35 || ''}
                            onChange={handleInputChange}
                          />
                        </td>
                      </tr>

                      <tr>
                        <td>(36) ACE Atención:ㅤ</td>
                        <td>
                          <input
                            type='text'
                            name='campo36'
                            value={inputValues.campo36 || ''}
                            onChange={handleInputChange}
                          />
                        </td>
                      </tr>

                      <tr>
                        <td>(37) ACE Memoria:ㅤ</td>
                        <td>
                          <input
                            type='text'
                            name='campo37'
                            value={inputValues.campo37 || ''}
                            onChange={handleInputChange}
                          />
                        </td>
                      </tr>

                      <tr>
                        <td>(38) ACE Fluidez:ㅤ</td>
                        <td>
                          <input
                            type='text'
                            name='campo38'
                            value={inputValues.campo38 || ''}
                            onChange={handleInputChange}
                          />
                        </td>
                      </tr>

                      <tr>
                        <td>(39) ACE Lenguaje:ㅤ</td>
                        <td>
                          <input
                            type='text'
                            name='campo39'
                            value={inputValues.campo39 || ''}
                            onChange={handleInputChange}
                          />
                        </td>
                      </tr>

                      <tr>
                        <td>(40) ACE Visoespaciales:ㅤ</td>
                        <td>
                          <input
                            type='text'
                            name='campo40'
                            value={inputValues.campo40 || ''}
                            onChange={handleInputChange}
                          />
                        </td>
                      </tr>

                      <tr>
                        <td>(41) ACE TOTAL:ㅤ</td>
                        <td>
                          <input
                            type='text'
                            name='campo41'
                            value={inputValues.campo41 || ''}
                            onChange={handleInputChange}
                          />
                        </td>
                      </tr>

                      <tr>
                        <td>(42) MMSE:ㅤ</td>
                        <td>
                          <input
                            type='text'
                            name='campo42'
                            value={inputValues.campo42 || ''}
                            onChange={handleInputChange}
                          />
                        </td>
                      </tr>

                      <tr>
                        <td>(43) 5. ECOG:ㅤ</td>
                        <td>
                          <input
                            type='text'
                            name='campo43'
                            value={inputValues.campo43 || ''}
                            onChange={handleInputChange}
                          />
                        </td>
                      </tr>

                      <tr>
                        <td>(44) ECOG Memoria:ㅤ</td>
                        <td>
                          <input
                            type='text'
                            name='campo44'
                            value={inputValues.campo44 || ''}
                            onChange={handleInputChange}
                          />
                        </td>
                      </tr>

                      <tr>
                        <td>(45) ECOG Planificación:ㅤ</td>
                        <td>
                          <input
                            type='text'
                            name='campo45'
                            value={inputValues.campo45 || ''}
                            onChange={handleInputChange}
                          />
                        </td>
                      </tr>

                      <tr>
                        <td>(46) ECOG Lenguaje:ㅤ</td>
                        <td>
                          <input
                            type='text'
                            name='campo46'
                            value={inputValues.campo46 || ''}
                            onChange={handleInputChange}
                          />
                        </td>
                      </tr>

                      <tr>
                        <td>(47) ECOG Organización:ㅤ</td>
                        <td>
                          <input
                            type='text'
                            name='campo47'
                            value={inputValues.campo47 || ''}
                            onChange={handleInputChange}
                          />
                        </td>
                      </tr>

                      <tr>
                        <td>(48) ECOG Atención:ㅤ</td>
                        <td>
                          <input
                            type='text'
                            name='campo48'
                            value={inputValues.campo48 || ''}
                            onChange={handleInputChange}
                          />
                        </td>
                      </tr>

                      <tr>
                        <td>(49) ECOG Visuoespacial:ㅤ</td>
                        <td>
                          <input
                            type='text'
                            name='campo49'
                            value={inputValues.campo49 || ''}
                            onChange={handleInputChange}
                          />
                        </td>
                      </tr>

                      <tr>
                        <td>(50) ECOG TOTAL:ㅤ</td>
                        <td>
                          <input
                            type='text'
                            name='campo50'
                            value={inputValues.campo50 || ''}
                            onChange={handleInputChange}
                          />
                        </td>
                      </tr>

                      <tr>
                        <td>(51) 6. ESCALA DEPRESIÓN GERIÁTRICA - YESAVAGE:ㅤ</td>
                        <td>
                          <input
                            type='text'
                            name='campo51'
                            value={inputValues.campo51 || ''}
                            onChange={handleInputChange}
                          />
                        </td>
                      </tr>

                      <tr>
                        <td>(52) 7. ESCALA DE HACHINSKI:ㅤ</td>
                        <td>
                          <input
                            type='text'
                            name='campo52'
                            value={inputValues.campo52 || ''}
                            onChange={handleInputChange}
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
                            value={inputValues.campo53 || ''}
                            onChange={handleInputChange}
                          />
                        </td>
                      </tr>

                      <tr>
                        <td>(54) DENOMINACION (Test de Boston):ㅤ</td>
                        <td>
                          <input
                            type='text'
                            name='campo54'
                            value={inputValues.campo54 || ''}
                            onChange={handleInputChange}
                          />
                        </td>
                      </tr>

                      <tr>
                        <td>(55) Puntaje alta:ㅤ</td>
                        <td>
                          <input
                            type='text'
                            name='campo55'
                            value={inputValues.campo55 || ''}
                            onChange={handleInputChange}
                          />
                        </td>
                      </tr>

                      <tr>
                        <td>(56) Puntaje media:ㅤ</td>
                        <td>
                          <input
                            type='text'
                            name='campo56'
                            value={inputValues.campo56 || ''}
                            onChange={handleInputChange}
                          />
                        </td>
                      </tr>

                      <tr>
                        <td>(57) Puntaje baja:ㅤ</td>
                        <td>
                          <input
                            type='text'
                            name='campo57'
                            value={inputValues.campo57 || ''}
                            onChange={handleInputChange}
                          />
                        </td>
                      </tr>

                      <tr>
                        <td>(58) Puntaje total/15:ㅤ</td>
                        <td>
                          <input
                            type='text'
                            name='campo58'
                            value={inputValues.campo58 || ''}
                            onChange={handleInputChange}
                          />
                        </td>
                      </tr>

                      <tr>
                        <td>(59) MEMORIA DE UNA LISTA DE PALABRAS:ㅤ</td>
                        <td>
                          <input
                            type='text'
                            name='campo59'
                            value={inputValues.campo59 || ''}
                            onChange={handleInputChange}
                          />
                        </td>
                      </tr>

                      <tr>
                        <td>(60) Intento 1 totales:ㅤ</td>
                        <td>
                          <input
                            type='text'
                            name='campo60'
                            value={inputValues.campo60 || ''}
                            onChange={handleInputChange}
                          />
                        </td>
                      </tr>

                      <tr>
                        <td>(61) Intento 1 intrusiones:ㅤ</td>
                        <td>
                          <input
                            type='text'
                            name='campo61'
                            value={inputValues.campo61 || ''}
                            onChange={handleInputChange}
                          />
                        </td>
                      </tr>

                      <tr>
                        <td>(62) Intento 2 totales:ㅤ</td>
                        <td>
                          <input
                            type='text'
                            name='campo62'
                            value={inputValues.campo62 || ''}
                            onChange={handleInputChange}
                          />
                        </td>
                      </tr>

                      <tr>
                        <td>(63) Intento 2 intrusiones:ㅤ</td>
                        <td>
                          <input
                            type='text'
                            name='campo63'
                            value={inputValues.campo63 || ''}
                            onChange={handleInputChange}
                          />
                        </td>
                      </tr>

                      <tr>
                        <td>(64) Intento 3 totales:ㅤ</td>
                        <td>
                          <input
                            type='text'
                            name='campo64'
                            value={inputValues.campo64 || ''}
                            onChange={handleInputChange}
                          />
                        </td>
                      </tr>

                      <tr>
                        <td>(65) Intento 3 intrusiones:ㅤ</td>
                        <td>
                          <input
                            type='text'
                            name='campo65'
                            value={inputValues.campo65 || ''}
                            onChange={handleInputChange}
                          />
                        </td>
                      </tr>

                      <tr>
                        <td>(66) Total palabras:ㅤ</td>
                        <td>
                          <input
                            type='text'
                            name='campo66'
                            value={inputValues.campo66 || ''}
                            onChange={handleInputChange}
                          />
                        </td>
                      </tr>

                      <tr>
                        <td>(67) Total intrusiones:ㅤ</td>
                        <td>
                          <input
                            type='text'
                            name='campo67'
                            value={inputValues.campo67 || ''}
                            onChange={handleInputChange}
                          />
                        </td>
                      </tr>

                      <tr>
                        <td>(68) PRAXIAS CONSTRUCTIVAS:ㅤ</td>
                        <td>
                          <input
                            type='text'
                            name='campo68'
                            value={inputValues.campo68 || ''}
                            onChange={handleInputChange}
                          />
                        </td>
                      </tr>

                      <tr>
                        <td>(69) Círculo - Item 1:ㅤ</td>
                        <td>
                          <input
                            type='text'
                            name='campo69'
                            value={inputValues.campo69 || ''}
                            onChange={handleInputChange}
                          />
                        </td>
                      </tr>

                      <tr>
                        <td>(70) Rombo - Item 2:ㅤ</td>
                        <td>
                          <input
                            type='text'
                            name='campo70'
                            value={inputValues.campo70 || ''}
                            onChange={handleInputChange}
                          />
                        </td>
                      </tr>

                      <tr>
                        <td>(71) Rectángulos - Item 3:ㅤ</td>
                        <td>
                          <input
                            type='text'
                            name='campo71'
                            value={inputValues.campo71 || ''}
                            onChange={handleInputChange}
                          />
                        </td>
                      </tr>

                      <tr>
                        <td>(72) Cubo - Item 4:ㅤ</td>
                        <td>
                          <input
                            type='text'
                            name='campo72'
                            value={inputValues.campo72 || ''}
                            onChange={handleInputChange}
                          />
                        </td>
                      </tr>

                      <tr>
                        <td>(73) Total 11:ㅤ</td>
                        <td>
                          <input
                            type='text'
                            name='campo73'
                            value={inputValues.campo73 || ''}
                            onChange={handleInputChange}
                          />
                        </td>
                      </tr>

                      <tr>
                        <td>(74) RECUERDO DE UNA LISTA DE PALABRAS:ㅤ</td>
                        <td>
                          <input
                            type='text'
                            name='campo74'
                            value={inputValues.campo74 || ''}
                            onChange={handleInputChange}
                          />
                        </td>
                      </tr>

                      <tr>
                        <td>(75) Total 10:ㅤ</td>
                        <td>
                          <input
                            type='text'
                            name='campo75'
                            value={inputValues.campo75 || ''}
                            onChange={handleInputChange}
                          />
                        </td>
                      </tr>

                      <tr>
                        <td>(76) Total intrusiones:ㅤ</td>
                        <td>
                          <input
                            type='text'
                            name='campo76'
                            value={inputValues.campo76 || ''}
                            onChange={handleInputChange}
                          />
                        </td>
                      </tr>

                      <tr>
                        <td>(77) RECONOCIMIENTO DE UNA LISTA DE PALABRAS:ㅤ</td>
                        <td>
                          <input
                            type='text'
                            name='campo77'
                            value={inputValues.campo77 || ''}
                            onChange={handleInputChange}
                          />
                        </td>
                      </tr>

                      <tr>
                        <td>(78) Total SI correctos/10:ㅤ</td>
                        <td>
                          <input
                            type='text'
                            name='campo78'
                            value={inputValues.campo78 || ''}
                            onChange={handleInputChange}
                          />
                        </td>
                      </tr>

                      <tr>
                        <td>(79) Total NO correctos/10:ㅤ</td>
                        <td>
                          <input
                            type='text'
                            name='campo79'
                            value={inputValues.campo79 || ''}
                            onChange={handleInputChange}
                          />
                        </td>
                      </tr>

                      <tr>
                        <td>(80) EVOCACIÓN PRAXIAS CONSTRUCTIVAS:ㅤ</td>
                        <td>
                          <input
                            type='text'
                            name='campo80'
                            value={inputValues.campo80 || ''}
                            onChange={handleInputChange}
                          />
                        </td>
                      </tr>

                      <tr>
                        <td>(81) Círculo - Item 1:ㅤ</td>
                        <td>
                          <input
                            type='text'
                            name='campo81'
                            value={inputValues.campo81 || ''}
                            onChange={handleInputChange}
                          />
                        </td>
                      </tr>

                      <tr>
                        <td>(82) Rombo - Item 2:ㅤ</td>
                        <td>
                          <input
                            type='text'
                            name='campo82'
                            value={inputValues.campo82 || ''}
                            onChange={handleInputChange}
                          />
                        </td>
                      </tr>

                      <tr>
                        <td>(83) Rectángulos - Item 3:ㅤ</td>
                        <td>
                          <input
                            type='text'
                            name='campo83'
                            value={inputValues.campo83 || ''}
                            onChange={handleInputChange}
                          />
                        </td>
                      </tr>

                      <tr>
                        <td>(84) Cubo - Item 4:ㅤ</td>
                        <td>
                          <input
                            type='text'
                            name='campo84'
                            value={inputValues.campo84 || ''}
                            onChange={handleInputChange}
                          />
                        </td>
                      </tr>

                      <tr>
                        <td>(85) Total 11:ㅤ</td>
                        <td>
                          <input
                            type='text'
                            name='campo85'
                            value={inputValues.campo85 || ''}
                            onChange={handleInputChange}
                          />
                        </td>
                      </tr>

                      <tr>
                        <td>(86) TRAIL MAKING TEST (T.M.T) PARTE A:ㅤ</td>
                        <td>
                          <input
                            type='text'
                            name='campo86'
                            value={inputValues.campo86 || ''}
                            onChange={handleInputChange}
                          />
                        </td>
                      </tr>

                      <tr>
                        <td>(87) Aciertos /24:ㅤ</td>
                        <td>
                          <input
                            type='text'
                            name='campo87'
                            value={inputValues.campo87 || ''}
                            onChange={handleInputChange}
                          />
                        </td>
                      </tr>

                      <tr>
                        <td>(88) Errores:ㅤ</td>
                        <td>
                          <input
                            type='text'
                            name='campo88'
                            value={inputValues.campo88 || ''}
                            onChange={handleInputChange}
                          />
                        </td>
                      </tr>

                      <tr>
                        <td>(89) Tiempo en segundos:ㅤ</td>
                        <td>
                          <input
                            type='text'
                            name='campo89'
                            value={inputValues.campo89 || ''}
                            onChange={handleInputChange}
                          />
                        </td>
                      </tr>

                      <tr>
                        <td>(90) Ensayo a los 300’’:ㅤ</td>
                        <td>
                          <input
                            type='text'
                            name='campo90'
                            value={inputValues.campo90 || ''}
                            onChange={handleInputChange}
                          />
                        </td>
                      </tr>

                      <tr>
                        <td>(91) TRAIL MAKING TEST (T.M.T) PARTE B:ㅤ</td>
                        <td>
                          <input
                            type='text'
                            name='campo91'
                            value={inputValues.campo91 || ''}
                            onChange={handleInputChange}
                          />
                        </td>
                      </tr>

                      <tr>
                        <td>(92) Aciertos /24:ㅤ</td>
                        <td>
                          <input
                            type='text'
                            name='campo92'
                            value={inputValues.campo92 || ''}
                            onChange={handleInputChange}
                          />
                        </td>
                      </tr>

                      <tr>
                        <td>(93) Errores:ㅤ</td>
                        <td>
                          <input
                            type='text'
                            name='campo93'
                            value={inputValues.campo93 || ''}
                            onChange={handleInputChange}
                          />
                        </td>
                      </tr>

                      <tr>
                        <td>(94) Tiempo en segundos:ㅤ</td>
                        <td>
                          <input
                            type='text'
                            name='campo94'
                            value={inputValues.campo94 || ''}
                            onChange={handleInputChange}
                          />
                        </td>
                      </tr>

                      <tr>
                        <td>(95) Ensayo a los 300’’:ㅤ</td>
                        <td>
                          <input
                            type='text'
                            name='campo95'
                            value={inputValues.campo95 || ''}
                            onChange={handleInputChange}
                          />
                        </td>
                      </tr>

                      <tr>
                        <td>(96) FIGURA COMPLEJA DE REY - OSTERRIETH - COPIA:ㅤ</td>
                        <td>
                          <input
                            type='text'
                            name='campo96'
                            value={inputValues.campo96 || ''}
                            onChange={handleInputChange}
                          />
                        </td>
                      </tr>

                      <tr>
                        <td>(97) Tiempo en segundos:ㅤ</td>
                        <td>
                          <input
                            type='text'
                            name='campo97'
                            value={inputValues.campo97 || ''}
                            onChange={handleInputChange}
                          />
                        </td>
                      </tr>

                      <tr>
                        <td>(98) Puntaje:ㅤ</td>
                        <td>
                          <input
                            type='text'
                            name='campo98'
                            value={inputValues.campo98 || ''}
                            onChange={handleInputChange}
                          />
                        </td>
                      </tr>

                      <tr>
                        <td>(99) FIGURA COMPLEJA DE REY - OSTERRIETH - EVOCACIÓN:ㅤ</td>
                        <td>
                          <input
                            type='text'
                            name='campo99'
                            value={inputValues.campo99 || ''}
                            onChange={handleInputChange}
                          />
                        </td>
                      </tr>

                      <tr>
                        <td>(100) Tiempo en segundos:ㅤ</td>
                        <td>
                          <input
                            type='text'
                            name='campo100'
                            value={inputValues.campo100 || ''}
                            onChange={handleInputChange}
                          />
                        </td>
                      </tr>

                      <tr>
                        <td>(101) Puntaje:ㅤ</td>
                        <td>
                          <input
                            type='text'
                            name='campo101'
                            value={inputValues.campo101 || ''}
                            onChange={handleInputChange}
                          />
                        </td>
                      </tr>

                      <tr>
                        <td>(102) FLUIDEZ VERBAL:ㅤ</td>
                        <td>
                          <input
                            type='text'
                            name='campo102'
                            value={inputValues.campo102 || ''}
                            onChange={handleInputChange}
                          />
                        </td>
                      </tr>

                      <tr>
                        <td>(103) Total F:ㅤ</td>
                        <td>
                          <input
                            type='text'
                            name='campo103'
                            value={inputValues.campo103 || ''}
                            onChange={handleInputChange}
                          />
                        </td>
                      </tr>

                      <tr>
                        <td>(104) Total A:ㅤ</td>
                        <td>
                          <input
                            type='text'
                            name='campo104'
                            value={inputValues.campo104 || ''}
                            onChange={handleInputChange}
                          />
                        </td>
                      </tr>

                      <tr>
                        <td>(105) Total S:ㅤ</td>
                        <td>
                          <input
                            type='text'
                            name='campo105'
                            value={inputValues.campo105 || ''}
                            onChange={handleInputChange}
                          />
                        </td>
                      </tr>

                      <tr>
                        <td>(106) Pérdida de categoría:ㅤ</td>
                        <td>
                          <input
                            type='text'
                            name='campo106'
                            value={inputValues.campo106 || ''}
                            onChange={handleInputChange}
                          />
                        </td>
                      </tr>

                      <tr>
                        <td>(107) Puntuación total:ㅤ</td>
                        <td>
                          <input
                            type='text'
                            name='campo107'
                            value={inputValues.campo107 || ''}
                            onChange={handleInputChange}
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
                            value={inputValues.campo108 || ''}
                            onChange={handleInputChange}
                          />
                        </td>
                      </tr>

                      <tr>
                        <td>(109) QF Total:ㅤ</td>
                        <td>
                          <input
                            type='text'
                            name='campo109'
                            value={inputValues.campo109 || ''}
                            onChange={handleInputChange}
                          />
                        </td>
                      </tr>

                      <tr>
                        <td>(110) QP Total:ㅤ</td>
                        <td>
                          <input
                            type='text'
                            name='campo110'
                            value={inputValues.campo110 || ''}
                            onChange={handleInputChange}
                          />
                        </td>
                      </tr>

                      <tr>
                        <td>(111) 10. ESCALA GLOBAL DE DETERIORO:ㅤ</td>
                        <td>
                          <input
                            type='text'
                            name='campo111'
                            value={inputValues.campo111 || ''}
                            onChange={handleInputChange}
                          />
                        </td>
                      </tr>

                      <tr>
                        <td>(112) Puntaje:ㅤ</td>
                        <td>
                          <input
                            type='text'
                            name='campo112'
                            value={inputValues.campo112 || ''}
                            onChange={handleInputChange}
                          />
                        </td>
                      </tr>

                      <tr>
                        <td>(113) 11. ESCALA DE BARTHEL DE AVD Y ALIMENTACIÓN:ㅤ</td>
                        <td>
                          <input
                            type='text'
                            name='campo113'
                            value={inputValues.campo113 || ''}
                            onChange={handleInputChange}
                          />
                        </td>
                      </tr>

                      <tr>
                        <td>(114) Puntaje /50:ㅤ</td>
                        <td>
                          <input
                            type='text'
                            name='campo114'
                            value={inputValues.campo114 || ''}
                            onChange={handleInputChange}
                          />
                        </td>
                      </tr>

                      <tr>
                        <td>(115) 12. ESCALA DE LAWTON Y BRODY:ㅤ</td>
                        <td>
                          <input
                            type='text'
                            name='campo115'
                            value={inputValues.campo115 || ''}
                            onChange={handleInputChange}
                          />
                        </td>
                      </tr>

                      <tr>
                        <td>(116) Total /5 o Total /8:ㅤ</td>
                        <td>
                          <input
                            type='text'
                            name='campo116'
                            value={inputValues.campo116 || ''}
                            onChange={handleInputChange}
                          />
                        </td>
                      </tr>

                      <tr>
                        <td>(117) 13. THE TECHONOLOGY - ACTIVITIES OF DAILY LIVING QUESTIONNAIRE (T-ADLQ):ㅤ</td>
                        <td>
                          <input
                            type='text'
                            name='campo117'
                            value={inputValues.campo117 || ''}
                            onChange={handleInputChange}
                          />
                        </td>
                      </tr>

                      <tr>
                        <td>(118) Puntaje de deterioro funcional:ㅤ</td>
                        <td>
                          <input
                            type='text'
                            name='campo118'
                            value={inputValues.campo118 || ''}
                            onChange={handleInputChange}
                          />
                        </td>
                      </tr>

                      <tr>
                        <td>(119) 14. FUNCIONES DETALLADAS DE LA VIDA DIARIA (FDVD):ㅤ</td>
                        <td>
                          <input
                            type='text'
                            name='campo119'
                            value={inputValues.campo119 || ''}
                            onChange={handleInputChange}
                          />
                        </td>
                      </tr>

                      <tr>
                        <td>(120) Total funciones relacionales ( R ) (/52):ㅤ</td>
                        <td>
                          <input
                            type='text'
                            name='campo120'
                            value={inputValues.campo120 || ''}
                            onChange={handleInputChange}
                          />
                        </td>
                      </tr>

                      <tr>
                        <td>(121) Puntaje de deterioro funcional ( C ) (/30):ㅤ</td>
                        <td>
                          <input
                            type='text'
                            name='campo121'
                            value={inputValues.campo121 || ''}
                            onChange={handleInputChange}
                          />
                        </td>
                      </tr>

                      <tr>
                        <td>(122) 15. INECO FRONTAL SCREENING (IFS):ㅤ</td>
                        <td>
                          <input
                            type='text'
                            name='campo122'
                            value={inputValues.campo122 || ''}
                            onChange={handleInputChange}
                          />
                        </td>
                      </tr>

                      <tr>
                        <td>(123) Índice de Memoria de Trabajo (Dígitos atrás + corsi):ㅤ</td>
                        <td>
                          <input
                            type='text'
                            name='campo123'
                            value={inputValues.campo123 || ''}
                            onChange={handleInputChange}
                          />
                        </td>
                      </tr>

                      <tr>
                        <td>(124) Puntaje total:ㅤ</td>
                        <td>
                          <input
                            type='text'
                            name='campo124'
                            value={inputValues.campo124 || ''}
                            onChange={handleInputChange}
                          />
                        </td>
                      </tr>
                    </>
                  )}

                </tbody>
              </table>

              <br /> <button type='submit' disabled={isSubmitting}>Editar Registro</button>
              <h6>{`*Para una correcta visualización de los datos en Excel: Data -> Get Data -> From File -> From Text/CSV -> Abrir el archivo File Origin: UTF-8 Delimiter: Semicolon -> Load`}</h6>

            </form>

            <button className='downloadData' onClick={downloadData}>Descargar Datos</button> <br /> <br />
            <button className='boton-scroll-top' onClick={scrollToTop}>Ir al principio</button>
            <br /> <br /> <button className='btnVolv' onClick={handleReloadPage}>Volver</button> <br /> <br />
          </div>
        </center>
      )}
    </div>
  )
}

export default EditarTablaExamen
