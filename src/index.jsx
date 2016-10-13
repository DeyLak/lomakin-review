import React from 'react'
import { render } from 'react-dom'
import { createStore } from 'redux'
import { Provider } from 'react-redux'
import App from './containers/App/App'
import configureStore from './store/configureStore'

import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'

const store = configureStore()

render(
  <MuiThemeProvider>
    <Provider store={store}>
      <div className='app'>
        <App />
      </div>
    </Provider>
  </MuiThemeProvider>,
  document.getElementById('root')
)
