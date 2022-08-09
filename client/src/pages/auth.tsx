import {
  TextInput,
  PasswordInput,
  Paper,
  Title,
  Button,
  Container,
} from '@mantine/core'
import { useEffect, useRef, useState } from 'react'
import { useNavigate } from 'react-router-dom'

import PageWrapper from 'layout/pageWrapper'
import { useNotification } from 'hooks/useNotification'

const Auth = () => {
  const navigate = useNavigate()
  const { loadingNotif, updateFailureNotif, updateSuccessNotif } =
    useNotification({ id: 'login-signup' })

  useEffect(() => {
    // if (session) navigate('/', { replace: true })
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const [loading, setLoading] = useState(false)
  const usernameRef = useRef<HTMLInputElement>(null)
  const passwordRef = useRef<HTMLInputElement>(null)

  const handleSubmit = async () => {
    setLoading(true)
    loadingNotif()
    const values = {
      username: usernameRef.current?.value,
      password: passwordRef.current?.value,
    }
    if (!values.username || !values.password) {
      updateFailureNotif({
        errorMsg: {
          title: 'Invalid Data',
          message: 'Please fill in all fields',
        },
      })
      return
    }
    try {
      // TODO: login
      // await signIn('credentials', { ...values, callbackUrl: '/' })
      updateSuccessNotif({
        successMsg: {
          title: 'Login Success',
          message: 'Your login was successful',
        },
      })
      setLoading(false)
    } catch (err) {
      updateFailureNotif({
        errorMsg: {
          title: 'Internal Server error',
          message: 'Could not get response from server',
        },
      })
      setLoading(false)
    }
  }

  return (
    <PageWrapper>
      <Container size={420} my={40}>
        <Paper withBorder shadow="md" p={30} mt={30} radius="md">
          <Title
            order={2}
            align="center"
            mb={20}
            sx={(theme) => ({ fontFamily: theme.fontFamily })}
          >
            Admin Login
          </Title>

          <TextInput
            id="username"
            label="Username"
            placeholder="username"
            ref={usernameRef}
            required
          />
          <PasswordInput
            label="Password"
            id="password"
            placeholder="Your password"
            required
            ref={passwordRef}
            mt="md"
          />
          <Button fullWidth mt="xl" onClick={handleSubmit} loading={loading}>
            Sign in
          </Button>
        </Paper>
      </Container>
    </PageWrapper>
  )
}

export default Auth
