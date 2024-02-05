import { Component } from 'react'
import { Navigate } from 'react-router-dom'
import AuthService from '../services/auth.service'

export default class Profile extends Component {
  constructor(props) {
    super(props)
    this.state = {
      redirect: null,
      userReady: false,
      currentUser: { username: '' }
    }
  }

  componentDidMount() {
    const currentUser = AuthService.getCurrentUser()
    if (!currentUser) this.setState({ redirect: '/labsystem/Home' })
    this.setState({ currentUser: currentUser, userReady: true })
  }

  render() {
    if (this.state.redirect) {
      return <Navigate to={this.state.redirect} />
    }
    const { currentUser } = this.state
    return (
      <div className='container'>
        <center>
        {(this.state.userReady) ?
        <div>
        <header className='jumbotron'>
          <br />
          <h2>
            Perfil - Bienvenido
          </h2>
          {/* <h2>
            <strong>Nombre de usuario: </strong>{' '}
            {currentUser.username}
          </h2> */}
          <p>
            <strong>Nombre de usuario: </strong>{' '}
            {currentUser.username}
          </p>
        </header>
        {/* <p>
          <strong>Token:</strong>{' '}
          {currentUser.accessToken.substring(0, 20)} ...{' '}
          {currentUser.accessToken.substr(currentUser.accessToken.length - 20)}
        </p> */}
        {/* <p>
          <strong>Id:</strong>{' '}
          {currentUser.id}
        </p> */}
        <p>
          <strong>Email:</strong>{' '}
          {currentUser.email}
        </p>
        <p>
          <strong>Rol:</strong>{' '}
          {/* {currentUser.roles[0]} */}
          {this.getRoleLabel(currentUser.roles[0])}
        </p>
        {/* <strong>Authorities:</strong> <br /> <br />
        <ul>
          {currentUser.roles &&
            currentUser.roles.map((role, index) => <li key={index}>{role}</li>)}
        </ul> */}
      </div>: null}
      </center>
      </div>
    )
  }
  getRoleLabel(role) {
    switch (role) {
      case 'ROLE_ADMIN':
        return 'Administrador'
      // case 'ROLE_MODERATOR':
      //   return 'Moderador'
      case 'ROLE_EVALUADOR':
        return 'Evaluador'
      // case 'ROLE_ANALISTA':
      //   return 'Analista'
      case 'ROLE_USER':
        return 'Usuario'
      default:
        return 'Desconocido'
    }
  }
}