import { BrowserRouter as Router,Routes, Route, Link } from 'react-router-dom';
import { useState } from "react";
import About from '../About/About';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
// import Footer from "./Footer";
// import AllUser from './temp/AllUser';
// import CreateUserForm from './CreateUserForm';
import Register from '../Register/Register';
import Login from '../Login/Login';
import { NavDropdown } from 'react-bootstrap';
import Profile from '../Porfile/Profile';
import Notices from '../Notices/Notices';
import Notice from '../Notice/Notice';
import { gql, useMutation } from '@apollo/client';

const out = gql`
    mutation{
        logout
    }
`
const NavBar = (props:any) => {

  const [logout, {data}] = useMutation(out)
  return (
    <Router>
        <Navbar bg="light" expand="lg">
            <Container>
                <Link className="nav-link" to="/"><Navbar.Brand>DemoSite</Navbar.Brand></Link>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                <Nav className="me-auto">
                        <Link id="RouterNavLink" className="nav-link" to="/">Home</Link>
                        <Link id="RouterNavLink" className="nav-link" to="/about">About</Link>
                        <Link id="RouterNavLink" className="nav-link" to="/contact">Contact</Link>
                    {!props.user &&  <Link id="RouterNavLink" className="nav-link" to="/register">Reigster</Link>}
                    {!props.user &&  <Link id="RouterNavLink" className="nav-link" to="/login">Login</Link>}
                    {props.user && <NavDropdown title="Setting" id="nav-item basic-nav-dropdown">
                        <NavDropdown.Item href="#action/3.1">Action</NavDropdown.Item>
                        <NavDropdown.Item href="#action/3.2">
                            Another action
                        </NavDropdown.Item>
                        <NavDropdown.Item href="#action/3.3">Something</NavDropdown.Item>
                        <NavDropdown.Divider />
                        <NavDropdown.Item className="text-dark text-decoration-none"  href="/">
                            <span onClick={() => {logout()}}>Logout</span>
                        </NavDropdown.Item>
                    </NavDropdown>}
                </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>

        <Routes>
                <Route path='/' element={< Notices user={props.user} />}></Route>
                <Route path='/notice' element={< Notice user={props.user}/>}></Route>
                <Route path='/profile' element={< Profile user={props.user}/>}></Route>
                <Route path='/about' element={< About user={props.user}/>}></Route>
                {/* <Route path='/contact' element={< CreateUserForm />}></Route> */}
                <Route path='/register' element={< Register user={props.user}/>}></Route>
                <Route path='/login' element={< Login user={props.user}/>}></Route>
        </Routes>
    </Router>

    
  );
};

export default NavBar;