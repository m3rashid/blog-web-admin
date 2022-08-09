import React from 'react'
import { Box, Group, SimpleGrid } from '@mantine/core'

import PageWrapper from 'layout/pageWrapper'
import Hero from 'components/hero'
import PostCard from 'components/postCard'
import { IPostCardForCard } from 'types'
import Categories from 'components/categories'
import { useHomePageStyles } from 'styles/useHomePageStyles'
import { useStylesHome } from 'styles/useStylesHome'

interface IProps {}

const Home: React.FC<IProps> = () => {
  const { classes } = useStylesHome()
  const { classes: thisPageClasses } = useHomePageStyles()

  const posts: IPostCardForCard[] = []

  return (
    <PageWrapper>
      <Box style={{ padding: '10px', marginBottom: '20px' }}>
        <Hero />
      </Box>

      <Group style={{ alignItems: 'flex-start' }}>
        <SimpleGrid spacing={20} className={classes.firstChild}>
          <SimpleGrid className={thisPageClasses.inner} spacing={20}>
            {posts && posts.length > 0
              ? posts.map((post) => (
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
                ))
              : null}
          </SimpleGrid>
        </SimpleGrid>
        <SimpleGrid spacing={20} className={classes.secondChild}>
          <Categories />
        </SimpleGrid>
      </Group>
    </PageWrapper>
  )
}

export default Home
