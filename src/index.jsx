import React from 'react'
import ReactDOM from 'react-dom'
import App from './components/app'
import { BrowserRouter as Router } from 'react-router-dom'
import { useCoreStateProvider } from './context/core'
const AppWithCommonState = useCoreStateProvider(App)

ReactDOM.render(
  <Router>
    {AppWithCommonState}
  </Router>,
  document.getElementById('root')
)
