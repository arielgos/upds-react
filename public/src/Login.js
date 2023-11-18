import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Form from 'react-bootstrap/Form'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import Button from 'react-bootstrap/Button'
import { auth } from './Firebase'
import { createUserWithEmailAndPassword } from 'firebase/auth'

function Login () {
  const navigate = useNavigate()

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const onSubmit = async (e) => {
    e.preventDefault()
    await createUserWithEmailAndPassword(auth, email, password)
      .then(() => {
        navigate('/')
      })
      .catch((error) => {
        const errorCode = error.code
        const errorMessage = error.message
        console.log(errorCode, errorMessage, error)
      })
  }

  return (
    <Container>
      <Row>
        <Col>
          <Form onSubmit={onSubmit}>
            <Form.Control
              placeholder='Email'
              type='text'
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <Form.Control
              placeholder='Password'
              type='password'
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <Button type='submit'>
              Login
            </Button>
          </Form>
        </Col>
      </Row>
    </Container>
  )
}

export default Login
