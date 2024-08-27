import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';


function myNavBar() {
  return (
    <>
      <Navbar bg="primary" data-bs-theme="dark" >
        <Container  className="d-flex flex-row justify-content-around border border-black">
          <Navbar.Brand href="#home">Acceuil</Navbar.Brand>
          <Nav className="me-auto">
            <Nav.Link href="#home">Possesseurs</Nav.Link>
            <Nav.Link href="#features">Chart</Nav.Link>
          </Nav>
        </Container>
      </Navbar>
    </>
  );
}

export default myNavBar;