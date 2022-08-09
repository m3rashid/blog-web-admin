import { FC } from 'react'
import dayjs from 'dayjs'
import { useNavigate } from 'react-router-dom'
import { Group, Image, Paper, Text, Title } from '@mantine/core'

import { IRelatedPosts } from 'types'
import { useRelatedPostStyles } from 'styles/useRelatedPostStyles'

interface IProps {
  relatedPosts: IRelatedPosts[]
}

const RelatedPosts: FC<IProps> = ({ relatedPosts }) => {
  const navigate = useNavigate()

  const { classes } = useRelatedPostStyles()

  return (
    <Paper shadow="xs" radius="md" p={20}>
      <Title
        sx={(theme) => ({ fontFamily: theme.fontFamily, marginBottom: '10px' })}
        order={3}
      >
        Related Posts
      </Title>
      {relatedPosts.map((post) => (
        <Group
          noWrap
          spacing={0}
          key={post._id}
          onClick={() => navigate(`/blogs/${post.slug}`)}
          style={{ marginBottom: '10px', cursor: 'pointer' }}
        >
          <Image alt="" src={post.bannerImageUrl} height={80} width={80} />
          <div className={classes.body}>
            <Text className={classes.title} mt="xs" mb="md">
              {post.title}
            </Text>
            <Text size="xs" color="dimmed">
              {dayjs(post.createdAt).format('dddd, DD MMMM YYYY')}
            </Text>
          </div>
        </Group>
      ))}
    </Paper>
  )
}

export default RelatedPosts
