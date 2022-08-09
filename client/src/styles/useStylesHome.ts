import { createStyles } from '@mantine/core'

export const useStylesHome = createStyles((theme) => ({
  firstChild: {
    width: '64%',
    [theme.fn.smallerThan('sm')]: {
      width: '100%',
    },
  },
  secondChild: {
    width: '33%',
    [theme.fn.smallerThan('sm')]: {
      width: '100%',
    },
  },
  title: {
    fontFamily: theme.fontFamily,
    fontSize: 50,
    wordBreak: 'break-all',
    whiteSpace: 'break-spaces',
    [theme.fn.smallerThan('sm')]: {
      fontSize: 25,
    },
  },
  titleBox: {
    width: '64%',
    [theme.fn.smallerThan('sm')]: {
      width: '100%',
    },
  },
  lowerGrid: {
    [theme.fn.smallerThan('sm')]: {
      width: '100%',
    },
  },
}))
