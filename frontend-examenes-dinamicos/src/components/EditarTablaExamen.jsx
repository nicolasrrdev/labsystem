import { useState, useEffect } from 'react'
import ModalAlert from './ModalAlert'

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
  
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setInputValues({
      ...inputValues,
      [name]: value,
    });
  };

  useEffect(() => {
    dataId &&
      fetch(`${BASE_URL}/api/tabla_examen/${dataId}`)
        .then((response) => {
          if (response.status === 404) {
            throw new Error('No se encontró el registro');
          }
          if (response.status === 500) {
            throw new Error('Ha ocurrido un error inesperado');
          }
          return response.json();
        })
        .then((response) => {
          const { campo1, campo2, campo3, campo4, campo5, campo6, campo7, campo8, campo9, campo10, campo11, campo12, campo13, campo14, campo15, campo16, campo17, campo18, campo19, campo20, campo21, campo22, campo23, campo24, campo25, campo26, campo27, campo28, campo29, campo30, campo31, campo32, campo33, campo34, campo35, campo36, campo37, campo38, campo39, campo40, campo41, campo42, campo43, campo44, campo45, campo46, campo47, campo48, campo49, campo50, campo51, campo52, campo53, campo54, campo55, campo56, campo57, campo58, campo59, campo60, campo61, campo62, campo63, campo64, campo65, campo66, campo67, campo68, campo69, campo70, campo71, campo72, campo73, campo74, campo75, campo76, campo77, campo78, campo79, campo80, campo81, campo82, campo83, campo84, campo85, campo86, campo87, campo88, campo89, campo90, campo91, campo92, campo93, campo94, campo95, campo96, campo97, campo98, campo99, campo100, campo101, campo102, campo103, campo104, campo105, campo106, campo107, campo108, campo109, campo110, campo111, campo112, campo113, campo114, campo115, campo116, campo117, campo118, campo119, campo120, campo121, campo122, campo123, campo124 } = response;
          setInputValues({
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
          });
        })
        .catch((error) => {
          console.error(error);
        });
  }, [BASE_URL, dataId]);
  
  useEffect(() => {
    fetch(`${BASE_URL}/pacientes`)
      .then((response) => response.json())
      .then((response) => {
        setPacientes(response)
        setFilteredPacientes(response)
      })
      .catch((error) => {
        setModalAMessage('Error: No se pudo establecer conexión con el servidor.')
        setIsModalOpen(true)
        console.error(error)
      })
  }, [BASE_URL])

  useEffect(() => {
    fetch(`${BASE_URL}/pacientes/${pacienteSeleccionado}`)
      .then((response) => response.json())
      .then((response) => {
        setInfoPaciente(response)
      })
      .catch((error) => {
        console.error(error)
      })
  }, [BASE_URL, pacienteSeleccionado])

  const handlePacienteSeleccionado = (e) => {
    setPacienteSeleccionado(e.target.value)
  }

  const handleSubmit1 = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(`${BASE_URL}/api/tabla_examen/por_paciente/${pacienteSeleccionado}`, {
        method: 'GET',
      });
      // console.log(pacienteSeleccionado)
      if (response.ok) {
        const data = await response.json();
        // console.log('Datos recibidos:', data);
        setTablaExamenData(data);
        setSubmitted1(true);
        setInitialPage(false);
        // console.log(infoPaciente.nombres + ' ' + infoPaciente.apellidos)
        // console.log(infoPaciente.documento)
      } else if (response.status === 404) {
        throw new Error('No se encontró el registro');
      } else {
        throw new Error('Ha ocurrido un error inesperado');
      }
    } catch (error) {
      console.log(error)
    } finally {
      setIsSubmitting(false);
    }
  };
  
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
    fetch(`${BASE_URL}/api/tabla_examen/${dataId}`)
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
    e.preventDefault();
    setIsSubmitting(true);
  
    const requestData = {
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
    };
  
    // console.log('Data enviada por PUT:', requestData);
  
    fetch(`${BASE_URL}/api/tabla_examen/${dataId}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(requestData),
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error('Hubo un error al enviar los datos');
        }
        setRegistroExitoso(true);
      })
      .catch((error) => {
        if (error.message === 'Hubo un error al enviar los datos') {
          setModalAMessage('Hubo un error al enviar los datos');
          setIsModalOpen(true);
        } else {
          setModalAMessage('Error: No se pudo establecer conexión con el servidor.');
          setIsModalOpen(true);
          console.error(error);
        }
      })
      .finally(() => {
        setIsSubmitting(false);
      });
  };
  
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

  const downloadData = async () => {
    try {
      const response = await fetch(`${BASE_URL}/api/tabla_examen/${dataId}`);
      if (!response.ok) {
        throw new Error('No se pudo obtener los datos');
      }
      const data = await response.json();
      if (typeof data !== 'object' || Array.isArray(data)) {
        throw new Error('Los datos no son válidos para la descarga');
      }
      let csvContent = "Nombre;Documento;1. FCSRT;Total identificación;FCRST Recuerdo libre ensayo 1;FCRST Recuerdo facilitado ensayo 1;FCRST Recuerdo libre ensayo 2;FCRST Recuerdo facilitado ensayo 2;FCRST Recuerdo libre ensayo 3;FCRST Recuerdo facilitado ensayo 3;FCRST - RECUERDO DIFERIDO Recuerdo libre;FCRST - RECUERDO DIFERIDO Recuerdo facilitado;FCRST LIBRE TOTAL (0-48);FCRST RECUERDO FACILITADO TOTAL (0-48);FCRST RECUERDO DIFERIDO LIBRE (0-16);FCRST RECUERDO DIFERIDO FACILITADO (0-16);2. TEST VISIÓN DE COLORES - DVORINE;Número de errores;3. TEST DE MEMORIA DE TRABAJO VISUAL PARA FORMAS COLORES Y COMBINACIONES;Percepción;Correctas;Porcentaje correctas;Tiempo total;Forma;2 formas - Correctas;2 formas - Porcentaje correctas;3 formas - Correctas;3 formas - Porcentaje correctas;Tiempo total;Binding;2 Bindings - Correctas;2 Bindings - Porcentaje correctas;3 Bindings - Correctas;3 Bindings - Porcentaje correctas;Tiempo total en segundos;4. ACER;ACE Orientación;ACE Atención;ACE Memoria;ACE Fluidez;ACE Lenguaje;ACE Visoespaciales;ACE TOTAL;MMSE;5. ECOG;ECOG Memoria;ECOG Planificación;ECOG Lenguaje;ECOG Organización;ECOG Atención;ECOG Visuoespacial;ECOG TOTAL;6. ESCALA DEPRESIÓN GERIÁTRICA - YESAVAGE;7. ESCALA DE HACHINSKI;8. CERAD;DENOMINACION (Test de Boston);Puntaje alta;Puntaje media;Puntaje baja;Puntaje total/15;MEMORIA DE UNA LISTA DE PALABRAS;Intento 1 totales;Intento 1 intrusiones;Intento 2 totales;Intento 2 intrusiones;Intento 3 totales;Intento 3 intrusiones;Total palabras;Total intrusiones;PRAXIAS CONSTRUCTIVAS;Círculo - Item 1;Rombo - Item 2;Rectángulos - Item 3;Cubo - Item 4;Total 11;RECUERDO DE UNA LISTA DE PALABRAS;Total 10;Total intrusiones;RECONOCIMIENTO DE UNA LISTA DE PALABRAS;Total SI correctos/10;Total NO correctos/10;EVOCACIÓN PRAXIAS CONSTRUCTIVAS;Círculo - Item 1;Rombo - Item 2;Rectángulos - Item 3;Cubo - Item 4;Total 11;TRAIL MAKING TEST (T.M.T) PARTE A;Aciertos /24;Errores;Tiempo en segundos;Ensayo a los 300’’;TRAIL MAKING TEST (T.M.T) PARTE B;Aciertos /24;Errores;Tiempo en segundos;Ensayo a los 300’’;FIGURA COMPLEJA DE REY - OSTERRIETH - COPIA;Tiempo en segundos;Puntaje;FIGURA COMPLEJA DE REY - OSTERRIETH - EVOCACIÓN;Tiempo en segundos;Puntaje;FLUIDEZ VERBAL;Total F;Total A;Total S;Pérdida de categoría;Puntuación total;9. ESCALA DE TRASTORNOS DE MEMORIA;QF Total;QP Total;10. ESCALA GLOBAL DE DETERIORO;Puntaje;11. ESCALA DE BARTHEL DE AVD Y ALIMENTACIÓN;Puntaje /50;12. ESCALA DE LAWTON Y BRODY;Total /5 o Total /8;13. THE TECHONOLOGY - ACTIVITIES OF DAILY LIVING QUESTIONNAIRE (T-ADLQ);Puntaje de deterioro funcional;14. FUNCIONES DETALLADAS DE LA VIDA DIARIA (FDVD);Total funciones relacionales ( R ) (/52);Puntaje de deterioro funcional ( C ) (/30);15. INECO FRONTAL SCREENING (IFS);Índice de Memoria de Trabajo (Dígitos atrás + corsi);Puntaje total\n";
      // console.log(infoPaciente.nombres + ' ' + infoPaciente.apellidos)
      // console.log(infoPaciente.documento)
      const csvRow = `${infoPaciente.nombres + ' ' + infoPaciente.apellidos};${infoPaciente.documento};${data.campo1 || ''};${data.campo2 || ''};${data.campo3 || ''};${data.campo4 || ''};${data.campo5 || ''};${data.campo6 || ''};${data.campo7 || ''};${data.campo8 || ''};${data.campo9 || ''};${data.campo10 || ''};${data.campo11 || ''};${data.campo12 || ''};${data.campo13 || ''};${data.campo14 || ''};${data.campo15 || ''};${data.campo16 || ''};${data.campo17 || ''};${data.campo18 || ''};${data.campo19 || ''};${data.campo20 || ''};${data.campo21 || ''};${data.campo22 || ''};${data.campo23 || ''};${data.campo24 || ''};${data.campo25 || ''};${data.campo26 || ''};${data.campo27 || ''};${data.campo28 || ''};${data.campo29 || ''};${data.campo30 || ''};${data.campo31 || ''};${data.campo32 || ''};${data.campo33 || ''};${data.campo34 || ''};${data.campo35 || ''};${data.campo36 || ''};${data.campo37 || ''};${data.campo38 || ''};${data.campo39 || ''};${data.campo40 || ''};${data.campo41 || ''};${data.campo42 || ''};${data.campo43 || ''};${data.campo44 || ''};${data.campo45 || ''};${data.campo46 || ''};${data.campo47 || ''};${data.campo48 || ''};${data.campo49 || ''};${data.campo50 || ''};${data.campo51 || ''};${data.campo52 || ''};${data.campo53 || ''};${data.campo54 || ''};${data.campo55 || ''};${data.campo56 || ''};${data.campo57 || ''};${data.campo58 || ''};${data.campo59 || ''};${data.campo60 || ''};${data.campo61 || ''};${data.campo62 || ''};${data.campo63 || ''};${data.campo64 || ''};${data.campo65 || ''};${data.campo66 || ''};${data.campo67 || ''};${data.campo68 || ''};${data.campo69 || ''};${data.campo70 || ''};${data.campo71 || ''};${data.campo72 || ''};${data.campo73 || ''};${data.campo74 || ''};${data.campo75 || ''};${data.campo76 || ''};${data.campo77 || ''};${data.campo78 || ''};${data.campo79 || ''};${data.campo80 || ''};${data.campo81 || ''};${data.campo82 || ''};${data.campo83 || ''};${data.campo84 || ''};${data.campo85 || ''};${data.campo86 || ''};${data.campo87 || ''};${data.campo88 || ''};${data.campo89 || ''};${data.campo90 || ''};${data.campo91 || ''};${data.campo92 || ''};${data.campo93 || ''};${data.campo94 || ''};${data.campo95 || ''};${data.campo96 || ''};${data.campo97 || ''};${data.campo98 || ''};${data.campo99 || ''};${data.campo100 || ''};${data.campo101 || ''};${data.campo102 || ''};${data.campo103 || ''};${data.campo104 || ''};${data.campo105 || ''};${data.campo106 || ''};${data.campo107 || ''};${data.campo108 || ''};${data.campo109 || ''};${data.campo110 || ''};${data.campo111 || ''};${data.campo112 || ''};${data.campo113 || ''};${data.campo114 || ''};${data.campo115 || ''};${data.campo116 || ''};${data.campo117 || ''};${data.campo118 || ''};${data.campo119 || ''};${data.campo120 || ''};${data.campo121 || ''};${data.campo122 || ''};${data.campo123 || ''};${data.campo124 || ''}`;
      csvContent += csvRow;
      const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
      const link = document.createElement('a');
      if (link.download !== undefined) {
        const url = URL.createObjectURL(blob);
        link.setAttribute('href', url);
        link.setAttribute('download', `data.csv`);
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        URL.revokeObjectURL(url);
      } else {
        throw new Error('El navegador no soporta la descarga de archivos');
      }
    } catch (error) {
      console.error(error);
    }
  };
    
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
            <form onSubmit={handleSubmit3}>

            <div>
              <label>
                1. FCSRT:ㅤ
                <input
                  type="text"
                  name="campo1"
                  value={inputValues.campo1 || ''}
                  onChange={handleInputChange}
                />
              </label>
              <br />
            </div>

            <div>
              <label>
                Total identificación:ㅤ
                <input
                  type="text"
                  name="campo2"
                  value={inputValues.campo2 || ''}
                  onChange={handleInputChange}
                />
              </label>
              <br />
            </div>

            <div>
              <label>
                FCRST Recuerdo libre ensayo 1:ㅤ
                <input
                  type="text"
                  name="campo3"
                  value={inputValues.campo3 || ''}
                  onChange={handleInputChange}
                />
              </label>
              <br />
            </div>

            <div>
              <label>
                FCRST Recuerdo facilitado ensayo 1:ㅤ
                <input
                  type="text"
                  name="campo4"
                  value={inputValues.campo4 || ''}
                  onChange={handleInputChange}
                />
              </label>
              <br />
            </div>

            <div>
              <label>
                FCRST Recuerdo libre ensayo 2:ㅤ
                <input
                  type="text"
                  name="campo5"
                  value={inputValues.campo5 || ''}
                  onChange={handleInputChange}
                />
              </label>
              <br />
            </div>

            <div>
              <label>
                FCRST Recuerdo facilitado ensayo 2:ㅤ
                <input
                  type="text"
                  name="campo6"
                  value={inputValues.campo6 || ''}
                  onChange={handleInputChange}
                />
              </label>
              <br />
            </div>

            <div>
              <label>
                FCRST Recuerdo libre ensayo 3:ㅤ
                <input
                  type="text"
                  name="campo7"
                  value={inputValues.campo7 || ''}
                  onChange={handleInputChange}
                />
              </label>
              <br />
            </div>

            <div>
              <label>
                FCRST Recuerdo facilitado ensayo 3:ㅤ
                <input
                  type="text"
                  name="campo8"
                  value={inputValues.campo8 || ''}
                  onChange={handleInputChange}
                />
              </label>
              <br />
            </div>

            <div>
              <label>
                FCRST - RECUERDO DIFERIDO Recuerdo libre:ㅤ
                <input
                  type="text"
                  name="campo9"
                  value={inputValues.campo9 || ''}
                  onChange={handleInputChange}
                />
              </label>
              <br />
            </div>

            <div>
              <label>
                FCRST - RECUERDO DIFERIDO Recuerdo facilitado:ㅤ
                <input
                  type="text"
                  name="campo10"
                  value={inputValues.campo10 || ''}
                  onChange={handleInputChange}
                />
              </label>
              <br />
            </div>

            <div>
              <label>
                FCRST LIBRE TOTAL (0-48):ㅤ
                <input
                  type="text"
                  name="campo11"
                  value={inputValues.campo11 || ''}
                  onChange={handleInputChange}
                />
              </label>
              <br />
            </div>

            <div>
              <label>
                FCRST RECUERDO FACILITADO TOTAL (0-48):ㅤ
                <input
                  type="text"
                  name="campo12"
                  value={inputValues.campo12 || ''}
                  onChange={handleInputChange}
                />
              </label>
              <br />
            </div>

            <div>
              <label>
                FCRST RECUERDO DIFERIDO LIBRE (0-16):ㅤ
                <input
                  type="text"
                  name="campo13"
                  value={inputValues.campo13 || ''}
                  onChange={handleInputChange}
                />
              </label>
              <br />
            </div>

            <div>
              <label>
                FCRST RECUERDO DIFERIDO FACILITADO (0-16):ㅤ
                <input
                  type="text"
                  name="campo14"
                  value={inputValues.campo14 || ''}
                  onChange={handleInputChange}
                />
              </label>
              <br />
            </div>

            <div>
              <label>
                2. TEST VISIÓN DE COLORES - DVORINE:ㅤ
                <input
                  type="text"
                  name="campo15"
                  value={inputValues.campo15 || ''}
                  onChange={handleInputChange}
                />
              </label>
              <br />
            </div>

            <div>
              <label>
                Número de errores:ㅤ
                <input
                  type="text"
                  name="campo16"
                  value={inputValues.campo16 || ''}
                  onChange={handleInputChange}
                />
              </label>
              <br />
            </div>

            <div>
              <label>
                3. TEST DE MEMORIA DE TRABAJO VISUAL PARA FORMAS COLORES Y COMBINACIONES:ㅤ
                <input
                  type="text"
                  name="campo17"
                  value={inputValues.campo17 || ''}
                  onChange={handleInputChange}
                />
              </label>
              <br />
            </div>

            <div>
              <label>
                Percepción:ㅤ
                <input
                  type="text"
                  name="campo18"
                  value={inputValues.campo18 || ''}
                  onChange={handleInputChange}
                />
              </label>
              <br />
            </div>

            <div>
              <label>
                Correctas:ㅤ
                <input
                  type="text"
                  name="campo19"
                  value={inputValues.campo19 || ''}
                  onChange={handleInputChange}
                />
              </label>
              <br />
            </div>

            <div>
              <label>
                Porcentaje correctas:ㅤ
                <input
                  type="text"
                  name="campo20"
                  value={inputValues.campo20 || ''}
                  onChange={handleInputChange}
                />
              </label>
              <br />
            </div>

            <div>
              <label>
                Tiempo total:ㅤ
                <input
                  type="text"
                  name="campo21"
                  value={inputValues.campo21 || ''}
                  onChange={handleInputChange}
                />
              </label>
              <br />
            </div>

            <div>
              <label>
                Forma:ㅤ
                <input
                  type="text"
                  name="campo22"
                  value={inputValues.campo22 || ''}
                  onChange={handleInputChange}
                />
              </label>
              <br />
            </div>

            <div>
              <label>
                2 formas - Correctas:ㅤ
                <input
                  type="text"
                  name="campo23"
                  value={inputValues.campo23 || ''}
                  onChange={handleInputChange}
                />
              </label>
              <br />
            </div>

            <div>
              <label>
                2 formas - Porcentaje correctas:ㅤ
                <input
                  type="text"
                  name="campo24"
                  value={inputValues.campo24 || ''}
                  onChange={handleInputChange}
                />
              </label>
              <br />
            </div>

            <div>
              <label>
                3 formas - Correctas:ㅤ
                <input
                  type="text"
                  name="campo25"
                  value={inputValues.campo25 || ''}
                  onChange={handleInputChange}
                />
              </label>
              <br />
            </div>

            <div>
              <label>
                3 formas - Porcentaje correctas:ㅤ
                <input
                  type="text"
                  name="campo26"
                  value={inputValues.campo26 || ''}
                  onChange={handleInputChange}
                />
              </label>
              <br />
            </div>

            <div>
              <label>
                Tiempo total:ㅤ
                <input
                  type="text"
                  name="campo27"
                  value={inputValues.campo27 || ''}
                  onChange={handleInputChange}
                />
              </label>
              <br />
            </div>

            <div>
              <label>
                Binding:ㅤ
                <input
                  type="text"
                  name="campo28"
                  value={inputValues.campo28 || ''}
                  onChange={handleInputChange}
                />
              </label>
              <br />
            </div>

            <div>
              <label>
                2 Bindings - Correctas:ㅤ
                <input
                  type="text"
                  name="campo29"
                  value={inputValues.campo29 || ''}
                  onChange={handleInputChange}
                />
              </label>
              <br />
            </div>

            <div>
              <label>
                2 Bindings - Porcentaje correctas:ㅤ
                <input
                  type="text"
                  name="campo30"
                  value={inputValues.campo30 || ''}
                  onChange={handleInputChange}
                />
              </label>
              <br />
            </div>

            <div>
              <label>
                3 Bindings - Correctas:ㅤ
                <input
                  type="text"
                  name="campo31"
                  value={inputValues.campo31 || ''}
                  onChange={handleInputChange}
                />
              </label>
              <br />
            </div>

            <div>
              <label>
                3 Bindings - Porcentaje correctas:ㅤ
                <input
                  type="text"
                  name="campo32"
                  value={inputValues.campo32 || ''}
                  onChange={handleInputChange}
                />
              </label>
              <br />
            </div>

            <div>
              <label>
                Tiempo total en segundos:ㅤ
                <input
                  type="text"
                  name="campo33"
                  value={inputValues.campo33 || ''}
                  onChange={handleInputChange}
                />
              </label>
              <br />
            </div>

            <div>
              <label>
                4. ACER:ㅤ
                <input
                  type="text"
                  name="campo34"
                  value={inputValues.campo34 || ''}
                  onChange={handleInputChange}
                />
              </label>
              <br />
            </div>

            <div>
              <label>
                ACE Orientación:ㅤ
                <input
                  type="text"
                  name="campo35"
                  value={inputValues.campo35 || ''}
                  onChange={handleInputChange}
                />
              </label>
              <br />
            </div>

            <div>
              <label>
                ACE Atención:ㅤ
                <input
                  type="text"
                  name="campo36"
                  value={inputValues.campo36 || ''}
                  onChange={handleInputChange}
                />
              </label>
              <br />
            </div>

            <div>
              <label>
                ACE Memoria:ㅤ
                <input
                  type="text"
                  name="campo37"
                  value={inputValues.campo37 || ''}
                  onChange={handleInputChange}
                />
              </label>
              <br />
            </div>

            <div>
              <label>
                ACE Fluidez:ㅤ
                <input
                  type="text"
                  name="campo38"
                  value={inputValues.campo38 || ''}
                  onChange={handleInputChange}
                />
              </label>
              <br />
            </div>

            <div>
              <label>
                ACE Lenguaje:ㅤ
                <input
                  type="text"
                  name="campo39"
                  value={inputValues.campo39 || ''}
                  onChange={handleInputChange}
                />
              </label>
              <br />
            </div>

            <div>
              <label>
                ACE Visoespaciales:ㅤ
                <input
                  type="text"
                  name="campo40"
                  value={inputValues.campo40 || ''}
                  onChange={handleInputChange}
                />
              </label>
              <br />
            </div>

            <div>
              <label>
                ACE TOTAL:ㅤ
                <input
                  type="text"
                  name="campo41"
                  value={inputValues.campo41 || ''}
                  onChange={handleInputChange}
                />
              </label>
              <br />
            </div>

            <div>
              <label>
                MMSE:ㅤ
                <input
                  type="text"
                  name="campo42"
                  value={inputValues.campo42 || ''}
                  onChange={handleInputChange}
                />
              </label>
              <br />
            </div>

            <div>
              <label>
                5. ECOG:ㅤ
                <input
                  type="text"
                  name="campo43"
                  value={inputValues.campo43 || ''}
                  onChange={handleInputChange}
                />
              </label>
              <br />
            </div>

            <div>
              <label>
                ECOG Memoria:ㅤ
                <input
                  type="text"
                  name="campo44"
                  value={inputValues.campo44 || ''}
                  onChange={handleInputChange}
                />
              </label>
              <br />
            </div>

            <div>
              <label>
                ECOG Planificación:ㅤ
                <input
                  type="text"
                  name="campo45"
                  value={inputValues.campo45 || ''}
                  onChange={handleInputChange}
                />
              </label>
              <br />
            </div>

            <div>
              <label>
                ECOG Lenguaje:ㅤ
                <input
                  type="text"
                  name="campo46"
                  value={inputValues.campo46 || ''}
                  onChange={handleInputChange}
                />
              </label>
              <br />
            </div>

            <div>
              <label>
                ECOG Organización:ㅤ
                <input
                  type="text"
                  name="campo47"
                  value={inputValues.campo47 || ''}
                  onChange={handleInputChange}
                />
              </label>
              <br />
            </div>

            <div>
              <label>
                ECOG Atención:ㅤ
                <input
                  type="text"
                  name="campo48"
                  value={inputValues.campo48 || ''}
                  onChange={handleInputChange}
                />
              </label>
              <br />
            </div>

            <div>
              <label>
                ECOG Visuoespacial:ㅤ
                <input
                  type="text"
                  name="campo49"
                  value={inputValues.campo49 || ''}
                  onChange={handleInputChange}
                />
              </label>
              <br />
            </div>

            <div>
              <label>
                ECOG TOTAL:ㅤ
                <input
                  type="text"
                  name="campo50"
                  value={inputValues.campo50 || ''}
                  onChange={handleInputChange}
                />
              </label>
              <br />
            </div>

            <div>
              <label>
                6. ESCALA DEPRESIÓN GERIÁTRICA - YESAVAGE:ㅤ
                <input
                  type="text"
                  name="campo51"
                  value={inputValues.campo51 || ''}
                  onChange={handleInputChange}
                />
              </label>
              <br />
            </div>

            <div>
              <label>
                7. ESCALA DE HACHINSKI:ㅤ
                <input
                  type="text"
                  name="campo52"
                  value={inputValues.campo52 || ''}
                  onChange={handleInputChange}
                />
              </label>
              <br />
            </div>

            <div>
              <label>
                8. CERAD:ㅤ
                <input
                  type="text"
                  name="campo53"
                  value={inputValues.campo53 || ''}
                  onChange={handleInputChange}
                />
              </label>
              <br />
            </div>

            <div>
              <label>
                DENOMINACION (Test de Boston):ㅤ
                <input
                  type="text"
                  name="campo54"
                  value={inputValues.campo54 || ''}
                  onChange={handleInputChange}
                />
              </label>
              <br />
            </div>

            <div>
              <label>
                Puntaje alta:ㅤ
                <input
                  type="text"
                  name="campo55"
                  value={inputValues.campo55 || ''}
                  onChange={handleInputChange}
                />
              </label>
              <br />
            </div>

            <div>
              <label>
                Puntaje media:ㅤ
                <input
                  type="text"
                  name="campo56"
                  value={inputValues.campo56 || ''}
                  onChange={handleInputChange}
                />
              </label>
              <br />
            </div>

            <div>
              <label>
                Puntaje baja:ㅤ
                <input
                  type="text"
                  name="campo57"
                  value={inputValues.campo57 || ''}
                  onChange={handleInputChange}
                />
              </label>
              <br />
            </div>

            <div>
              <label>
                Puntaje total/15:ㅤ
                <input
                  type="text"
                  name="campo58"
                  value={inputValues.campo58 || ''}
                  onChange={handleInputChange}
                />
              </label>
              <br />
            </div>

            <div>
              <label>
                MEMORIA DE UNA LISTA DE PALABRAS:ㅤ
                <input
                  type="text"
                  name="campo59"
                  value={inputValues.campo59 || ''}
                  onChange={handleInputChange}
                />
              </label>
              <br />
            </div>

            <div>
              <label>
                Intento 1 totales:ㅤ
                <input
                  type="text"
                  name="campo60"
                  value={inputValues.campo60 || ''}
                  onChange={handleInputChange}
                />
              </label>
              <br />
            </div>

            <div>
              <label>
                Intento 1 intrusiones:ㅤ
                <input
                  type="text"
                  name="campo61"
                  value={inputValues.campo61 || ''}
                  onChange={handleInputChange}
                />
              </label>
              <br />
            </div>

            <div>
              <label>
                Intento 2 totales:ㅤ
                <input
                  type="text"
                  name="campo62"
                  value={inputValues.campo62 || ''}
                  onChange={handleInputChange}
                />
              </label>
              <br />
            </div>

            <div>
              <label>
                Intento 2 intrusiones:ㅤ
                <input
                  type="text"
                  name="campo63"
                  value={inputValues.campo63 || ''}
                  onChange={handleInputChange}
                />
              </label>
              <br />
            </div>

            <div>
              <label>
                Intento 3 totales:ㅤ
                <input
                  type="text"
                  name="campo64"
                  value={inputValues.campo64 || ''}
                  onChange={handleInputChange}
                />
              </label>
              <br />
            </div>

            <div>
              <label>
                Intento 3 intrusiones:ㅤ
                <input
                  type="text"
                  name="campo65"
                  value={inputValues.campo65 || ''}
                  onChange={handleInputChange}
                />
              </label>
              <br />
            </div>

            <div>
              <label>
                Total palabras:ㅤ
                <input
                  type="text"
                  name="campo66"
                  value={inputValues.campo66 || ''}
                  onChange={handleInputChange}
                />
              </label>
              <br />
            </div>

            <div>
              <label>
                Total intrusiones:ㅤ
                <input
                  type="text"
                  name="campo67"
                  value={inputValues.campo67 || ''}
                  onChange={handleInputChange}
                />
              </label>
              <br />
            </div>

            <div>
              <label>
                PRAXIAS CONSTRUCTIVAS:ㅤ
                <input
                  type="text"
                  name="campo68"
                  value={inputValues.campo68 || ''}
                  onChange={handleInputChange}
                />
              </label>
              <br />
            </div>

            <div>
              <label>
                Círculo - Item 1:ㅤ
                <input
                  type="text"
                  name="campo69"
                  value={inputValues.campo69 || ''}
                  onChange={handleInputChange}
                />
              </label>
              <br />
            </div>

            <div>
              <label>
                Rombo - Item 2:ㅤ
                <input
                  type="text"
                  name="campo70"
                  value={inputValues.campo70 || ''}
                  onChange={handleInputChange}
                />
              </label>
              <br />
            </div>

            <div>
              <label>
                Rectángulos - Item 3:ㅤ
                <input
                  type="text"
                  name="campo71"
                  value={inputValues.campo71 || ''}
                  onChange={handleInputChange}
                />
              </label>
              <br />
            </div>

            <div>
              <label>
                Cubo - Item 4:ㅤ
                <input
                  type="text"
                  name="campo72"
                  value={inputValues.campo72 || ''}
                  onChange={handleInputChange}
                />
              </label>
              <br />
            </div>

            <div>
              <label>
                Total 11:ㅤ
                <input
                  type="text"
                  name="campo73"
                  value={inputValues.campo73 || ''}
                  onChange={handleInputChange}
                />
              </label>
              <br />
            </div>

            <div>
              <label>
                RECUERDO DE UNA LISTA DE PALABRAS:ㅤ
                <input
                  type="text"
                  name="campo74"
                  value={inputValues.campo74 || ''}
                  onChange={handleInputChange}
                />
              </label>
              <br />
            </div>

            <div>
              <label>
                Total 10:ㅤ
                <input
                  type="text"
                  name="campo75"
                  value={inputValues.campo75 || ''}
                  onChange={handleInputChange}
                />
              </label>
              <br />
            </div>

            <div>
              <label>
                Total intrusiones:ㅤ
                <input
                  type="text"
                  name="campo76"
                  value={inputValues.campo76 || ''}
                  onChange={handleInputChange}
                />
              </label>
              <br />
            </div>

            <div>
              <label>
                RECONOCIMIENTO DE UNA LISTA DE PALABRAS:ㅤ
                <input
                  type="text"
                  name="campo77"
                  value={inputValues.campo77 || ''}
                  onChange={handleInputChange}
                />
              </label>
              <br />
            </div>

            <div>
              <label>
                Total SI correctos/10:ㅤ
                <input
                  type="text"
                  name="campo78"
                  value={inputValues.campo78 || ''}
                  onChange={handleInputChange}
                />
              </label>
              <br />
            </div>

            <div>
              <label>
                Total NO correctos/10:ㅤ
                <input
                  type="text"
                  name="campo79"
                  value={inputValues.campo79 || ''}
                  onChange={handleInputChange}
                />
              </label>
              <br />
            </div>

            <div>
              <label>
                EVOCACIÓN PRAXIAS CONSTRUCTIVAS:ㅤ
                <input
                  type="text"
                  name="campo80"
                  value={inputValues.campo80 || ''}
                  onChange={handleInputChange}
                />
              </label>
              <br />
            </div>

            <div>
              <label>
                Círculo - Item 1:ㅤ
                <input
                  type="text"
                  name="campo81"
                  value={inputValues.campo81 || ''}
                  onChange={handleInputChange}
                />
              </label>
              <br />
            </div>

            <div>
              <label>
                Rombo - Item 2:ㅤ
                <input
                  type="text"
                  name="campo82"
                  value={inputValues.campo82 || ''}
                  onChange={handleInputChange}
                />
              </label>
              <br />
            </div>

            <div>
              <label>
                Rectángulos - Item 3:ㅤ
                <input
                  type="text"
                  name="campo83"
                  value={inputValues.campo83 || ''}
                  onChange={handleInputChange}
                />
              </label>
              <br />
            </div>

            <div>
              <label>
                Cubo - Item 4:ㅤ
                <input
                  type="text"
                  name="campo84"
                  value={inputValues.campo84 || ''}
                  onChange={handleInputChange}
                />
              </label>
              <br />
            </div>

            <div>
              <label>
                Total 11:ㅤ
                <input
                  type="text"
                  name="campo85"
                  value={inputValues.campo85 || ''}
                  onChange={handleInputChange}
                />
              </label>
              <br />
            </div>

            <div>
              <label>
                TRAIL MAKING TEST (T.M.T) PARTE A:ㅤ
                <input
                  type="text"
                  name="campo86"
                  value={inputValues.campo86 || ''}
                  onChange={handleInputChange}
                />
              </label>
              <br />
            </div>

            <div>
              <label>
                Aciertos /24:ㅤ
                <input
                  type="text"
                  name="campo87"
                  value={inputValues.campo87 || ''}
                  onChange={handleInputChange}
                />
              </label>
              <br />
            </div>

            <div>
              <label>
                Errores:ㅤ
                <input
                  type="text"
                  name="campo88"
                  value={inputValues.campo88 || ''}
                  onChange={handleInputChange}
                />
              </label>
              <br />
            </div>

            <div>
              <label>
                Tiempo en segundos:ㅤ
                <input
                  type="text"
                  name="campo89"
                  value={inputValues.campo89 || ''}
                  onChange={handleInputChange}
                />
              </label>
              <br />
            </div>

            <div>
              <label>
                Ensayo a los 300’’:ㅤ
                <input
                  type="text"
                  name="campo90"
                  value={inputValues.campo90 || ''}
                  onChange={handleInputChange}
                />
              </label>
              <br />
            </div>

            <div>
              <label>
                TRAIL MAKING TEST (T.M.T) PARTE B:ㅤ
                <input
                  type="text"
                  name="campo91"
                  value={inputValues.campo91 || ''}
                  onChange={handleInputChange}
                />
              </label>
              <br />
            </div>

            <div>
              <label>
                Aciertos /24:ㅤ
                <input
                  type="text"
                  name="campo92"
                  value={inputValues.campo92 || ''}
                  onChange={handleInputChange}
                />
              </label>
              <br />
            </div>

            <div>
              <label>
                Errores:ㅤ
                <input
                  type="text"
                  name="campo93"
                  value={inputValues.campo93 || ''}
                  onChange={handleInputChange}
                />
              </label>
              <br />
            </div>

            <div>
              <label>
                Tiempo en segundos:ㅤ
                <input
                  type="text"
                  name="campo94"
                  value={inputValues.campo94 || ''}
                  onChange={handleInputChange}
                />
              </label>
              <br />
            </div>

            <div>
              <label>
                Ensayo a los 300’’:ㅤ
                <input
                  type="text"
                  name="campo95"
                  value={inputValues.campo95 || ''}
                  onChange={handleInputChange}
                />
              </label>
              <br />
            </div>

            <div>
              <label>
                FIGURA COMPLEJA DE REY - OSTERRIETH - COPIA:ㅤ
                <input
                  type="text"
                  name="campo96"
                  value={inputValues.campo96 || ''}
                  onChange={handleInputChange}
                />
              </label>
              <br />
            </div>

            <div>
              <label>
                Tiempo en segundos:ㅤ
                <input
                  type="text"
                  name="campo97"
                  value={inputValues.campo97 || ''}
                  onChange={handleInputChange}
                />
              </label>
              <br />
            </div>

            <div>
              <label>
                Puntaje:ㅤ
                <input
                  type="text"
                  name="campo98"
                  value={inputValues.campo98 || ''}
                  onChange={handleInputChange}
                />
              </label>
              <br />
            </div>

            <div>
              <label>
                FIGURA COMPLEJA DE REY - OSTERRIETH - EVOCACIÓN:ㅤ
                <input
                  type="text"
                  name="campo99"
                  value={inputValues.campo99 || ''}
                  onChange={handleInputChange}
                />
              </label>
              <br />
            </div>

            <div>
              <label>
                Tiempo en segundos:ㅤ
                <input
                  type="text"
                  name="campo100"
                  value={inputValues.campo100 || ''}
                  onChange={handleInputChange}
                />
              </label>
              <br />
            </div>

            <div>
              <label>
                Puntaje:ㅤ
                <input
                  type="text"
                  name="campo101"
                  value={inputValues.campo101 || ''}
                  onChange={handleInputChange}
                />
              </label>
              <br />
            </div>

            <div>
              <label>
                FLUIDEZ VERBAL:ㅤ
                <input
                  type="text"
                  name="campo102"
                  value={inputValues.campo102 || ''}
                  onChange={handleInputChange}
                />
              </label>
              <br />
            </div>

            <div>
              <label>
                Total F:ㅤ
                <input
                  type="text"
                  name="campo103"
                  value={inputValues.campo103 || ''}
                  onChange={handleInputChange}
                />
              </label>
              <br />
            </div>

            <div>
              <label>
                Total A:ㅤ
                <input
                  type="text"
                  name="campo104"
                  value={inputValues.campo104 || ''}
                  onChange={handleInputChange}
                />
              </label>
              <br />
            </div>

            <div>
              <label>
                Total S:ㅤ
                <input
                  type="text"
                  name="campo105"
                  value={inputValues.campo105 || ''}
                  onChange={handleInputChange}
                />
              </label>
              <br />
            </div>

            <div>
              <label>
                Pérdida de categoría:ㅤ
                <input
                  type="text"
                  name="campo106"
                  value={inputValues.campo106 || ''}
                  onChange={handleInputChange}
                />
              </label>
              <br />
            </div>

            <div>
              <label>
                Puntuación total:ㅤ
                <input
                  type="text"
                  name="campo107"
                  value={inputValues.campo107 || ''}
                  onChange={handleInputChange}
                />
              </label>
              <br />
            </div>

            <div>
              <label>
                9. ESCALA DE TRASTORNOS DE MEMORIA:ㅤ
                <input
                  type="text"
                  name="campo108"
                  value={inputValues.campo108 || ''}
                  onChange={handleInputChange}
                />
              </label>
              <br />
            </div>

            <div>
              <label>
                QF Total:ㅤ
                <input
                  type="text"
                  name="campo109"
                  value={inputValues.campo109 || ''}
                  onChange={handleInputChange}
                />
              </label>
              <br />
            </div>

            <div>
              <label>
                QP Total:ㅤ
                <input
                  type="text"
                  name="campo110"
                  value={inputValues.campo110 || ''}
                  onChange={handleInputChange}
                />
              </label>
              <br />
            </div>

            <div>
              <label>
                10. ESCALA GLOBAL DE DETERIORO:ㅤ
                <input
                  type="text"
                  name="campo111"
                  value={inputValues.campo111 || ''}
                  onChange={handleInputChange}
                />
              </label>
              <br />
            </div>

            <div>
              <label>
                Puntaje:ㅤ
                <input
                  type="text"
                  name="campo112"
                  value={inputValues.campo112 || ''}
                  onChange={handleInputChange}
                />
              </label>
              <br />
            </div>

            <div>
              <label>
                11. ESCALA DE BARTHEL DE AVD Y ALIMENTACIÓN:ㅤ
                <input
                  type="text"
                  name="campo113"
                  value={inputValues.campo113 || ''}
                  onChange={handleInputChange}
                />
              </label>
              <br />
            </div>

            <div>
              <label>
                Puntaje /50:ㅤ
                <input
                  type="text"
                  name="campo114"
                  value={inputValues.campo114 || ''}
                  onChange={handleInputChange}
                />
              </label>
              <br />
            </div>

            <div>
              <label>
                12. ESCALA DE LAWTON Y BRODY:ㅤ
                <input
                  type="text"
                  name="campo115"
                  value={inputValues.campo115 || ''}
                  onChange={handleInputChange}
                />
              </label>
              <br />
            </div>

            <div>
              <label>
                Total /5 o Total /8:ㅤ
                <input
                  type="text"
                  name="campo116"
                  value={inputValues.campo116 || ''}
                  onChange={handleInputChange}
                />
              </label>
              <br />
            </div>

            <div>
              <label>
                13. THE TECHONOLOGY - ACTIVITIES OF DAILY LIVING QUESTIONNAIRE (T-ADLQ):ㅤ
                <input
                  type="text"
                  name="campo117"
                  value={inputValues.campo117 || ''}
                  onChange={handleInputChange}
                />
              </label>
              <br />
            </div>

            <div>
              <label>
                Puntaje de deterioro funcional:ㅤ
                <input
                  type="text"
                  name="campo118"
                  value={inputValues.campo118 || ''}
                  onChange={handleInputChange}
                />
              </label>
              <br />
            </div>

            <div>
              <label>
                14. FUNCIONES DETALLADAS DE LA VIDA DIARIA (FDVD):ㅤ
                <input
                  type="text"
                  name="campo119"
                  value={inputValues.campo119 || ''}
                  onChange={handleInputChange}
                />
              </label>
              <br />
            </div>

            <div>
              <label>
                Total funciones relacionales ( R ) (/52):ㅤ
                <input
                  type="text"
                  name="campo120"
                  value={inputValues.campo120 || ''}
                  onChange={handleInputChange}
                />
              </label>
              <br />
            </div>

            <div>
              <label>
                Puntaje de deterioro funcional ( C ) (/30):ㅤ
                <input
                  type="text"
                  name="campo121"
                  value={inputValues.campo121 || ''}
                  onChange={handleInputChange}
                />
              </label>
              <br />
            </div>

            <div>
              <label>
                15. INECO FRONTAL SCREENING (IFS):ㅤ
                <input
                  type="text"
                  name="campo122"
                  value={inputValues.campo122 || ''}
                  onChange={handleInputChange}
                />
              </label>
              <br />
            </div>

            <div>
              <label>
                Índice de Memoria de Trabajo (Dígitos atrás + corsi):ㅤ
                <input
                  type="text"
                  name="campo123"
                  value={inputValues.campo123 || ''}
                  onChange={handleInputChange}
                />
              </label>
              <br />
            </div>

            <div>
              <label>
                Puntaje total:ㅤ
                <input
                  type="text"
                  name="campo124"
                  value={inputValues.campo124 || ''}
                  onChange={handleInputChange}
                />
              </label>
              <br />
            </div>

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
