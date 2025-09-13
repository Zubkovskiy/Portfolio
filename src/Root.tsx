import { HashRouter as Router, Navigate, Route, Routes } from "react-router";
import { HomePage } from "./module/HomePage/HomePage";
import { App } from "./module/App/App";
import { ProjectsPage } from "./module/ProjectsPage/ProjectsPage";
import { NotFound } from "./module/shared/components/NotFound";
import { ContactPage } from "./module/ContactPage/ContactPage";

export const Root = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<App />}>
          <Route index element={<HomePage />} />

          <Route path="home" element={<Navigate to="../" replace />} />
          <Route path="projects" element={<ProjectsPage />} />
          <Route path="contact" element={<ContactPage />} />
          <Route path="*" element={<NotFound />} />
        </Route>
      </Routes>
    </Router>
  );
};
