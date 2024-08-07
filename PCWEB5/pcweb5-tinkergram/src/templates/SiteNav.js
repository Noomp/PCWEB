import { Container, Nav, Navbar } from "react-bootstrap";

function SiteNav() {
  return (
    <Navbar variant="dark" bg = "dark">
      <Container>
        <Navbar.Brand href="/" style = {{ textDecoration: "none" }}> Tinkergram </Navbar.Brand>
        <Nav>
          <Nav.Link href="/add">New Post</Nav.Link>
        </Nav>
      </Container>
    </Navbar>
  );
}

export default SiteNav;