import { useEffect } from 'react'
import PropTypes from 'prop-types'

const AutoDisappearModal = ({ message, timeout, onClose }) => {
  useEffect(() => {
    const timer = setTimeout(() => {
      onClose()
    }, timeout)

    return () => clearTimeout(timer)
  }, [onClose, timeout])

  return (
    <div className='modal'>
      <div className='modal-content'>
        <p>{message}</p>
      </div>
    </div>
  )
}

AutoDisappearModal.propTypes = {
  message: PropTypes.any,
  timeout: PropTypes.any,
  onClose: PropTypes.any
}

export default AutoDisappearModal

{/*

  const [firstModalVisible, setFirstModalVisible] = useState(true)
  const [secondModalVisible, setSecondModalVisible] = useState(false)
  const [thridModalVisible, setThridModalVisible] = useState(false)
  const [modalMessage, setModalMessage] = useState('')
  const [modalMessage2, setModalMessage2] = useState('')
  const [modalMessage3, setModalMessage3] = useState('')
  const modalTimeout = 1000
  const handleFirstModalClose = () => {
    setSecondModalVisible(true)
  }
  const handleSecondModalClose = () => {
    setThridModalVisible(true)
  }
  const closeModal = () => {
    setFirstModalVisible(false)
    setSecondModalVisible(false)
    setThridModalVisible(false)
  }

  setModalMessage('Ha ocurrido un error al obtener los pacientes')
  setFirstModalVisible(true)

  setModalMessage2('Ha ocurrido un error al obtener el paciente seleccionado')
  setFirstModalVisible(true)

    {firstModalVisible && modalMessage && (
      <AutoDisappearModal
        message={modalMessage}
        timeout={modalTimeout}
        onClose={handleFirstModalClose}
      />
    )}
    {secondModalVisible && modalMessage2 && (
      <AutoDisappearModal
        message={modalMessage2}
        timeout={modalTimeout}
        onClose={closeModal}
      />
    )}

// Se muestra un modal sobre otro y cada vez el fondo es más oscuro

App.css

.modal {
  display: block;
  position: fixed;
  z-index: 1;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  overflow: auto;
  background-color: rgba(0, 0, 0, 0.5);
}

.modal-content {
  background-color: #fefefe;
  margin: 20% auto;
  padding: 20px;
  border: 1px solid #888;
  width: 80%;
  box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2);
}

.close {
  float: right;
  font-size: 38px;
  font-weight: bold;
}

.close:hover,
.close:focus {
  color: #000;
  text-decoration: none;
  cursor: pointer;
}

*/}
