import { FC } from 'react'
import {
  Container,
  Group,
  ActionIcon,
  Image,
  Box,
  useMantineColorScheme,
} from '@mantine/core'
import {
  BrandTwitter,
  BrandYoutube,
  BrandInstagram,
  BrandGithub,
  BrandLinkedin,
  BrandGmail,
} from 'tabler-icons-react'
import { useFooterStyles } from 'styles/useFooterStyles'

const footerMap = (isDark: Boolean) => [
  {
    url: 'https://github.com/m3rashid',
    icon: <BrandGithub size={18} />,
  },
  {
    url: 'https://twitter.com/m3_rashid',
    icon: <BrandTwitter size={18} />,
  },
  {
    url: 'https://www.linkedin.com/in/m3rashid/',
    icon: <BrandLinkedin size={18} />,
  },
  {
    url: 'mailto:m3rashid.hussain@gmail.com',
    icon: <BrandGmail size={18} />,
  },
  {
    url: 'https://www.instagram.com/m3_rashid/',
    icon: <BrandInstagram size={18} />,
  },
  {
    url: 'https://www.youtube.com/channel/UCeNqGjDNF0JJdWbd8jrgJdw',
    icon: <BrandYoutube size={18} />,
  },
  {
    url: 'https://dev.to/m3rashid',
    icon: (
      <Image
        src={isDark ? '/logos/dev_white.png' : '/logos/dev_black.png'}
        alt="dev.to"
      />
    ),
  },
]

interface IProps {}

const Footer: FC<IProps> = () => {
  const { classes } = useFooterStyles()
  const theme = useMantineColorScheme()

  return (
    <Box className={classes.footer}>
      <Container size="lg" className={classes.inner}>
        <Box>
          <Image
            className={classes.logo}
            src="/favicon.png"
            height="60px"
            alt=""
          />
        </Box>
        <Group spacing={0} className={classes.links} position="right" noWrap>
          {footerMap(theme.colorScheme === 'dark').map((item) => (
            <ActionIcon
              component="a"
              href={item.url}
              target="_blank"
              key={item.url}
              size="lg"
            >
              {item.icon}
            </ActionIcon>
          ))}
        </Group>
      </Container>
    </Box>
  )
}

export default Footer
