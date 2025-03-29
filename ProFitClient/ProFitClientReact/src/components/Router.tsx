import { createBrowserRouter } from "react-router";
import AppLayout from "./AppLayout";
import Home from "./Home";
import NewJob from "./jobs/NewJob";
import EditJob from "./jobs/EditJob";
import UploadCVPage from '../pages/UploadCVPage';
import RecruiterJobList from "./jobs/RecruiterJobList";
import CandidateHome from "../pages/CandidateHome";
import RecruiterHome from "../pages/RecruiterHome";
import JobList from "./jobs/JobList";

export const router = createBrowserRouter([
    {
        path: '/', element: <AppLayout />,
        errorElement: <h1>error page!!</h1>,
        children: [
            { path: '/', element: <Home /> },
            { path: '/recruiter', element: <RecruiterHome /> },
            { path: 'recruiter/job', element: <RecruiterJobList /> },
            { path: 'recruiter/job/add', element: <NewJob /> },
            { path: 'recruiter/job/edit/:id', element: <EditJob /> },
            { path: 'upload-cv', element: <UploadCVPage /> },
            { path: '/candidate', element: <CandidateHome /> },
            { path: '/candidate/job', element: <JobList /> },
        ]
    }
])