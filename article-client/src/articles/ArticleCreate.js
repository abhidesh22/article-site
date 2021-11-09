import React, {useState} from 'react';
import {Form, Button } from 'react-bootstrap';
import { useNavigate, useLocation } from 'react-router-dom';
import axios from 'axios';

const ArticleCreate = (props) => {
    const [details, setDetails] = useState({name:"", title: "", content: [""]});
    const [error, setError] = useState("");
    let navigate = useNavigate();
    const { state } = useLocation();
    
    const submitHandler = event => {
        event.preventDefault();
        createNewArticle(details);   
    }
    const createNewArticle = async (details) => {
        try {
            const config = {
                headers: {
                  "Content-Type": "application/json"
                },
              };
            await axios.post(
                "/api/article/create",
                { title: details.title, content: details.content, username: state, name: details.name },
                config
            );

        } catch (error) {
            setError("Not able to create Article at the moment");
        }
        navigate("/articlelist");
    }
    return (
    <>
    <div >
    <Form onSubmit={submitHandler}>
        { error ? <h1> {error} </h1> : null }
        <h2>Create New Article </h2>
        <Form.Group controlId="formBasicText">
            <Form.Label>Article Name</Form.Label>
            <Form.Control type="text" placeholder="Enter name" onChange={event => setDetails({...details, name: event.target.value})} value={details.name}/>
        </Form.Group>

        <Form.Group controlId="formBasicText">
            <Form.Label>Article Title</Form.Label>
            <Form.Control type="text" placeholder="Enter title" onChange={event => setDetails({...details, title: event.target.value})} value={details.title}/>
        </Form.Group>

        <Form.Group controlId="formBasicText">
            <Form.Label>Article Text</Form.Label>
            <Form.Control as="textarea" rows={15} placeholder="Enter article" onChange={event => setDetails({...details, content: event.target.value})} value={details.content}/>
        </Form.Group>
        
        <Button variant="primary" type="submit" >
            Create Article
        </Button>

    </Form>
    </div>
    </>
);
}

export default ArticleCreate;