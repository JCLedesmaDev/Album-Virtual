import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Button, Form } from 'react-bootstrap';
import { useLocation, useNavigate } from 'react-router-dom';
import NavigateModuleCSS from './index.module.css'
import { deleteStorage } from '../../utils/magnamentStorage';

export const Navigate: React.FC = () => {

  const navigate = useNavigate()

  const closeSesion = () => {
    navigate("/authUser")
    deleteStorage("User")
  }

  if (useLocation().pathname === '/authUser') {
    return <></>
  }

  return (

    <Navbar bg="dark" variant="dark" className={NavigateModuleCSS.containerNavigate}>
      <Container>
        <Navbar.Brand href="">G7Album</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            <Nav.Link href="/">Albumes</Nav.Link>
            <Nav.Link href="/figurites">Figuritas</Nav.Link>
            <NavDropdown title="Mi cuenta" id="basic-nav-dropdown">
              <NavDropdown.Item href="/AlbumUsuario">Mis albumes</NavDropdown.Item>
              <NavDropdown.Item href="/administration">Administracion</NavDropdown.Item>
              <NavDropdown.Item href="" onClick={closeSesion}> Cerrar sesion </NavDropdown.Item>
            </NavDropdown>
          </Nav>


          {/* <Form className="d-flex">
            <Form.Control
              type="search"
              placeholder="Buscar album, figus"
              className="me-2"
              aria-label="Search"
            />
            <Button variant="outline-success">Buscar</Button>
          </Form> */}
        </Navbar.Collapse>
      </Container>
    </Navbar>
  )
}