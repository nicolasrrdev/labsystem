// import React from 'react';

// const ModalConfirm = ({ message, onCancel, onConfirm }) => {
//   return (
//     <div className='modal'>
//       <div className='modal-content'>
//         <p>{message}</p>
//         <button onClick={onCancel}>Cancelar</button>
//         <button onClick={onConfirm}>Confirmar</button>
//       </div>
//     </div>
//   );
// }

// export default ModalConfirm;


// import React, { useState } from 'react';
// import ModalConfirm from './ModalConfirm';

// function App() {
//   const [showModal, setShowModal] = useState(false);

//   const handleConfirm = () => {
//     // Lógica para confirmar
//     console.log('Acción confirmada');
//     setShowModal(false);
//   };

//   const handleCancel = () => {
//     // Lógica para cancelar
//     console.log('Acción cancelada');
//     setShowModal(false);
//   };

//   const handleOpenModal = () => {
//     setShowModal(true);
//   };

//   return (
//     <div>
//       <button onClick={handleOpenModal}>Mostrar Modal</button>

//       {showModal && (
//         <ModalConfirm
//           message="¿Estás seguro que deseas realizar esta acción?"
//           onCancel={handleCancel}
//           onConfirm={handleConfirm}
//         />
//       )}
//     </div>
//   );
// }

// export default App;