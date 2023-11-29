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
          const { campo1, campo2, campo3 } = response;
          setInputValues({
            campo1: campo1 || '',
            campo2: campo2 || '',
            campo3: campo3 || '',
          });
        })
        .catch((error) => {
          // Handle error
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
      } else if (response.status === 404) {
        throw new Error('No se encontró el registro');
      } else {
        throw new Error('Ha ocurrido un error inesperado');
      }
    } catch (error) {
      // Manejo de errores
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

  // const scrollToBottom = () => {
  //   window.scrollTo({
  //     top: document.documentElement.scrollHeight,
  //     behavior: 'smooth'
  //   })
  // }
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
    };
  
    console.log('Data enviada por PUT:', requestData);
  
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
      let csvContent = "FCSRT;Total identificación;FCRST Recuerdo libre ensayo 1\n";
      const csvRow = `${data.campo1 || ''};${data.campo2 || ''};${data.campo3 || ''}`;
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
            <h2>Eliminar Tabla de Datos y Exámenes</h2> <br />
            <p>Paciente: {infoPaciente.nombres + ' ' + infoPaciente.apellidos}</p>
            <form onSubmit={handleSubmit2}>
              <label className='labelFontSize' htmlFor='timestampSelect'>Registro: </label>
              <select id='timestampSelect' onChange={handleRegistroSeleccionado}>
                <option value=''>Seleccione un registro</option>
                {tablaExamenData
                  .filter(item => item.pacienteId === parseInt(pacienteSeleccionado)) // Asegúrate de comparar el tipo correcto
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
            <form onSubmit={handleSubmit3}>
              {/* Mostrar los campos para editar */}
              <div>
                <label>
                  Campo 1:
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
                  Campo 2:
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
                  Campo 3:
                  <input
                    type="text"
                    name="campo3"
                    value={inputValues.campo3 || ''}
                    onChange={handleInputChange}
                  />
                </label>
                <br />
              </div>
              <h6>{`*Para una correcta visualización de los datos en Excel: Data -> Get Data -> From File -> From Text/CSV -> Abrir el archivo File Origin: UTF-8 Delimiter: Semicolon -> Load`}</h6>
              <button type='submit' disabled={isSubmitting}>Editar Registro</button>
            </form>
            <br />
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