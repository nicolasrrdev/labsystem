import { useState } from 'react'
import Confetti from 'react-confetti'
import Usco from '../assets/usco.png'

const Inicio = () => {
  const [confettiVisible, setConfettiVisible] = useState(false)
  const triggerConfetti = () => {
    setConfettiVisible(true)
    setTimeout(() => {
      setConfettiVisible(false)
    }, 10000)
  }

  return (
    <div>
      <center> <br />
        <h2>Sistema de Información</h2>
        <h2>Laboratorio De Neurocognición y Psicofisiología</h2>
        <h2>Bienvenido</h2> <br />
        <img src={Usco} alt='Usco' onClick={triggerConfetti} /> <br /> <br />
        {confettiVisible && <Confetti />}
      </center>
    </div>
  )
}

export default Inicio