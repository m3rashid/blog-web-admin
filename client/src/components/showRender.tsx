import { FC } from 'react'
import { marked } from 'marked'
import hljs from 'highlight.js'
import { Box, Code } from '@mantine/core'
import DOMPurify from 'isomorphic-dompurify'
import 'highlight.js/styles/github-dark-dimmed.css'

import { ICreatePost } from 'atoms/post'
import { useShowRenderStyles } from 'styles/useShowRenderStyles'

marked.setOptions({
  langPrefix: 'hljs language-',
  highlight: (code: string, lang: string) => {
    return hljs.highlightAuto(code, [lang]).value
  },
})

interface IProps {
  data: ICreatePost[]
}

export const SingleSectionRender: FC<{ data: string }> = ({ data }) => {
  return (
    <Box style={{ padding: '0 5px', overflowX: 'auto' }}>
      <Box
        dangerouslySetInnerHTML={{
          __html: DOMPurify.sanitize(marked(data)),
        }}
      />
    </Box>
  )
}

const ShowRender: FC<IProps> = ({ data }) => {
  const { classes } = useShowRenderStyles()

  return (
    <Box className={classes.background}>
      {data.map((section) => {
        const render = (
          <Box
            dangerouslySetInnerHTML={{
              __html: DOMPurify.sanitize(marked(section.content || '')),
            }}
          />
        )

        if (section?.type === 'code') {
          return (
            <Code
              key={section.id}
              style={{
                padding: '10px 5px',
                marginTop: '10px',
                marginBottom: '10p',
                width: '100%',
                maxWidth: '100vw',
                overflowX: 'auto',
              }}
            >
              {render}
            </Code>
          )
        } else if (section?.type === 'text') {
          return (
            <Box key={section.id} className={classes.contentBox}>
              {render}
            </Box>
          )
        } else return null
      })}
    </Box>
  )
}

export default ShowRender
