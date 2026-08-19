import React, { Suspense, lazy } from 'react'
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import { Toaster } from 'react-hot-toast'
import { AuthProvider } from '../context/AuthContext'
import { SidebarProvider } from '../context/SidebarContext'
import { ProfileProvider } from '../context/ProfileContext'
import { NotifProvider } from '../context/NotifContext'
import { SkillProvider, ProjectProvider, CertProvider, CareerGoalProvider, SkillGapProvider, RoadmapProvider, ApplicationProvider } from '../context/CareerDataContexts'
import PrivateRoute from './PrivateRoute'
import LoadingSpinner from '../components/ui/LoadingSpinner'
import { ROUTES } from '../utils/constants'

const Landing = lazy(() => import('../pages/Landing'))
const Login = lazy(() => import('../pages/Login'))
const Register = lazy(() => import('../pages/Register'))
const ForgotPassword = lazy(() => import('../pages/ForgotPassword'))
const Onboarding = lazy(() => import('../pages/Onboarding'))
const Dashboard = lazy(() => import('../pages/Dashboard'))
const SkillTwin = lazy(() => import('../pages/SkillTwin'))
const Resume = lazy(() => import('../pages/Resume'))
const GitHub = lazy(() => import('../pages/GitHub'))
const Profile = lazy(() => import('../pages/Profile'))
const Skills = lazy(() => import('../pages/Skills'))
const Projects = lazy(() => import('../pages/Projects'))
const Certifications = lazy(() => import('../pages/Certifications'))
const CareerGoals = lazy(() => import('../pages/CareerGoals'))
const SkillGap = lazy(() => import('../pages/SkillGap'))
const Roadmap = lazy(() => import('../pages/Roadmap'))
const Courses = lazy(() => import('../pages/Courses'))
const Jobs = lazy(() => import('../pages/Jobs'))
const Applications = lazy(() => import('../pages/Applications'))
const Interview = lazy(() => import('../pages/Interview'))
const Assistant = lazy(() => import('../pages/Assistant'))
const Progress = lazy(() => import('../pages/Progress'))
const Notifications = lazy(() => import('../pages/Notifications'))
const Settings = lazy(() => import('../pages/Settings'))

const AppRouter: React.FC = () => {
  return (
    <BrowserRouter>
      <AuthProvider>
        <SidebarProvider>
          <ProfileProvider>
            <NotifProvider>
              <SkillProvider>
                <ProjectProvider>
                  <CertProvider>
                    <CareerGoalProvider>
                      <SkillGapProvider>
                        <RoadmapProvider>
                          <ApplicationProvider>
              <Toaster
                position="top-right"
                toastOptions={{
                  style: {
                    background: '#1C2128',
                    color: '#E6EDF3',
                    border: '1px solid #30363D',
                    borderRadius: '8px',
                    fontSize: '14px',
                  },
                  success: { iconTheme: { primary: '#3FB950', secondary: '#1C2128' } },
                  error: { iconTheme: { primary: '#F85149', secondary: '#1C2128' } },
                }}
              />
              <Suspense fallback={<LoadingSpinner fullPage label="Loading..." />}>
                <Routes>
                  {/* Public routes */}
                  <Route path={ROUTES.HOME} element={<Landing />} />
                  <Route path={ROUTES.LOGIN} element={<Login />} />
                  <Route path={ROUTES.REGISTER} element={<Register />} />
                  <Route path={ROUTES.FORGOT_PASSWORD} element={<ForgotPassword />} />

                  {/* Protected routes */}
                  <Route path={ROUTES.ONBOARDING} element={<PrivateRoute><Onboarding /></PrivateRoute>} />
                  <Route path={ROUTES.DASHBOARD} element={<PrivateRoute><Dashboard /></PrivateRoute>} />
                  <Route path={ROUTES.SKILL_TWIN} element={<PrivateRoute><SkillTwin /></PrivateRoute>} />
                  <Route path={ROUTES.RESUME} element={<PrivateRoute><Resume /></PrivateRoute>} />
                  <Route path={ROUTES.GITHUB} element={<PrivateRoute><GitHub /></PrivateRoute>} />
                  <Route path={ROUTES.PROFILE} element={<PrivateRoute><Profile /></PrivateRoute>} />
                  <Route path={ROUTES.SKILLS} element={<PrivateRoute><Skills /></PrivateRoute>} />
                  <Route path={ROUTES.PROJECTS} element={<PrivateRoute><Projects /></PrivateRoute>} />
                  <Route path={ROUTES.CERTIFICATIONS} element={<PrivateRoute><Certifications /></PrivateRoute>} />
                  <Route path={ROUTES.CAREER_GOALS} element={<PrivateRoute><CareerGoals /></PrivateRoute>} />
                  <Route path={ROUTES.SKILL_GAP} element={<PrivateRoute><SkillGap /></PrivateRoute>} />
                  <Route path={ROUTES.ROADMAP} element={<PrivateRoute><Roadmap /></PrivateRoute>} />
                  <Route path={ROUTES.COURSES} element={<PrivateRoute><Courses /></PrivateRoute>} />
                  <Route path={ROUTES.JOBS} element={<PrivateRoute><Jobs /></PrivateRoute>} />
                  <Route path={ROUTES.APPLICATIONS} element={<PrivateRoute><Applications /></PrivateRoute>} />
                  <Route path={ROUTES.INTERVIEW} element={<PrivateRoute><Interview /></PrivateRoute>} />
                  <Route path={ROUTES.ASSISTANT} element={<PrivateRoute><Assistant /></PrivateRoute>} />
                  <Route path={ROUTES.PROGRESS} element={<PrivateRoute><Progress /></PrivateRoute>} />
                  <Route path={ROUTES.NOTIFICATIONS} element={<PrivateRoute><Notifications /></PrivateRoute>} />
                  <Route path={ROUTES.SETTINGS} element={<PrivateRoute><Settings /></PrivateRoute>} />

                  {/* Fallback */}
                  <Route path="*" element={<Navigate to={ROUTES.HOME} replace />} />
                </Routes>
              </Suspense>
                          </ApplicationProvider>
                        </RoadmapProvider>
                      </SkillGapProvider>
                    </CareerGoalProvider>
                  </CertProvider>
                </ProjectProvider>
              </SkillProvider>
            </NotifProvider>
          </ProfileProvider>
        </SidebarProvider>
      </AuthProvider>
    </BrowserRouter>
  )
}

export default AppRouter
