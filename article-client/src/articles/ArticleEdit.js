import React, {useState, useEffect} from 'react';
import {Form, Button } from 'react-bootstrap';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';

const ArticleEdit = () => {
    const [details, setDetails] = useState({name:"", title: "", content: []});
    const [currentUser, setCurrentUser] = useState("");
    const [error, setError] = useState("");
    let navigate = useNavigate();
    const isMounted = React.useRef(true);
    const params = useParams();
    useEffect(() => {

        if (isMounted.current) {
            fetch(`/api/article/${params.title}`)
            .then(results => results.json())
            .then(data => {
              setDetails({name:data[0].name, title: data[0].title, content: data[0].content});
            },
            (error) => {
                setError("Error in retrieving the article details");
            });
            const loggedUser = localStorage.getItem('loggedUser');
            if(loggedUser) {
                setCurrentUser(JSON.parse(loggedUser).username);
            }
        }
        return () => {
            isMounted.current = false;
        };

    },[ details, params.title ]);

    const submitHandler = event => {
        event.preventDefault();
        updateArticle(details);
    }
    const updateArticle = async (details) => {
        try {
            // console.log('here now', currentUser, details);
            const config = {
                headers: {
                  "Content-Type": "application/json"
                },
              };

            await axios.put(
                `/api/article/${params.title}`,
                { title: details.title, content: details.content, username: currentUser, name: details.name },
                config
            );

            // console.log(data);
        } catch (error) {
            setError("Not able to edit Article at the moment");
        }
        
        navigate("/articlelist");
    }
    return (
    <>
    <div>
    <Form onSubmit={submitHandler}>
        <h2>Edit Article </h2>
        {error ? <h1> {error} </h1> : null}
        <Form.Group controlId="formBasicText">
            <Form.Label>Article Name</Form.Label>
            <Form.Control type="text" placeholder="Enter name" onChange={event => setDetails({...details, name: event.target.value})} value={details.name}/>
        </Form.Group>

        <Form.Group controlId="formBasicText">
            <Form.Label>Article Title </Form.Label>
            {/* <Form.Control type="text" placeholder="Enter title" onChange={event => setDetails({...details, title: event.target.value})} value={details.title}/> */}
        </Form.Group>
        <Form.Label><strong>{details.title}</strong></Form.Label>

        <Form.Group controlId="formBasicText">
            <Form.Label>Article Text</Form.Label>
            <Form.Control as="textarea" rows={15} placeholder="Enter article" onChange={event => setDetails({...details, content: event.target.value})} value={details.content}/>
        </Form.Group>
        
        <Button variant="primary" type="submit" >
            Update Article
        </Button>

    </Form>
    </div>
    </>
);
}

export default ArticleEdit;