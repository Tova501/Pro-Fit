import { createBrowserRouter } from "react-router";
import AppLayout from "./AppLayout";
import Home from "./Home";
import JobList from "./jobs/JobList";

export const router = createBrowserRouter([
    {
        path: '/', element: <AppLayout />,
        errorElement: <h1>error page!!</h1>,
        children: [
            { path: '/', element: <Home/>},
            {path: '/job', element: <JobList/>},
            // {path: '/job/add', element:  },
        ]
    }
])