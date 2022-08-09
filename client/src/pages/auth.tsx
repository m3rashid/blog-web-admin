import {
  TextInput,
  PasswordInput,
  Paper,
  Title,
  Button,
  Container,
} from '@mantine/core'
import { useRef } from 'react'

import PageWrapper from 'layout/pageWrapper'
import useHttp from 'hooks/useHttp'

const Auth = () => {
  const { loading, request } = useHttp('login')

  const usernameRef = useRef<HTMLInputElement>(null)
  const passwordRef = useRef<HTMLInputElement>(null)

  const handleSubmit = async () => {
    const values = {
      username: usernameRef.current?.value,
      password: passwordRef.current?.value,
    }
    const res = await request({ body: values, endpoint: '/login' })
    if (!res) return
    console.log(res.data)
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
