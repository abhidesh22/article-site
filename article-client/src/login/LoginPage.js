import React, {useState} from 'react';
import {Form, Button, Row, Col } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import "./LoginPage.css";
import '../bootstrap.min.css';

const LoginPage = ({ login, error, history }) => {
    const [details, setDetails] = useState({name:"", password:""})
    let navigate = useNavigate();
    const submitHandler = event => {
        event.preventDefault();
        if(document.activeElement.innerHTML !== 'Register') {
            login(details, false);
        } else {
            login(details, true)
        }
    }
    
    function handleClick() {
        navigate("/register");
    }
    
    return (
    <>
    <div className="loginContainer">
    <Form onSubmit={submitHandler}>
        <h2>Login Page</h2>
        <Form.Group controlId="formBasicUser">
            <Form.Label>User Name</Form.Label>
            <Form.Control type="text" placeholder="Enter username" onChange={event => setDetails({...details, name: event.target.value})} value={details.name}/>
        </Form.Group>

        <Form.Group controlId="formBasicPassword">
            <Form.Label>Password</Form.Label>
            <Form.Control type="password" placeholder="Password" onChange={event => setDetails({...details, password: event.target.value})} value={details.password}/>
        </Form.Group>
        
        <Button variant="primary" type="submit" >
            Login
        </Button>
        
        <Row className="py-3 row-login">
          <Col>
            New Customer Register Here
          </Col>
          <Button variant="primary" type="submit" className="button-new" onClick = {handleClick}>
            Register
          </Button>
        </Row>
    </Form>
    </div>
    </>
);
}

export default LoginPage;