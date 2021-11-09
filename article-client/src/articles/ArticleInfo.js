import React, { useState, useEffect } from 'react';
import NotFoundPage from '../homePage/NotFoundPage';
import { useParams, useNavigate } from 'react-router-dom';
import {Button} from 'react-bootstrap';
import axios from 'axios';

const ArticleInfo = () => {
    const [currentUser, setCurrentUser] = useState("");
    const [currentArticle, setCurrentArticle] = useState({title:"", username:"", content:[], name:""});
    const [isAdmin, setIsAdmin] = useState("");
    const [error, setError] = useState("");
    const isMounted = React.useRef(true);
    const params = useParams();
    const navigate = useNavigate();


    useEffect(() => {

        if (isMounted.current) {
            fetch(`/api/article/${params.title}`)
            .then(results => results.json())
            .then(data => {
              setCurrentArticle(data[0]);
            },
            (error) => {
                setError(error.response.data.message);
            });
            const loggedUser = localStorage.getItem('loggedUser');
            if(loggedUser) {
                setCurrentUser(JSON.parse(loggedUser).username);
                setIsAdmin(JSON.parse(loggedUser).isAdmin);
            }
        }
        return () => {
            isMounted.current = false;
        };

    },[ currentArticle, params.title ]);

    if (!currentArticle) return <NotFoundPage />
    const handleDelete = async(name) => {
        try {
            const config = {
                headers: {
                  "Content-Type": "application/json"
                },
              };
            await axios.delete(
                `/api/article/${name}`,
                config
            );
        } catch (error) {
            setError("Not able to delete Article at the moment");
        }
        navigate("/articlelist");        
    }

    return (
        <>
        {error ? <h1>{error} </h1> : null}
        <h1>{currentArticle.title}</h1>
        <h2>{`Written By ${currentArticle.username}`}</h2>
        {currentArticle.content.map((paragraph, key) => (
            <ul key={key}>{paragraph}</ul>
        ))}
        {currentArticle.username === currentUser || isAdmin ?
        <p><Button variant="primary" href={`/editarticle/${currentArticle.title}` }> Edit </Button>
            {"                     "}
            <Button variant="primary" onClick={() => handleDelete(currentArticle.title)}> Delete </Button>
        </p> : null
        }
        </>
    );
}

export default ArticleInfo;