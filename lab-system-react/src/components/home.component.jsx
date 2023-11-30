// import { Component } from "react";

// import UserService from "../services/user.service";

// export default class Home extends Component {
//   constructor(props) {
//     super(props);

//     this.state = {
//       content: ""
//     };
//   }

//   componentDidMount() {
//     UserService.getPublicContent().then(
//       response => {
//         this.setState({
//           content: response.data
//         });
//       },
//       error => {
//         this.setState({
//           content:
//             (error.response && error.response.data) ||
//             error.message ||
//             error.toString()
//         });
//       }
//     );
//   }

//   render() {
//     return (
//       <div className="container">
//         <header className="jumbotron">
//           <center>
//             <h2>Home</h2>
//             <h3>{this.state.content}</h3>
//           </center>
//         </header>
//       </div>
//     );
//   }
// }

import { useState } from 'react'
import Confetti from 'react-confetti'
// import Usco2 from '../assets/usco.png'
import Usco from '../assets/logo-usco.png'

const Home = () => {
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
        <img src={Usco} alt='Usco' onClick={triggerConfetti} className='uscoLogo' /> <br /> <br />
        {confettiVisible && <Confetti />}
      </center>
    </div>
  )
}

export default Home
