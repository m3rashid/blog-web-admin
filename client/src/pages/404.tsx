import { Link } from 'react-router-dom'
import { Title, Text, Button, Container, Group } from '@mantine/core'

import PageWrapper from 'layout/pageWrapper'
import { use404Styles } from 'styles/use404Styles'

const NotFound = () => {
  const { classes } = use404Styles()

  return (
    <PageWrapper>
      <Container className={classes.root}>
        <div className={classes.label}>404</div>
        <Title className={classes.title}>You have found a secret place.</Title>
        <Text
          color="dimmed"
          size="lg"
          align="center"
          className={classes.description}
        >
          Unfortunately, this is only a 404 page. You may have mistyped the
          address, or the page has been moved to another URL.
        </Text>
        <Group position="center">
          <Link to="/">
            <Button variant="subtle" size="md">
              Take me back to home page
            </Button>
          </Link>
        </Group>
      </Container>
    </PageWrapper>
  )
}

export default NotFound
