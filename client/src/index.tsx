import React from 'react'
import ReactDOM from 'react-dom/client'

import App from 'App'
import 'styles/index.css'
import RootWrapper from 'layout/rootWrapper'

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement)
root.render(
  <React.StrictMode>
    <RootWrapper>
      <App />
    </RootWrapper>
  </React.StrictMode>
)
