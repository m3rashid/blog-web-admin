import { createStyles } from '@mantine/core'

export const useCreateOrEditStyles = createStyles((theme) => ({
  textboxContainer: {
    color:
      theme.colorScheme === 'dark'
        ? theme.colors.gray[1]
        : theme.colors.dark[5],
  },
  textBox: {
    textarea: {
      backgroundColor:
        theme.colorScheme === 'dark'
          ? theme.colors.dark[6]
          : theme.colors.gray[0],
    },
  },
}))
