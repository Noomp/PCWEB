import React from "react";
import { Container, Nav, Navbar } from "react-bootstrap";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "../firebase";
import { signOut } from "firebase/auth";

const NavRow = () => {
  const [user] = useAuthState(auth);

  return (
    <Navbar variant="primary" style = {{ background: "#E4CCFF", position: "sticky", top: 0, zIndex: 1}}>
      <Container>
        <Navbar.Brand href="/">🍽️ Sharecipe</Navbar.Brand>
        <Nav>
          <Nav.Link href="/add">Contribute</Nav.Link>
          {user ? (
            <Nav.Link onClick={() => signOut(auth)}>🚪</Nav.Link>
           ) : (
            <Nav.Link href="/login">Login</Nav.Link>
          )}
        </Nav>
      </Container>
    </Navbar>
  );
};

export default NavRow;
