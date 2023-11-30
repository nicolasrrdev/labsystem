import { useState } from 'react'
import ModalAlert from './ModalAlert'

const CrearExamen = () => {
  const BASE_URL = import.meta.env.VITE_BASE_URL
  const [nombre, setNombre] = useState('')
  const [numero, setNumero] = useState('')
  const [submitted, setSubmitted] = useState(false)
  const [inputs, setInputs] = useState([])
  const [options, setOptions] = useState('')
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

  const handleSubmit1 = (e) => {
    e.preventDefault()
    const parsedNumero = parseInt(numero)
    setInputs(new Array(parsedNumero).fill({value: '', type: 'Texto'}))
    setOptions(new Array(parsedNumero).fill('Texto'))
    setSubmitted(true)
  }

  const handleInputChange = (index, e) => {
    const newInputs = [...inputs]
    newInputs[index] = { value: e.target.value, type: options[index] }
    setInputs(newInputs)
  }

  const handleFieldChange = (index, e) => {
    const newOptions = [...options]
    newOptions[index] = e.target.value
    setOptions(newOptions)
  }

  const handleSubmit2 = (e) => {
    e.preventDefault()
    const data = {
      nombreExamen: nombre,
    }
    setIsSubmitting(true)
    inputs.forEach((input, index) => {
      data[`nombreCampo${index + 1}`] = input.value
      data[`tipoCampo${index + 1}`] = options[index]
    })
    fetch(`${BASE_URL}/api/generateTable`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data)
    })
    .then((response) => {
      if (response.status === 500) {
        return Promise.reject('Ha ocurrido un error inesperado')
      }
    })
    .then(() => {
      setRegistroExitoso(true)
    })
    .catch((error) => {
      if (error === 'Ha ocurrido un error inesperado') {
        setModalAMessage('Ha ocurrido un error inesperado')
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

const handleReload = () => {
  window.location.reload()
}

if (registroExitoso) {
  return (
    <div>
      <center>
        <br />
        <h2>Examen creado con éxito</h2>
        <br />
        <button onClick={handleReload}>Crear otro Examen</button>
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
      {!submitted &&
        <center><br/>
        <h2>Crear Examen</h2><br/>
          <form onSubmit={handleSubmit1}>
            Nombre del Examen:ㅤ<input type='text' name='nombreExamen' value={nombre} onChange={(e) => setNombre(e.target.value)} 
            // pattern = '^[a-zA-ZñÑáéíóúÁÉÍÓÚ 0-9#]{2,20}$'
            // title='Ingrese un Nombre válido.'
            required maxLength='50'
            /> <br />
            <br/>Número de Campos del Examen:ㅤ<input type='number' name='numCampos' value={numero} onChange={(e) => setNumero(e.target.value)} required 
            step='1' min='1' max='200' /> <br />
            <br/><button disabled={!nombre || !numero} type='submit'>Continuar</button>
          </form>
        </center>     
      }
      {submitted &&
        <center><br/>
          <h2>Creación del Examen: {nombre}</h2>
          <h2>Número de Campos: {inputs.length}</h2><br/>
            <form onSubmit={handleSubmit2}>
              {inputs.map((input, index) => (
                <div key={index}>
                  <label htmlFor={`input-${index}`} >
                    {`Nombre del Campo #${index + 1}:ㅤ`}
                  </label>
                  <input type='text' id={`input-${index}`} value={input.value} onChange={(e) => handleInputChange(index, e)} 
                  // pattern = '^[a-zA-ZñÑáéíóúÁÉÍÓÚ 0-9#]{2,20}$'
                  // title='Ingrese un Nombre válido.'
                  required maxLength='50'
                  />
                  ㅤTipo de Campo:ㅤ<select name={`tipoCampo-${index}`} value={options[index]} onChange={(e) => handleFieldChange(index, e)}>
                    <option value='Texto'>Texto</option>
                    <option value='Numérico'>Numérico</option>
                  </select>
                </div>
              ))}
              <br /> <button type='submit' disabled={isSubmitting || inputs.some(input => !input.value)}>Guardar Examen</button><br/>
            </form>
            <br /> <button className='btnVolv' onClick={handleReload}>Volver</button> <br /> <br />
        </center>
      }
    </div>
  )

}

export default CrearExamen