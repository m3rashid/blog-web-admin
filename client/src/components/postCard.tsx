import { FC } from 'react'
import { Paper, Text, Title, Button, Box, Group } from '@mantine/core'
import { useNavigate } from 'react-router-dom'
import { usePostcardStyles } from 'styles/usePostcardStyles'

interface IProps {
  image: string
  title: string
  categories: {
    name: string
    _id: string
  }[]
  slug: string
}

const PostCard: FC<IProps> = ({ image, title, categories, slug }) => {
  const { classes } = usePostcardStyles()
  const navigate = useNavigate()

  return (
    <Paper
      shadow="md"
      p="xl"
      radius="md"
      sx={(theme) => ({
        backgroundImage:
          theme.colorScheme === 'dark'
            ? `linear-gradient(to bottom, rgba(0,0,0,0.9) 0%,rgba(0,0,0,0.5) 100%), url(${image})`
            : `linear-gradient(to bottom, rgba(0,0,0,0) 0%,rgba(0,0,0,0.4) 100%), url(${image})`,
      })}
      className={classes.card}
    >
      <Box>
        <Group style={{ gap: '5px' }}>
          {categories.map((cat) => {
            return (
              <Text key={cat._id} className={classes.category} size="xs">
                {cat.name}
              </Text>
            )
          })}
        </Group>
        <Title order={3} className={classes.title}>
          {title}
        </Title>
      </Box>
      <Button onClick={() => navigate(`/blogs/${slug}`)}>Read article</Button>
    </Paper>
  )
}

export default PostCard
