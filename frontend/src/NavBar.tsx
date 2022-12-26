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
import Login from './Login';
import { Button, Dropdown, DropdownButton, NavDropdown } from 'react-bootstrap';
import ButtonGroup from 'react-bootstrap/ButtonGroup';
import Profile from './Profile';
import Notices from './Notices';
import Notice from './Notice';


const NavBar = () => {
  const [isOpen, setOpen] = useState(false);
  return (
    <Router>
        <Navbar bg="light" expand="lg">
            <Container>
                <Link className="nav-link" to="/"><Navbar.Brand>DemoSite</Navbar.Brand></Link>
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
                    <Nav.Link className="nav-item">
                        <Link className="nav-link" to="/login">Login</Link>
                    </Nav.Link>
                    <NavDropdown title="Setting" id="nav-item basic-nav-dropdown">
                        <NavDropdown.Item href="#action/3.1">Action</NavDropdown.Item>
                        <NavDropdown.Item href="#action/3.2">
                            Another action
                        </NavDropdown.Item>
                        <NavDropdown.Item href="#action/3.3">Something</NavDropdown.Item>
                        <NavDropdown.Divider />
                        <Link className="text-dark text-decoration-none" to="/login"><NavDropdown.Item href="#action/3.4">
                            Logout
                        </NavDropdown.Item></Link>
                    </NavDropdown>
                </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>

        <Routes>
                <Route path='/' element={<>< Notices /></>}></Route>
                <Route path='/notice' element={< Notice />}></Route>
                <Route path='/profile' element={< Profile />}></Route>
                <Route path='/about' element={< About />}></Route>
                <Route path='/contact' element={< CreateUserForm />}></Route>
                <Route path='/register' element={< Register />}></Route>
                <Route path='/login' element={< Login />}></Route>
        </Routes>
    </Router>

    
  );
};

export default NavBar;