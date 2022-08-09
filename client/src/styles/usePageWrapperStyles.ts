import { createStyles } from '@mantine/core'

export const usePageWrapperStyles = createStyles((theme) => ({
  root: {
    minHeight: '90vh',
    maxWidth: '100vw',
    overflowX: 'hidden',
    paddingTop: '10px',
    paddingBottom: '50px',
    backgroundColor:
      theme.colorScheme === 'dark'
        ? theme.colors.dark[5]
        : theme.colors.gray[1],
  },
}))
