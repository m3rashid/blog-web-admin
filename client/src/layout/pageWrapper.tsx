import React from 'react'
import { Container } from '@mantine/core'

import BreadCrumbs from 'layout/breadCrumbs'
import { usePageWrapperStyles } from 'styles/usePageWrapperStyles'

interface IProps {
  children: any
}

const PageWrapper: React.FC<IProps> = ({ children }) => {
  const { classes } = usePageWrapperStyles()

  return (
    <div className={classes.root}>
      <Container size="lg">
        <BreadCrumbs />
        {children}
      </Container>
    </div>
  )
}

export default PageWrapper
