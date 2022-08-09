import { createStyles } from '@mantine/core'

export const useTitleSlugStyles = createStyles((theme) => ({
  buttonTop: {
    display: 'flex',
    gap: '10px',
    marginBottom: '20px',
    flexDirection: 'row-reverse',
  },
  input: {
    flexGrow: 1,
  },
  multiselect: {
    marginTop: '15px',
  },
}))
