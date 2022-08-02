import { Container, Navbar, Nav } from "react-bootstrap";
import { NavLink, Link } from "react-router-dom";

const Navigation = () => {
   return (
      <Navbar bg="primary" variant="dark" expand="md">
         <Container>
            <Link to="/" className="navbar-brand">
               <i className="fas fa-compress-arrows-alt"></i> <span className="text-shadow">Image Resizer</span>
            </Link>
            <Navbar.Toggle aria-controls="basic-navbar-nav" />{" "}
            <Navbar.Collapse>
               <Nav className="navbar-nav ms-auto">
                  <NavLink className="nav-link" to="/" exact>
                     <i className="fas fa-expand"></i> Resize
                  </NavLink>
                  <NavLink className="nav-link" to="/gallery" exact>
                     <i className="fas fa-camera-retro"></i> Gallery
                  </NavLink>
                  <NavLink className="nav-link" to="/project" exact>
                     <i className="far fa-images"></i> Projects
                  </NavLink>
                  <NavLink className="nav-link" to="/explorer" exact>
                     <i className="fas fa-code-branch"></i> Explorer
                  </NavLink>
               </Nav>
            </Navbar.Collapse>
         </Container>
      </Navbar>
   );
};

export default Navigation;
