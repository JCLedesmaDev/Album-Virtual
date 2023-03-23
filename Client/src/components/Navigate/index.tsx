import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Button, Form } from 'react-bootstrap';
import { useLocation, useNavigate } from 'react-router-dom';
import NavigateModuleCSS from './index.module.css'
import { deleteStorage } from '../../utils/magnamentStorage';
import { useAppStore } from '../../pages/appStore';
import { useEffect, useState } from 'react';

export const Navigate: React.FC = () => {

  const navigate = useNavigate()
  const appStore = useAppStore()
  const [userAdmin, setUserAdmin] = useState<boolean>(false)

  const closeSesion = () => {
    navigate("/authUser")
    deleteStorage("User")
  }



  useEffect(() => {
    const isAdmin = appStore.state.user.roles.some(rol => rol.name === 'Admin')
    console.log("🚀 ~ file: index.tsx:31 ~ useEffect ~ isAdmin:", isAdmin)
    setUserAdmin(isAdmin)
  }, [])

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
              <NavDropdown.Item href="/purchasedAlbumes">Mis albumes comprados</NavDropdown.Item>
              {
                userAdmin && <NavDropdown.Item href="/administration">Administracion</NavDropdown.Item>
              }
              <NavDropdown.Item href="" onClick={closeSesion}> Cerrar sesion </NavDropdown.Item>
            </NavDropdown>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  )
}