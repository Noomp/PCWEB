import React from "react";
import { Container, Nav, Navbar } from "react-bootstrap";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "../firebase";
import { signOut } from "firebase/auth";

const SiteNav = () => {
  const [user] = useAuthState(auth);

  return (
    <Navbar variant="dark" bg="dark" style = {{ borderBottom: "#555 solid 3px"}}>
      <Container>
        <Navbar.Brand href="/">Tinkergram</Navbar.Brand>
        <Nav>
          <Nav.Link href="/add">New Post</Nav.Link>
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

export default SiteNav;
