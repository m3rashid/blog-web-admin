import { FC } from 'react'
import { Group, SimpleGrid, Title } from '@mantine/core'

import PostCard from 'components/postCard'
import PageWrapper from 'layout/pageWrapper'
import { IPostCardForCard } from 'types'
import { useStylesHome } from 'styles/useStylesHome'
import { useCategoryStyles } from 'styles/useCategoryStyles'

interface IProps {}

const Category: FC<IProps> = () => {
  const { classes } = useStylesHome()
  const { classes: thisPageClasses } = useCategoryStyles()

  const posts: IPostCardForCard[] = []

  return (
    <PageWrapper>
      {!posts || posts.length === 0 ? (
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
