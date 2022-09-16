import { nanoid } from 'nanoid'
import { useRecoilState, useRecoilValue } from 'recoil'
import { FC, useMemo, useState } from 'react'
import { Box, Button, Group, Paper, Switch, Title } from '@mantine/core'

import useHttp from 'hooks/useHttp'
import PageWrapper from 'layout/pageWrapper'
import ShowRender from 'components/showRender'
import { postAtom, PostType } from 'atoms/post'
import ChooseTypeButton from 'components/chooseTypeButton'
import CreateOrEditPost from 'components/createOrEditPost'
import TitleSlug, { IPostMeta } from 'components/titleSlug'
import { useCreatePostStyles } from 'styles/useCreatePostStyles'
import { userLoggedIn } from 'atoms/user'

interface IProps {}

const CreatePost: FC<IProps> = () => {
  const { classes } = useCreatePostStyles()
  const [data, setData] = useRecoilState(postAtom)
  const isUserLoggedIn = useRecoilValue(userLoggedIn)
  const [publish, setPublish] = useState(true)
  const { loading, request } = useHttp('create-post')
  const [type, setType] = useState<PostType>('text')
  const postMetaInitialState: IPostMeta = useMemo(
    () => ({
      title: '',
      slug: '',
      bannerImageUrl: '',
      categories: [],
      keywords: '',
    }),
    []
  )

  const [postMeta, setPostMeta] = useState<IPostMeta>(postMetaInitialState)

  const saveAndPublish = async () => {
    if(!isUserLoggedIn) return
    const { data: saveRes } = await request({
      endpoint: '/post/create',
      body: {
        title: postMeta.title,
        slug: postMeta.slug,
        data: data,
        keywords: postMeta.keywords,
        bannerImageUrl: postMeta.bannerImageUrl,
        categories: postMeta.categories,
        published: publish,
      },
    })
    if (!saveRes) return
    setPostMeta(postMetaInitialState)
    setData([])
  }

  const handleAddSection = () => {
    setData((prev) => [...prev, { id: nanoid(), type: type, content: '' }])
  }

  return (
    <PageWrapper>
      <Box className={classes.buttonTop}>
        <Button onClick={saveAndPublish} loading={loading}>
          Save {publish ? ' and Publish' : ' as draft'}
        </Button>
        <Switch
          classNames={{
            root: classes.switch,
            input: classes.switchInput,
            label: classes.switchLabel,
          }}
          size="lg"
          checked={publish}
          onLabel="ON"
          offLabel="OFF"
          label="Publish"
          onChange={(e) => setPublish(e.currentTarget.checked)}
        />
      </Box>

      <TitleSlug postMeta={postMeta} setPostMeta={setPostMeta} />

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

export default CreatePost
