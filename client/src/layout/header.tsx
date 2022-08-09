import {
  Burger,
  Center,
  Container,
  Group,
  Header,
  Image,
  Paper,
  Transition,
} from '@mantine/core'
import { FC, useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useSetRecoilState } from 'recoil'
import { Moon, Sun } from 'tabler-icons-react'

import useHttp from 'hooks/useHttp'
import { categoryAtom } from 'atoms/categories'
import HeaderProfileDropdown from 'components/headerProfileDropdown'
import { HEADER_HEIGHT, useHeaderStyles } from 'styles/useHeaderStyles'

interface IProps {
  colorScheme: any
  toggleColorScheme: () => void
}

const TopHeader: FC<IProps> = ({ colorScheme, toggleColorScheme }) => {
  const setCategories = useSetRecoilState(categoryAtom)
  const { request } = useHttp('get-categories')

  const [opened, setOpened] = useState(false)
  const navigate = useNavigate()
  const { classes } = useHeaderStyles()

  const toggleOpened = () => {
    setOpened(!opened)
  }

  const getCategories = async () => {
    const res = await request({ endpoint: '/category/all', body: {} })
    if (!res) return
    setCategories(res.data)
  }

  useEffect(() => {
    getCategories().then().catch()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const imgLogo = '/favicon.png'
  const Icon = colorScheme === 'dark' ? Sun : Moon

  const ThemeChanger = () => (
    <Group position="center" my="xl">
      <Center className={classes.iconWrapper} aria-label="Toggle theme">
        <Icon onClick={() => toggleColorScheme()} />
      </Center>
    </Group>
  )

  return (
    <Header height={HEADER_HEIGHT} className={classes.root}>
      <Container size="lg" className={classes.header}>
        <div className={classes.logoContainer} onClick={() => navigate('/')}>
          <Image
            className={classes.logo}
            src={imgLogo}
            height="60px"
            alt="cubicle logo"
          />
          <div className={classes.cubicle}>Cubicle</div>
        </div>

        <Group spacing={5} className={classes.links}>
          <HeaderProfileDropdown />
          <ThemeChanger />
        </Group>

        <Burger
          opened={opened}
          onClick={() => toggleOpened()}
          className={classes.burger}
          size="sm"
        />

        <Transition transition="pop-top-right" duration={200} mounted={opened}>
          {(styles) => (
            <Paper className={classes.dropdown} style={{ ...styles }}>
              <HeaderProfileDropdown />
              <ThemeChanger />
            </Paper>
          )}
        </Transition>
      </Container>
    </Header>
  )
}

export default TopHeader
