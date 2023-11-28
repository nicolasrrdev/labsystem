import { useState, useEffect } from 'react'
import ModalAlert from './ModalAlert'
import * as ExamData from '../data/ExamData'

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
  const [tablaExamenId,setTablaExamenId] = useState()

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
    const { name, value } = e.target
    setInputValues({
      ...inputValues,
      [name]: value
    })
    //console.log('inputValues:', inputValues)
  }
  useEffect(() => {
    dataId?.length && fetch(`${BASE_URL}/api/tabla_examen/_campos/get/${dataId}`)
      .then((response) => response.json())
      .then((response) => {
        const campos = response.map((item) => item.campo)
        setTablaExamenId(response[0]?.tabla_examen_id)
        const defaultInputValues = ExamData.titlesArray.reduce((acc, title, index) => {
          acc[`campo${index + 1}`] = campos[index]
          return acc
        }, {})
        setInputValues(defaultInputValues)
      })
      .catch((error) => {
        console.error(error)
      })
  }, [BASE_URL, dataId])
  

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

  const errorMessages = {
    '404': 'No se encontraron registros',
    '404-2': 'No se encontraron registros',
    '500': 'Ha ocurrido un error inesperado',
    'default': 'Error: No se pudo establecer conexión con el servidor'
  }
  const handleSubmit1 = (e) => {
    e.preventDefault()
    setIsSubmitting(true)
    const fetchAllData = fetch(`${BASE_URL}/api/tabla_examen/get/all`)
      .then((response) => {
        if (response.status === 404) {
          throw new Error('404')
        }
        if (response.status === 500) {
          throw new Error('500')
        }
        return response.json()
      })
    const fetchSpecificData = fetch(`${BASE_URL}/api/tabla_examen/get/timestamp/${pacienteSeleccionado}`)
      .then((response) => {
        if (response.status === 404) {
          throw new Error('404-2')
        }
      })
    Promise.all([fetchAllData, fetchSpecificData])
      .then(([allData]) => {
        setTablaExamenData(allData)
        setInitialPage(false)
        setSubmitted1(true)
      })
      .catch((error) => {
        setModalAMessage(errorMessages[error.message] || errorMessages.default)
        setIsModalOpen(true)
        console.error(error)
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
    fetch(`${BASE_URL}/api/tabla_examen/_campos/get/${dataId}`)
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
    const dataArray = Object.values(inputValues)
    console.log('Data enviada por PUT:', dataArray)
    fetch(`${BASE_URL}/api/tabla_examen/put/${tablaExamenId}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(dataArray)
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

  const downloadData = () => {
    const sanitizedData = ExamData.titlesArray.map(title => title.replace(/<.*?>/g, ''))
    const data = sanitizedData.map((title, index) => [
      title,
      inputValues[`campo${index + 1}`],
    ])
    const csvContent = data.map(row => row.join(';')).join('\n')
    const blob = new Blob([csvContent], { type: 'text/csv charset=UTF-8' })
    const url = window.URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = 'user_data.csv'
    a.click()
    window.URL.revokeObjectURL(url)
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
          <div> <br />
            <h2>Editar Tabla de Datos y Exámenes</h2> <br />
            <p>Paciente: {infoPaciente.nombres + ' ' + infoPaciente.apellidos}</p>
            <form onSubmit={handleSubmit2}>
              <label className='labelFontSize' htmlFor='timestampSelect'>Registro: </label>
              <select id='timestampSelect' onChange={handleRegistroSeleccionado}>
                <option value=''>Seleccione un registro</option>
                {tablaExamenData
                  .filter(item => item.paciente_id === pacienteSeleccionado)
                  .sort((a, b) => new Date(b.timestamp) - new Date(a.timestamp))
                  .map(item => (
                    <option key={item.timestamp} value={item.timestamp} data-id={item.id}>
                      {new Date(item.timestamp).toLocaleString()}
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
            <table>
              <tbody>
                {ExamData.titlesArray.map((title, index) => (
                  <tr key={index}>
                    <td className='tdTitle' dangerouslySetInnerHTML={{ __html: title }}></td>
                    <td>
                      <textarea
                        rows={2}
                        type='text'
                        className='input-no-borders'
                        name={`campo${index + 1}`}
                        value={inputValues[`campo${index + 1}`]}
                        onChange={handleInputChange}
                      />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            <h6>{`*Para una correcta visualización de los datos en Excel: Data -> Get Data -> From File -> From Text/CSV -> Abrir el archivo File Origin: UTF-8 Delimiter: Semicolon -> Load`}</h6>
            <button disabled={isSubmitting} onClick={handleSubmit3}>Editar Registro</button> <br /> <br />
            <button className='downloadData' onClick={downloadData}>Descargar Datos</button> <br /> <br />
            <button className='boton-scroll-top' onClick={scrollToTop}>Ir al principio</button> <br /> <br />
            <button className='btnVolv' onClick={handleReloadPage}>Volver</button> <br /> <br />
          </div>
        </center>
      )}
    </div>
  )
}

export default EditarTablaExamen