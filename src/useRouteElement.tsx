import React from 'react'
import { Navigate, Outlet, useRoutes } from 'react-router-dom'

import { useAppStore } from './appStore'
import Loading from './components/Loading'
import path from './utils/path'

const LazyLogin = React.lazy(() => import('./pages/Login'))
const LazyClientLayout = React.lazy(() => import('./layout/ClientLayout'))
const LazyHome = React.lazy(() => import('./pages/Home'))

function ProtectedRoute() {
  const { isAuthenticated } = useAppStore()
  console.log(isAuthenticated)
  return isAuthenticated ? (
    <React.Suspense fallback={<Loading />}>
      <LazyClientLayout>
        <React.Suspense fallback={<Loading />}>
          <Outlet />
        </React.Suspense>
      </LazyClientLayout>
    </React.Suspense>
  ) : (
    <Navigate to={path.login} />
  )
}

export default function useRouteElement() {
  const routeElement = useRoutes([
    {
      path: path.login,
      element: (
        <React.Suspense fallback={<Loading />}>
          <LazyLogin />
        </React.Suspense>
      )
    },
    {
      element: <ProtectedRoute />,
      children: [
        {
          path: path.home,
          element: <LazyHome />
        },
      ]
    }
  ])
  return routeElement
}
