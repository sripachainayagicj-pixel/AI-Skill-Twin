import React from 'react'
import { Navigate, useLocation } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import { ROUTES } from '../utils/constants'

interface PrivateRouteProps {
  children: React.ReactNode
}

const PrivateRoute: React.FC<PrivateRouteProps> = ({ children }) => {
  const { isAuthenticated, user } = useAuth()
  const location = useLocation()

  if (!isAuthenticated) {
    return <Navigate to={ROUTES.LOGIN} state={{ from: location }} replace />
  }

  // If authenticated but onboarding not done, redirect to onboarding
  // (except if already on onboarding page)
  if (user && !user.onboardingCompleted && location.pathname !== ROUTES.ONBOARDING) {
    return <Navigate to={ROUTES.ONBOARDING} replace />
  }

  // If onboarding already done, don't allow going back to onboarding
  if (user?.onboardingCompleted && location.pathname === ROUTES.ONBOARDING) {
    return <Navigate to={ROUTES.DASHBOARD} replace />
  }

  return <>{children}</>
}

export default PrivateRoute
