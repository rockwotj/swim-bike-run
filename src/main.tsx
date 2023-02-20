import React from 'react'
import ReactDOM from 'react-dom/client'
import {PermissionGuard} from './PermissionGuard'
import './reset.css'
import './open-color.css'
import './index.css'

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <PermissionGuard />
  </React.StrictMode>,
)
