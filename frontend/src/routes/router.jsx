import { lazy, Suspense } from 'react'
import { createBrowserRouter } from 'react-router-dom'

import Loader from '../components/Loader.jsx'
import RootLayout from '../layouts/RootLayout.jsx'
import ProtectedRoute from './ProtectedRoute.jsx'

const CreatePost = lazy(() => import('../pages/CreatePost.jsx'))
const EditPost = lazy(() => import('../pages/EditPost.jsx'))
const Home = lazy(() => import('../pages/Home.jsx'))
const Login = lazy(() => import('../pages/Login.jsx'))
const NotFound = lazy(() => import('../pages/NotFound.jsx'))
const PostDetail = lazy(() => import('../pages/PostDetail.jsx'))
const Profile = lazy(() => import('../pages/Profile.jsx'))
const Register = lazy(() => import('../pages/Register.jsx'))

function page(Component) {
  return (
    <Suspense fallback={<Loader label="Loading page" />}>
      <Component />
    </Suspense>
  )
}

export const router = createBrowserRouter([
  {
    element: <RootLayout />,
    children: [
      { path: '/', element: page(Home) },
      { path: '/login', element: page(Login) },
      { path: '/register', element: page(Register) },
      { path: '/posts/:id', element: page(PostDetail) },
      {
        element: <ProtectedRoute />,
        children: [
          { path: '/profile', element: page(Profile) },
          { path: '/posts/new', element: page(CreatePost) },
          { path: '/posts/:id/edit', element: page(EditPost) }
        ]
      },
      { path: '*', element: page(NotFound) }
    ]
  }
])
