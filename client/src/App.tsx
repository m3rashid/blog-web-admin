import { lazy, Suspense, useEffect } from 'react'
import { Group, Loader } from '@mantine/core'
import { Route, Routes } from 'react-router-dom'

import useHttp from 'hooks/useHttp'
import { userLoggedIn } from 'atoms/user'
import { useSetRecoilState } from 'recoil'
import PageWrapper from 'layout/pageWrapper'
import ProtectedRoute from 'helpers/protectedRoute'

const Auth = lazy(() => import('pages/auth'))
const Home = lazy(() => import('pages/home'))
const NotFound = lazy(() => import('pages/404'))
const Post = lazy(() => import('pages/blogDetail'))
const Category = lazy(() => import('pages/category'))
const EditPost = lazy(() => import('pages/editPost'))
const PostList = lazy(() => import('pages/postList'))
const CreatePost = lazy(() => import('pages/createPost'))

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
