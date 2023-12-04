import React from 'react'
import { render, screen } from '@testing-library/react'
import Register from './register.component'

test('renders Register component', () => {
  render(<Register />)
  const registerButton = screen.getByText(/Registrarse/i)
  expect(registerButton).toBeInTheDocument()
})

test('handles form submission correctly', () => {
  render(<Register />)
  const usernameInput = screen.getByLabelText(/Nombre de usuario/i)
})
