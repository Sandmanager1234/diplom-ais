import { FC } from 'react'
import { RouterProvider } from 'react-router-dom'

import { router } from '../../router/router'

export const App: FC = () => <RouterProvider router={router} />
