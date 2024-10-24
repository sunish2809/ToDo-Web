import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { createBrowserRouter, Navigate, RouterProvider } from 'react-router-dom';
import App from './App.tsx';
import SignIn from './components/SignIn.tsx';
import Inbox from './components/Inbox.tsx';
import Today from './components/Today.tsx'; // Assuming you have a Today component
import Setting from './components/Setting.tsx';
import Addtask from './components/Addtask.tsx';
import AddProject from './components/AddProject.tsx';
import SignUp from './components/SignUp.tsx';
import ProjectDetails from './components/ProjectDetails.tsx';

// Auth wrapper component
const AuthWrapper = ({ children }: { children: React.ReactNode }) => {
  const token = localStorage.getItem('token');
  return token ? <>{children}</> : <Navigate to="/signin" />;
};

const router = createBrowserRouter([
  {
    path: "/signin",
    element: <SignIn />,
  },
  {
    path: "/signup",
    element: <SignUp/>,
  },
  {
    path: "/app",
    element: <AuthWrapper><App /></AuthWrapper>, // App is the parent component
    children: [
      {
        path: "inbox",  // This will resolve to /app/inbox
        element: <Inbox />, // Render Inbox component inside Right
      },
      {
        path: "today",  // This will resolve to /app/today
        element: <Today />, // Render Today component inside Right
      },
      {
        path :"setting",
        element:<Setting/>
      },
      {
        path :"addTask",
        element:<Addtask/>
      },
      {
        path :"addProject",
        element:<AddProject/>
      },
      {
        path:"project/:id",
        element:<ProjectDetails/>
      }
    ],
  },
  {
    path: "*",
    element: <Navigate to="/signin" />,
  },
]);

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>
);

