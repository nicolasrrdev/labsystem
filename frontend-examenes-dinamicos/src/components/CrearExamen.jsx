import { useState } from 'react'
import ModalAlert from './ModalAlert'

const CrearExamen = () => {

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

  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleSubmit = (event) => {
    event.preventDefault()
    const parsedNumero = parseInt(numero)
    setInputs(new Array(parsedNumero).fill({value: '', type: 'Texto'}))
    setOptions(new Array(parsedNumero).fill('Texto'))
    setSubmitted(true)
  }

  const handleInputChange = (index, event) => {
    const newInputs = [...inputs]
    newInputs[index] = { value: event.target.value, type: options[index] }
    setInputs(newInputs)
  }

  const handleFieldChange = (index, event) => {
    const newOptions = [...options]
    newOptions[index] = event.target.value
    setOptions(newOptions)
  }

  const handleSubmit2 = (event) => {
    event.preventDefault()
    const data = {
      nombreExamen: nombre,
    }
    setIsSubmitting(true)
    inputs.forEach((input, index) => {
      data[`nombreCampo${index + 1}`] = input.value
      data[`tipoCampo${index + 1}`] = options[index]
    })
    // console.log(data)
    fetch('http://localhost:8085/api/generateTable', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data)
    })
    .then(() => {
      setRegistroExitoso(true)
    })
    .catch((error) => {
      setModalAMessage('Error: No se pudo establecer conexión con el servidor.')
      setIsModalOpen(true)
      console.error(error)
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
      {isModalOpen && (
        <ModalAlert message={modalAMessage} onClose={closeAModal} />
      )}
      {!submitted &&
        <center><br/>
        <h2>Crear Nuevo Examen</h2><br/>
          <form onSubmit={handleSubmit}>
            Nombre del Examen:ㅤ<input type='text' name='nombreExamen' value={nombre} onChange={(event) => setNombre(event.target.value)} 
            // pattern = '^[a-zA-ZñÑáéíóúÁÉÍÓÚ 0-9#]{2,20}$'
            // title='Ingrese un Nombre válido.'
            required maxLength='50'
            /> <br />
            <br/>Número de Campos del Examen:ㅤ<input type='number' name='numCampos' value={numero} onChange={(event) => setNumero(event.target.value)} required 
            step='1' min='1' max='200' /> <br />
            <br/><button type='submit'>Continuar</button>
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
                  <input type='text' id={`input-${index}`} value={input.value} onChange={(event) => handleInputChange(index, event)} 
                  // pattern = '^[a-zA-ZñÑáéíóúÁÉÍÓÚ 0-9#]{2,20}$'
                  // title='Ingrese un Nombre válido.'
                  required maxLength='50'
                  />
                  ㅤTipo de Campo:ㅤ<select name={`tipoCampo-${index}`} value={options[index]} onChange={(event) => handleFieldChange(index, event)}>
                    <option value='Texto'>Texto</option>
                    <option value='Numérico'>Numérico</option>
                  </select>
                </div>
              ))}
              <br/><button type='submit' disabled={isSubmitting}>Guardar Examen</button><br/>
            </form>
            <br /> <button onClick={handleReload}>Volver</button>
        </center>
      }
    </div>
  )

}

export default CrearExamen