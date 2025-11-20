import { BrowserRouter, Route, Routes } from "react-router-dom";
import Layout from "./layout/Layout";
import { NotificationProvider } from "./context/NotificationContext";
import React, { useEffect } from "react";

const Home = React.lazy(() => import("/src/pages/Home"))
const Projects = React.lazy(() => import("/src/pages/Projects"))
const ProjectDetails = React.lazy(() => import("/src/pages/ProjectDetails"))
const Notifications = React.lazy(() => import("/src/pages/Notifications"))

const App = () => {

  useEffect(() => {
      if (Notification.permission === "default") {
        Notification.requestPermission();
      }
  },[])

  return (
    <BrowserRouter>
      <NotificationProvider>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route path="" element={<Home />} />
            <Route path="projects" element={<Projects />} />
            <Route path="projects/:id" element={<ProjectDetails />} />
            <Route path="notifications" element={<Notifications />} />
          </Route>
        </Routes>
      </NotificationProvider>
    </BrowserRouter>
  );
};

export default App;
