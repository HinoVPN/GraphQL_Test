import { BrowserRouter as Router,Routes, Route, Link } from 'react-router-dom';
import { useState } from "react";
import About from './About/About';
import Contact from './Contract/Contact';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import Footer from "./Footer";
import AllUser from './AllUser';
import CreateUserForm from './CreateUserForm';
import Register from './Register';


const NavBar = () => {
  const [isOpen, setOpen] = useState(false);
  return (
    <Router>
        <Navbar bg="light" expand="lg">
            <Container>
                <Navbar.Brand href="#home">React-Bootstrap</Navbar.Brand>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                <Nav className="me-auto">
                    <Nav.Link className="nav-item">
                        <Link className="nav-link" to="/">Home</Link>
                    </Nav.Link>
                    <Nav.Link className="nav-item">
                        <Link className="nav-link" to="/about">About</Link>
                    </Nav.Link>
                    <Nav.Link className="nav-item">
                        <Link className="nav-link" to="/contact">Contact</Link>
                    </Nav.Link>
                    <Nav.Link className="nav-item">
                        <Link className="nav-link" to="/register">Reigster</Link>
                    </Nav.Link>
                </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>

        <Routes>
                 <Route path='/' element={<>< AllUser /><Footer /></>}></Route>
                 <Route path='/about' element={< About />}></Route>
                 <Route path='/contact' element={< CreateUserForm />}></Route>
                 <Route path='/register' element={< Register />}></Route>
        </Routes>
    </Router>

    
  );
};

export default NavBar;