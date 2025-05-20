import { createBrowserRouter } from "react-router";
import AppLayout from "./AppLayout";
import NewJob from "./jobs/NewJob";
import EditJob from "./jobs/EditJob";
import RecruiterHome from "../pages/RecruiterHome";
import RecruiterJobList from "./jobs/RecruiterJobList";
import CandidateJobList from "./jobs/CandidateJobList";
import Register from "./authentication/Register";
import Login from "./authentication/Login";
import JobItem from "./jobs/JobItem";
import Profile from "./Profile/Profile";
import Applications from "./application/Applications";
import Application from "./application/Applicant";
import Home from "../pages/Home";
import CandidateHome from "../pages/CandidateHome";
import GeneralCV from "./Profile/GeneralCV";
import FavoriteApplicants from "./application/FavoriteApplicants";

export const router = createBrowserRouter([
    {
        path: '/', element: <AppLayout />,
        errorElement: <h1>error page!!</h1>,
        children: [
            { path: '/', element: <Home /> },
            { path: '/login', element: <Login /> },
            { path: '/register', element: <Register /> },
            { path: '/profile', element: <Profile /> },
            { path: 'profile/cv/', element: <GeneralCV /> },
            { path: '/recruiter', element: <RecruiterHome /> },
            { path: '/recruiter/job', element: <RecruiterJobList /> },
            { path: 'recruiter/job/add', element: <NewJob /> },
            { path: 'recruiter/job/edit/:id', element: <EditJob /> },
            { path: '/recruiter/job/:jobId/applications', element: <Applications /> },
            { path: '/recruiter/favorites', element: <FavoriteApplicants /> },
            { path: '/recruiter/job/:jobId/applications/:applicationId', element: <Application /> },
            { path: '/candidate', element: <CandidateHome /> },
            { path: '/candidate/job', element: <CandidateJobList /> },
            { path: '/candidate/job/:id', element: <JobItem /> },
        ]
    }
])