import { createStyles } from '@mantine/core'

export const usePostcardStyles = createStyles((theme) => ({
  card: {
    height: 400,
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    backgroundSize: 'cover',
    backgroundPosition: 'center',
  },

  title: {
    fontFamily: theme.fontFamily,
    fontWeight: 900,
    lineHeight: 1.2,
    fontSize: 32,
    marginTop: theme.spacing.xs,
    color: theme.colorScheme === 'dark' ? theme.white : theme.black,
  },

  category: {
    color: theme.black,
    fontWeight: 700,
    textTransform: 'uppercase',
    backgroundColor: theme.primaryColor,
    padding: '2px 5px',
    borderRadius: '5px',
  },
}))
