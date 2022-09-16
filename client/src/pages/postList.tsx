import { FC, useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { Table, Anchor, ScrollArea, Button } from '@mantine/core'

import useHttp from 'hooks/useHttp'
import PageWrapper from 'layout/pageWrapper'
import { useRecoilValue } from 'recoil'
import { userLoggedIn } from 'atoms/user'

interface IProps {}

const PostList: FC<IProps> = () => {
  const navigate = useNavigate()
  const isUserLoggedIn = useRecoilValue(userLoggedIn)
  const { request } = useHttp('get-all-author-posts')

  const [posts, setPosts] = useState<any[]>([])

  const getAuthorPosts = async () => {
    if(!isUserLoggedIn) return
    const res = await request({ endpoint: '/post/author', body: {} })
    if (!res) return
    setPosts(res.data)
  }

  useEffect(() => {
    getAuthorPosts().then().catch()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  if(!posts || posts.length === 0) return (
    <PageWrapper>
      <h2>Login to Continue</h2>
    </PageWrapper>
  )

  return (
    <PageWrapper>
      <ScrollArea>
        <Table sx={{ minWidth: 800 }} verticalSpacing="md" highlightOnHover>
          <thead>
            <tr>
              <th>#</th>
              <th>Post Title</th>
              <th>State</th>
              <th>Categories</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {posts.map((row, index) => {
              return (
                <tr key={row._id}>
                  <td>{index + 1}</td>
                  <td>
                    <Anchor component={Link} to={`/blogs/${row.slug}`}>
                      {row.title}
                    </Anchor>
                  </td>
                  <td>{row.published ? 'Published' : 'Draft'}</td>
                  <td style={{ maxWidth: '300px' }}>
                    {row.categories.map((cat: any, i: number) => (
                      <span key={`${cat.slug}-${i}-${index}`}>
                        {cat.name}, &nbsp;
                      </span>
                    ))}
                  </td>
                  <td>
                    <Button onClick={() => navigate(`/blogs/edit/${row.slug}`)}>
                      Edit
                    </Button>
                  </td>
                </tr>
              )
            })}
          </tbody>
        </Table>
      </ScrollArea>
    </PageWrapper>
  )
}

export default PostList
