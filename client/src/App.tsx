import { Suspense, useEffect } from 'react'
import { Group, Loader } from '@mantine/core'
import { Route, Routes } from 'react-router-dom'

import Auth from 'pages/auth'
import Home from 'pages/home'
import NotFound from 'pages/404'
import Post from 'pages/blogDetail'
import Category from 'pages/category'
import EditPost from 'pages/editPost'
import PostList from 'pages/postList'
import CreatePost from 'pages/createPost'

import PageWrapper from 'layout/pageWrapper'
import ProtectedRoute from 'helpers/protectedRoute'
import useHttp from 'hooks/useHttp'
import { useSetRecoilState } from 'recoil'
import { userLoggedIn } from 'atoms/user'

const App = () => {
  const { request } = useHttp('get-user')
  const setLoggedIn = useSetRecoilState(userLoggedIn)

  const getUser = async () => {
    const res = await request({ endpoint: '/user', body: {} })
    if (!res) {
      window.localStorage.removeItem('cubicle-token')
      setLoggedIn(false)
      return
    }
    window.localStorage.setItem('cubicle-token', res.data.token)
    setLoggedIn(true)
  }

  useEffect(() => {
    getUser().then().catch()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <div className="App">
      <Suspense
        fallback={
          <PageWrapper>
            <Group style={{ justifyContent: 'center', alignItems: 'center' }}>
              <Loader />
            </Group>
          </PageWrapper>
        }
      >
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/category/:slug" element={<Category />} />
          <Route path="/blogs/:slug" element={<Post />} />

          <Route element={<ProtectedRoute inverse={true} />}>
            <Route path="/auth" element={<Auth />} />
          </Route>

          <Route element={<ProtectedRoute inverse={false} />}>
            <Route path="/blogs/create" element={<CreatePost />} />
            <Route path="/blogs/edit/:slug" element={<EditPost />} />
            <Route path="/blogs" element={<PostList />} />
          </Route>

          <Route path="*" element={<NotFound />} />
        </Routes>
      </Suspense>
    </div>
  )
}

export default App
