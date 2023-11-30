import PropTypes from 'prop-types'

const ModalAlert = ({ message, onClose, isOpen }) => {
  return (
    <div className='modal' style={{ display: isOpen ? 'block' : 'none' }}>
      <div className='modal-content'>
        <span className='close' onClick={onClose}>&times;</span>
        <p tabIndex='0'>{message}</p>
      </div>
    </div>
  )
}

ModalAlert.propTypes = {
  message: PropTypes.any,
  onClose: PropTypes.any,
  isOpen: PropTypes.any
}

export default ModalAlert

{/*

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

  setModalAMessage('Error: No se pudo establecer conexión con el servidor.')
  setIsModalOpen(true)

      <div onKeyDown={handleTabKeyPress}>
        <ModalAlert
          message={modalAMessage}
          isOpen={isModalOpen}
          onClose={closeAModal}
        />
      </div>

*/}