import { createStyles } from '@mantine/core'

export const useShowRenderStyles = createStyles((theme) => ({
  background: {
    display: 'grid',
    gridTemplateColumns: '1fr',
    gridGap: '20px',
    color:
      theme.colorScheme === 'dark'
        ? theme.colors.gray[1]
        : theme.colors.dark[5],
  },
  contentBox: {
    padding: '0 5px',
    overflowX: 'auto',
  },
}))
