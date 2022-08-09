import axios from 'axios'
import { FC } from 'react'
import { useNavigate } from 'react-router-dom'
import { createStyles, Group, Loader, SimpleGrid, Title } from '@mantine/core'

import PostCard from 'components/postCard'
import { useStyles } from 'pages/home'
import { instance } from 'helpers/instance'
import PageWrapper from 'layout/pageWrapper'
import { IPostCardForCard } from 'types'

export const useCategoryStyles = createStyles((theme) => ({
  inner: {
    gridTemplateColumns: '1fr 1fr 1fr',
    [theme.fn.smallerThan('md')]: {
      gridTemplateColumns: '1fr 1fr',
    },
    [theme.fn.smallerThan('sm')]: {
      gridTemplateColumns: '1fr',
    },
  },
}))

interface IProps {}

const Category: FC<IProps> = () => {
  const navigate = useNavigate()

  const { classes } = useStyles()
  const { classes: thisPageClasses } = useCategoryStyles()

  const posts: IPostCardForCard[] = []

  return (
    <PageWrapper>
      {!posts || posts.length == 0 ? (
        <Group style={{ justifyContent: 'center', alignItems: 'center' }}>
          <Title className={classes.title} my={10} order={3}>
            No articles found
          </Title>
        </Group>
      ) : (
        <SimpleGrid className={thisPageClasses.inner} spacing={20}>
          {posts.map((post) => (
            <PostCard
              key={post._id}
              categories={post.categories.map((c) => ({
                name: c.name,
                _id: c._id + post._id,
              }))}
              image={post.bannerImageUrl}
              title={post.title}
              slug={post.slug}
            />
          ))}
        </SimpleGrid>
      )}
    </PageWrapper>
  )
}

export default Category
