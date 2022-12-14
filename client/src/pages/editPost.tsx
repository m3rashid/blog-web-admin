import {
  Box,
  Button,
  Group,
  Paper,
  Switch,
  TextInput,
  Title,
} from '@mantine/core'
import { nanoid } from 'nanoid'
import { useLocation } from 'react-router-dom'
import { FC, useEffect, useState } from 'react'
import { Article, Photo } from 'tabler-icons-react'
import { useRecoilState, useRecoilValue } from 'recoil'

import useHttp from 'hooks/useHttp'
import { userLoggedIn } from 'atoms/user'
import PageWrapper from 'layout/pageWrapper'
import ShowRender from 'components/showRender'
import { PostType, postAtom } from 'atoms/post'
import CreateOrEditPost from 'components/createOrEditPost'
import ChooseTypeButton from 'components/chooseTypeButton'
import { useCreatePostStyles } from 'styles/useCreatePostStyles'

interface IProps {}

const EditPost: FC<IProps> = () => {
  const { pathname } = useLocation()
  const { loading, request } = useHttp('save-and-publish')
  const [data, setData] = useRecoilState(postAtom)
  const isUserLoggedIn = useRecoilValue(userLoggedIn)
  const [type, setType] = useState<PostType>('text')
  const { classes } = useCreatePostStyles()
  const [postData, setPostData] = useState({
    title: '',
    publish: true,
    slug: '',
    postId: '',
    bannerImageUrl: '',
  })

  const getPost = async () => {
    if(!isUserLoggedIn) return
    const res = await request({
      endpoint: '/post/details',
      body: { slug: pathname.split('/')[3] },
    })
    if (!res) return
    setData(res.data.postDetail.data)
    setPostData({
      postId: res.data.postDetail._id,
      slug: res.data.postDetail.slug,
      publish: res.data.postDetail.published,
      title: res.data.postDetail.title,
      bannerImageUrl: res.data.postDetail.bannerImageUrl,
    })
  }

  useEffect(() => {
    getPost().then().catch()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const saveAndPublish = async () => {
    if(!isUserLoggedIn) return
    const { data: saveAndPublishRes } = await request({
      endpoint: '/post/edit',
      body: {
        data: data,
        postId: postData.postId,
        published: postData.publish,
        title: postData.title,
        bannerImageUrl: postData.bannerImageUrl,
      },
    })
    if (!saveAndPublishRes) return
    setData([])
  }

  const handleAddSection = () => {
    setData((prev) => [...prev, { id: nanoid(), type: type, content: '' }])
  }

  if (!data) return null

  return (
    <PageWrapper>
      <Box className={classes.buttonTop}>
        <Button onClick={saveAndPublish} loading={loading}>
          Save {postData.publish ? ' and Publish' : ' as draft'}
        </Button>
        <Switch
          classNames={{
            root: classes.switch,
            input: classes.switchInput,
            label: classes.switchLabel,
          }}
          size="lg"
          checked={postData.publish}
          onLabel="ON"
          offLabel="OFF"
          label="Publish"
          onChange={(e) =>
            setPostData((prev) => ({ ...prev, publish: e.target.checked }))
          }
        />
      </Box>

      <Paper
        shadow="xs"
        p="md"
        style={{ 
          marginBottom: '30px',
          paddingTop: '40px',
          paddingBottom: '40px',
        }}
      >
        <TextInput
          name="title"
          value={postData.title}
          required
          icon={<Article />}
          className={classes.input}
          onChange={(e) =>
            setPostData((prev) => ({ ...prev, title: e.target.value }))
          }
          placeholder="Enter Post title"
        />
        <TextInput
          name="bannerImageUrl"
          value={postData.bannerImageUrl}
          required
          icon={<Photo />}
          className={classes.input}
          style={{ marginTop: '15px' }}
          onChange={(e) =>
            setPostData((prev) => ({ ...prev, bannerImageUrl: e.target.value }))
          }
          placeholder="Enter banner image Url"
        />
      </Paper>

      {data.map((section) => (
        <CreateOrEditPost key={section.id} id={section.id} />
      ))}

      <Paper
        shadow="xs"
        p="md"
        style={{ paddingTop: '40px', paddingBottom: '40px' }}
      >
        <Group style={{ alignItems: 'flex-end' }}>
          <ChooseTypeButton value={type} setValue={setType} labelType="new" />
          <Button onClick={handleAddSection}>Add Section</Button>
        </Group>
      </Paper>

      {data.length !== 0 && (
        <>
          <Box style={{ marginTop: '30px', marginBottom: '10px' }}>
            <Title sx={(theme) => ({ fontFamily: theme.fontFamily })}>
              Rendered Post
            </Title>
          </Box>

          <Paper
            shadow="xs"
            p="xs"
            style={{ paddingTop: '40px', paddingBottom: '40px' }}
          >
            <ShowRender data={data} />
          </Paper>
        </>
      )}
    </PageWrapper>
  )
}

export default EditPost
