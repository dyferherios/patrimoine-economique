import React from 'react';
import { Link } from 'react-router-dom';
import { Container, Row, Col, Button } from 'react-bootstrap';
import '../../node_modules/bootstrap/dist/css/bootstrap.css';


function HomePage() {
    return (
        <Container className="w-100 d-flex align-items-center justify-content-center h-75">
            <Row className="justify-content-center">
                <Col md={8} className="text-center vw-100">
                    <h1 className="mb-4">Bienvenue sur Patrimoine économique</h1>
                    <p className="text-lg text-gray-600 mb-5">Construisez votre avenir financier avec confiance - Expertise, conseils et solutions sur mesure pour optimiser votre patrimoine.</p>
                    <Button className="btn-success" size="lg">
                        <Link to="/possessions" className="text-decoration-none fw-bold" style={{ color: 'white' }}>
                            Visiter
                        </Link>
                    </Button>
                </Col>
            </Row>
        </Container>
    );
}

export default HomePage;
