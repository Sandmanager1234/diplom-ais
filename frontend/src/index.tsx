import {StrictMode} from 'react'
import {render} from 'react-dom'
import { Provider } from 'react-redux'
import { setupStore } from './store'
import { App } from './components'

import './index.css'

const store = setupStore()
render(
    <StrictMode>
        <Provider store={store}>
            <App />
        </Provider>
    </StrictMode>,
    document.getElementById('root')
)
