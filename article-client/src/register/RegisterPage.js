import React, {useState} from 'react';
import {Form, Button, Alert } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import "./RegisterPage.css";

const RegisterPage = ({ login, history }) => {
    const [details, setDetails] = useState({name:"", password:"", username: "", email: "", confirmPassword: ""})
    const [error, setError] = useState("");

    let navigate = useNavigate();

    // @desc    handler for registration, checks the password match
    //          regsiter hook fires the api to signup a new user
    
    const submitHandler = event => {
        event.preventDefault();
        if(details.password !== details.confirmPassword) {
            setError("Passwords do not Match");
        }
        register(details);
    }

    const register = async (details) => {
        try {
          const config = {
            headers: {
              "Content-type": "application/json"
            }
          }
          const { data } = await axios.post(
            "/api/user/register",
            { username: details.username, password: details.password, name: details.name, email: details.email },
            config
          );
          localStorage.setItem('loggedUser', JSON.stringify(data));
          navigate("/home");
        } catch(error) {
          setError(error.response.data.message);
        }
    }

    return (
    <>
    <div className="loginContainer">
    <Form onSubmit={submitHandler}>
        <h2>Register Page</h2>
        {error ? 
                <Alert variant="danger" style={{ fontSize: 20 }}>
                  <strong>{error}</strong>
                </Alert> : null
        }
        <Form.Group controlId="formBasicText">
            <Form.Label>User Name</Form.Label>
            <Form.Control type="text" placeholder="Enter username" onChange={event => setDetails({...details, username: event.target.value})} value={details.username}/>
        </Form.Group>

        <Form.Group controlId="formBasicText">
            <Form.Label>Name</Form.Label>
            <Form.Control type="text" placeholder="Enter Name" onChange={event => setDetails({...details, name: event.target.value})} value={details.name}/>
        </Form.Group>

        <Form.Group controlId="formBasicEmail">
            <Form.Label>Email</Form.Label>
            <Form.Control type="text" placeholder="Enter Email" onChange={event => setDetails({...details, email: event.target.value})} value={details.email}/>
        </Form.Group>

        <Form.Group controlId="formBasicPassword">
            <Form.Label>Password</Form.Label>
            <Form.Control type="password" placeholder="Password" onChange={event => setDetails({...details, password: event.target.value})} value={details.password}/>
        </Form.Group>

        <Form.Group controlId="formBasicPassword">
            <Form.Label>Confirm Password</Form.Label>
            <Form.Control type="password" placeholder="Password" onChange={event => setDetails({...details, confirmPassword: event.target.value})} value={details.confirmPassword}/>
        </Form.Group>
        
        <Button variant="primary" type="submit" >
            Register
        </Button>
    </Form>
    </div>

    </>
);
}

export default RegisterPage;