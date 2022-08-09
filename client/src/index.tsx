import React from 'react'
import ReactDOM from 'react-dom/client'

import 'styles/index.css'
import App from 'App'
import RootWrapper from 'layout/rootWrapper'

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement)
root.render(
  <React.StrictMode>
    <RootWrapper>
      <App />
    </RootWrapper>
  </React.StrictMode>
)
