import { NavLink } from "react-router-dom";
import Container from "./Container";

const Navbar = () => {
  return (
    <header className="bg-blue-500 p-6">
      <Container>
        <nav className="flex gap-12">
          <NavLink
            to={"/"}
            className={({ isActive }) =>
              isActive ? "border-b border-white text-white" : "text-white"
            }
          >
            Home
          </NavLink>
          <NavLink
            to={"/projects"}
            className={({ isActive }) =>
              isActive ? "border-b border-white text-white" : "text-white"
            }
          >
            All Projects
          </NavLink>
          <NavLink
            to={"/notifications"}
            className={({ isActive }) =>
              isActive ? "border-b border-white text-white" : "text-white"
            }
          >
            Notifications
          </NavLink>
        </nav>
      </Container>
    </header>
  );
};

export default Navbar;
