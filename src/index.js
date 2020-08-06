import React from 'react'
import ReactDOM from 'react-dom'
import './index.css'
import App from './App'
import store from './app/store'
// 리듀서와 함께 생성한 리덕스 스토어를 가져온다.
import { Provider } from 'react-redux'

import './api/server'

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>,
  document.getElementById('root')
)
