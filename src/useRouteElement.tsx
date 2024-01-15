import React from 'react'
import { Navigate, Outlet, useRoutes } from 'react-router-dom'

import { useAppStore } from './appStore'
import Loading from './components/Loading'
import path from './utils/path'

const LazyLogin = React.lazy(() => import('./pages/Login'))
const LazyClientLayout = React.lazy(() => import('./layout/ClientLayout'))
const LazyDashBoardClient = React.lazy(() => import('./pages/DashBoardClient'))
const LazyDashBoard = React.lazy(() => import('./pages/DashBoardRegister'))
const LazyDetailRegister = React.lazy(() => import('./pages/DashBoardRegister/DetailRegister'))
const LazyLog = React.lazy(() => import('./pages/Log'))
const LazySetting = React.lazy(() => import('./pages/Setting'))
const LazyServer = React.lazy(() => import('./pages/Server'))
const LazyStatistic = React.lazy(() => import('./pages/Statistic'))
function ProtectedRoute() {
  const { isAuthenticated } = useAppStore()
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
          path: '*',
          element: <Navigate to={path.statistic} />
        },
        {
          path: path.statistic,
          element: <LazyStatistic />
        },
        {
          path: path.registerUser,
          element: <LazyDashBoard />
        },
        {
          path: `${path.registerUser_edit}/:id`,
          element: <LazyDetailRegister />
        },
        {
          path: path.client,
          element: <LazyDashBoardClient />
        },
        {
          path: path.log,
          element: <LazyLog />
        },
        {
          path: path.setting,
          element: <LazySetting />
        },
        {
          path: path.server,
          element: <LazyServer />
        }
      ]
    }
  ])
  return routeElement
}
