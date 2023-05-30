import React from "react";
import { useState } from "react";
import Button from "react-bootstrap/Button";
import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";
import { ToastContainer, toast } from "react-toastify";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from "../config/firebase.config";

export default function SignUp() {
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");

  const resetFields = () => {
    setPassword("");
    setEmail("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await createUserWithEmailAndPassword(auth, email, password);
      resetFields();
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Row className="justify-content-md-center pt-5">
      <ToastContainer />
      <Col lg={4}>
        <Form onSubmit={handleSubmit}>
          <Row className="mb-3">
            <Form.Group className="mb-3" controlId="formGridEmail">
              <Form.Label>Email</Form.Label>
              <Form.Control value={email} type="email" placeholder="Email" onChange={(e) => setEmail(e.target.value)} />
            </Form.Group>
            <Form.Group as={Col} controlId="formGridPassword">
              <Form.Label>Contraseña</Form.Label>
              <Form.Control value={password} name="password" type="password" placeholder="Contraseña" onChange={(e) => setPassword(e.target.value)} />
            </Form.Group>
          </Row>
          <Button variant="primary" type="submit">
            Registrarse
          </Button>
        </Form>
      </Col>
    </Row>
  );
}
