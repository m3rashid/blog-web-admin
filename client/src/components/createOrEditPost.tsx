import { Box, Button, Group, Paper, Textarea } from '@mantine/core'
import { ChangeEvent, FC, useEffect, useState } from 'react'
import { useRecoilState } from 'recoil'
import { AlertOctagon } from 'tabler-icons-react'
import { showNotification } from '@mantine/notifications'

import { deepClone } from 'helpers/deepClone'
import ChooseTypeButton from 'components/chooseTypeButton'
import { ICreatePost, postAtom, PostType } from 'atoms/post'
import { useCreateOrEditStyles } from 'styles/useCreateOrEditStyles'

interface IProps {
  id: string
}

const CreateOrEditPost: FC<IProps> = ({ id }) => {
  const [data, setData] = useRecoilState(postAtom)
  const concerned = data.find((section) => section.id === id)
  const [content, setContent] = useState(concerned?.content || '')
  const { classes } = useCreateOrEditStyles()

  const setType = (val: PostType) => {
    setData((prev) => {
      const newData = deepClone<ICreatePost>(prev)
      const index = newData.findIndex((section) => section.id === id)
      newData[index].type = val
      return newData
    })
  }

  // sync global state with local state
  useEffect(() => {
    const interval = setInterval(() => {
      setData((prev) => {
        const newData = deepClone<ICreatePost>(prev)
        return newData.map((section) => {
          if (section.id === id) {
            section.content = content
          }
          return section
        })
      })
    }, 1000)

    return () => {
      clearInterval(interval)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [content])

  const handleChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
    if (concerned?.type === 'text' && e.target.value.includes('```')) {
      showNotification({
        title: 'No code inside content container',
        message:
          'Do not use code blocks inside of content container, It may lead to unexpected problems in render, Use code type for code blocks',
        id: 'code-warning',
        color: 'red',
        icon: <AlertOctagon />,
        autoClose: 5000,
        disallowClose: false,
      })
    }
    setContent(e.target.value)
  }

  const handleRemoveThisBox = () => {
    setData((prev) => {
      const newData = [...prev]
      const newSection = newData.find((section) => section.id === id)
      if (newSection) {
        newData.splice(newData.indexOf(newSection), 1)
      }
      return newData
    })
  }

  return (
    <Paper shadow="xs" p="md" style={{ marginBottom: '30px' }}>
      <Group
        style={{
          marginBottom: '15px',
          alignItems: 'flex-end',
          justifyContent: 'flex-end',
        }}
      >
        <ChooseTypeButton
          labelType="change"
          value={concerned?.type || 'text'}
          setValue={setType}
          showLabel={false}
        />
        <Button
          style={{ flexGrow: 1 }}
          onClick={handleRemoveThisBox}
          sx={(theme) => ({ backgroundColor: theme.colors.red[6] })}
        >
          Remove Section
        </Button>
      </Group>
      <Box className={classes.textboxContainer}>
        <Textarea
          minRows={10}
          value={content}
          className={classes.textBox}
          onChange={handleChange}
        />
      </Box>
    </Paper>
  )
}

export default CreateOrEditPost
