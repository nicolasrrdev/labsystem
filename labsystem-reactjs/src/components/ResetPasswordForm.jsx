import { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import axios from 'axios';

const ResetPasswordForm = () => {
  const BASE_URL = import.meta.env.VITE_BASE_URL
  const [newPassword, setNewPassword] = useState('');
  const [message, setMessage] = useState('');
  const [inputDisabled, setInputDisabled] = useState(false);
  const [searchParams] = useSearchParams();
  const token = searchParams.get('token');

  useEffect(() => {
    if (message === 'La contraseña ha sido modificada con éxito') {
      setInputDisabled(true);
    }
  }, [message]);

  const handlePasswordChange = (e) => {
    setNewPassword(e.target.value);
  };

  const isPasswordValid = () => {
    let isValid = true;
    let errorMessage = '';

    if (newPassword.length < 8) {
      isValid = false;
      errorMessage = 'La contraseña debe tener al menos 8 caracteres.';
    } else if (!/[a-z]/.test(newPassword)) {
      isValid = false;
      errorMessage = 'La contraseña debe contener al menos una letra minúscula.';
    } else if (!/[A-Z]/.test(newPassword)) {
      isValid = false;
      errorMessage = 'La contraseña debe contener al menos una letra mayúscula.';
    }

    setMessage(errorMessage);
    return isValid;
  };

  const handleResetPassword = async () => {
    try {

      if (!isPasswordValid()) {
        return;
      }

      const response = await axios.post(`${BASE_URL}/reset-password/confirm`, { token, newPassword });
      setMessage(response.data.message);
    } catch (error) {
      setMessage(error.response.data.error);
    }
  };

  return (
    <div>
      <center>
        <br />
        <h2>Restablecer Contraseña</h2>
        <br />
        <label>
          Nueva Contraseña:ㅤ
          <input
            type="password"
            value={newPassword}
            onChange={handlePasswordChange}
            disabled={inputDisabled}
          />
        </label>
        <br />
        <button onClick={handleResetPassword} disabled={inputDisabled}>
          Restablecer Contraseña
        </button>
        <br /> <br />
        {message && <p>{message}</p>}
      </center>
    </div>
  );
};

export default ResetPasswordForm;
