// import { Component } from 'react'

// import UserService from '../services/user.service'
// import EventBus from '../common/EventBus'

// export default class BoardAdmin extends Component {
//   constructor(props) {
//     super(props)

//     this.state = {
//       content: ''
//     }
//   }

//   componentDidMount() {
//     UserService.getAdminBoard().then(
//       response => {
//         this.setState({
//           content: response.data
//         })
//       },
//       error => {
//         this.setState({
//           content:
//             (error.response &&
//               error.response.data &&
//               error.response.data.message) ||
//             error.message ||
//             error.toString()
//         })

//         if (error.response && error.response.status === 401) {
//           EventBus.dispatch('logout')
//         }
//       }
//     )
//   }

//   render() {
//     return (
//       <div className='container'>
//         <header className='jumbotron'>
//           <h3>{this.state.content}</h3>
//         </header>
//       </div>
//     )
//   }
// }

const BoardAdmin = () => {
  return (
    <div>
      <center>
      <br />
      <h2>Bienvenido al Panel de Administrador</h2>
      <p>¡Hola, Administrador! Aquí puedes gestionar las tareas de administración.</p>
      </center>
    </div>
  )
}

export default BoardAdmin
