import { Outlet } from "react-router-dom";
import Navbar from "../component/Navbar";

const Layout = () => {
  return (
    <>
      <Navbar />
      <div className="mt-16">
        <Outlet />
      </div>
    </>
  );
};

export default Layout;
