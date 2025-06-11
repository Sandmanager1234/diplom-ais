import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
} from 'react-router-dom'

import { Layout } from 'UI'

import { ResumesPage } from 'pages/Resumes'
import { CreateResumePage } from 'pages/CreateResume'
import { ProfileApplicantPage } from 'pages/ProfileApplicant'
import { CalendarPage } from 'pages/CalendarPage'
import { NotificationPage } from 'pages/NotificationPage'
import { LoginPage } from 'pages/LoginPage'
import { NotFoundPage } from 'pages/NotFoundPage'
import { CurrentVacancyPage } from 'pages/CurrentVacancyPage'
import { ResumeForm } from 'pages/ResumeForm'

import RequireAuth from 'components/ContextProvider/RequireAuth'
import BugCatcher from 'components/BugCatcher'
import VacanciesPage from '../pages/VacanciesPage'
import ResumeBoardPage from '../pages/ResumeBoardPage'

export const router = createBrowserRouter(
  createRoutesFromElements(
    <>
      <Route path={'/login'} element={<LoginPage />} />
      <Route
        path={'/'}
        element={
          <RequireAuth>
            <Layout />
          </RequireAuth>
        }
        ErrorBoundary={BugCatcher}
      >
        <Route index element={<ResumesPage />} />
        <Route path={'/edit-resume/:id'} element={<CreateResumePage />} />
        <Route path={'/profile/calendar'} element={<ProfilePage />} />
        <Route path={'/profile/colleagues'} element={<ProfilePage />} />
        <Route path={'/profile/tasks'} element={<ProfilePage />} />
        <Route path={'/new-resume'} element={<CreateResumePage />} />
        <Route path={'/applicant/:id'} element={<ProfileApplicantPage />} />
        <Route path={'/notification'} element={<NotificationPage />} />
        <Route path={'/calendar'} element={<CalendarPage />} />
        <Route path={'/vacancies'} element={<VacanciesPage />} />
        <Route path={'/vacancies/:id'} element={<CurrentVacancyPage />} />
        <Route path={'/resumeBoard'} element={<ResumeBoardPage />} />
        <Route path={'/applicantForm'} element={<ApplicantForm />} />
        <Route path={'/statistics'} element={<StatisticsPage />} />
      </Route>
      <Route path={'*'} element={<NotFoundPage />} />
    </>
  )
)
