import { FC } from 'react'
import { useRecoilValue } from 'recoil'
import { Navigate, Outlet, useLocation } from 'react-router-dom'

import { userLoggedIn } from 'atoms/user'

interface IProps {
  inverse: boolean
}

const ProtectedRoute: FC<IProps> = ({ inverse }) => {
  const { pathname } = useLocation()
  const isLoggedIn = useRecoilValue(userLoggedIn)

  if (inverse) {
    return isLoggedIn ? <Navigate to="/" /> : <Outlet />
  }

  if (!isLoggedIn) {
    return <Navigate to="/auth" state={pathname} />
  }

  return <Outlet />
}

export default ProtectedRoute
