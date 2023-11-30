import { useState } from 'react';
import axios from 'axios';

const RestorePasswordRequest = () => {
  const BASE_URL = import.meta.env.VITE_BASE_URL
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const handleRequest = async () => {
    setIsSubmitting(true);
    setMessage('Enviando...');

    try {
      const response = await axios.post(
        `${BASE_URL}/reset-password/request`,
        { email },
        {
          headers: {
            'Content-Type': 'application/json',
          },
        }
      );
      console.log('Respuesta del servidor:', response.data);
      setMessage('Se ha enviado un correo para restaurar la contraseña.');
    } catch (error) {
      console.error('Error en la solicitud:', error.response.data);
      setMessage(error.response.data.error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div>
      <center>
      <br /> <h2>Solicitar Restablecimiento de Contraseña</h2>
      <br /> <label>
        Correo Electrónico:ㅤ
        <input type="email" value={email} onChange={handleEmailChange} />
      </label>
      <br /> <button onClick={handleRequest} disabled={isSubmitting || message === 'Se ha enviado un correo para restaurar la contraseña.'}>
        Solicitar Restablecimiento
      </button> <br /> <br /> 
      <p>{message}</p>
      </center>
    </div>
  );
};

export default RestorePasswordRequest;
