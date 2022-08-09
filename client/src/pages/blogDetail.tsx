import { FC } from 'react'
import { Box, Group, Image, Paper, SimpleGrid, Title } from '@mantine/core'

import Author from 'components/author'
import Comments from 'components/comments'
import Categories from 'components/categories'
import RelatedPosts from 'components/relatedPosts'
import ShowRender from 'components/showRender'
import PageWrapper from 'layout/pageWrapper'
import { ICategory, IRelatedPosts } from 'types'
import CreateComment from 'components/createComment'
import { useStylesHome } from 'styles/useStylesHome'

export interface IPost {
  bannerImageUrl: string
  categories: ICategory[]
  keywords: string
  data: any
  comments: any[]
  _id?: string
  slug: string
  title: string
  excerpt: string
  createdAt?: string
  updatedAt?: string
}

interface IProps {}

const Post: FC<IProps> = () => {
  const { classes } = useStylesHome()

  const postDetail: IPost = null as any
  const relatedPosts: IRelatedPosts[] = []

  if (!postDetail) {
    return (
      <PageWrapper>
        <Group style={{ justifyContent: 'center', alignItems: 'center' }}>
          <Title className={classes.title} my={10} order={3}>
            Article not found
          </Title>
        </Group>
      </PageWrapper>
    )
  }

  return (
    <PageWrapper>
      <Box className={classes.titleBox}>
        <Title className={classes.title} my={10}>
          {postDetail.title}
        </Title>
      </Box>

      <Group style={{ alignItems: 'flex-start' }}>
        <SimpleGrid spacing={20} className={classes.firstChild}>
          <Paper shadow="xs" radius="md">
            <Image alt="" src={postDetail.bannerImageUrl} radius="md" />
            <Box p="xs">
              <ShowRender data={postDetail.data} />
            </Box>
          </Paper>
          <Comments comments={postDetail.comments} />
        </SimpleGrid>

        <SimpleGrid spacing={20} className={classes.secondChild}>
          <Author />
          <RelatedPosts relatedPosts={relatedPosts} />
          <Categories />
          <CreateComment postId={postDetail._id as string} />
        </SimpleGrid>
      </Group>
    </PageWrapper>
  )
}

export default Post
