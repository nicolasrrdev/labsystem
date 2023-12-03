import { useEffect } from 'react'
// import { withRouter } from './with-router'
import PropTypes from 'prop-types'

const parseJwt = (token) => {
  try {
    return JSON.parse(atob(token.split('.')[1]))
  } catch (e) {
    return null
  }
}

export const AuthVerify = (props) => {
  let location = props.router.location
  useEffect(() => {
    const user = JSON.parse(localStorage.getItem('user'))
    if (user) {
      const decodedJwt = parseJwt(user.accessToken)
      if (decodedJwt.exp * 1000 < Date.now()) {
        props.logOut()
      }
    }
  }, [props, location])
  return <div></div>
}

AuthVerify.propTypes = {
  router: PropTypes.any,
  logOut: PropTypes.any,
}

// const exportAuthVerify = withRouter(AuthVerify)

// export default exportAuthVerify
