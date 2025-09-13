import { Outlet } from "react-router";
import { Footer } from "./components/Footer";
import { Header } from "./components/Header";
// import { LeftPanel } from "./components/LeftPanel";

export const App = () => {
  return (
    <div className="relative container px-8 mx-auto flex-1 flex flex-col">
      <Header />
      <Outlet />
      <Footer />
    </div>
  );
};
