import { Group, Loader } from '@mantine/core'
import { Route, Routes } from 'react-router-dom'

import PageWrapper from 'layout/pageWrapper'
import NotFound from 'pages/404'
import Auth from 'pages/auth'
import Post from 'pages/blogDetail'
import Category from 'pages/category'
import CreatePost from 'pages/createPost'
import EditPost from 'pages/editPost'
import Home from 'pages/home'
import PostList from 'pages/postList'
import React from 'react'

function App() {
  return (
    <div className="App">
      <React.Suspense
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
          <Route path="/auth" element={<Auth />} />
          <Route path="/category/:slug" element={<Category />} />
          <Route path="/blogs/create" element={<CreatePost />} />
          <Route path="/blogs/edit/:slug" element={<EditPost />} />
          <Route path="/blogs/:slug" element={<Post />} />
          <Route path="/blogs" element={<PostList />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </React.Suspense>
    </div>
  )
}

export default App
