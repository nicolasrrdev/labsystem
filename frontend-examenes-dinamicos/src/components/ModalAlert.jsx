import PropTypes from 'prop-types'

const ModalAlert = ({ message, onClose }) => {
  return (
    <div className='modal'>
      <div className='modal-content'>
        <span className='close' onClick={onClose}>&times;</span>
        <p>{message}</p>
      </div>
    </div>
  )
}

ModalAlert.propTypes = {
  message: PropTypes.any,
  onClose: PropTypes.any
}

export default ModalAlert

{/*

const [isModalOpen, setIsModalOpen] = useState(false)
const [modalAMessage, setModalAMessage] = useState('')
const closeAModal = () => {
  setIsModalOpen(false)
}

  setModalAMessage('Error: No se pudo establecer conexión con el servidor.')
  setIsModalOpen(true)

    {isModalOpen && (
      <ModalAlert message={modalAMessage} onClose={closeAModal} />
    )}

*/}