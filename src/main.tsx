import React from 'react'
import ReactDOM from 'react-dom/client'
import {PermissionGuard} from './PermissionGuard'
import './reset.css'
import './open-color.css'
import './index.css'
import {ErrorBoundary} from './components/screens/Error'

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <ErrorBoundary>
      <PermissionGuard />
    </ErrorBoundary>
  </React.StrictMode>,
)
