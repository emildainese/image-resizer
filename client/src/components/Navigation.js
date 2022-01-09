import { Container, Navbar, Nav } from 'react-bootstrap';
import { NavLink, Link } from 'react-router-dom';
const Navigation = () => {
  return (
    <Navbar bg="primary" variant="dark">
      <Container className="justify-content-between">
        <Link to="/" className="navbar-brand">
          <i className="fas fa-compress-arrows-alt"></i> Image Resizer
        </Link>
        <Nav>
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
      </Container>
    </Navbar>
  );
};

export default Navigation;
