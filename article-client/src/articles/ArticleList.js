import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import {useState, useEffect } from 'react';
import { Button} from 'react-bootstrap';
import axios from 'axios';

function ArticleList () {
    const [articles, setArticles] = useState([]);
    const [error, setError] = useState("");
    const [currentUser, setCurrentUser] = useState("");
    const [isAdmin, setIsAdmin] = useState("");
    const isMounted = React.useRef(true);
    let navigate = useNavigate();

    useEffect(() => {

        if (isMounted.current) {
            fetch('/api/article')
            .then(results => results.json())
            .then(data => {
              setArticles(data);
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

    },[ articles ]);

    const handleDelete = async (name) => {
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
        navigate("/");
    }

    const handleCreate = () => {
        navigate('/createarticle',{ state: currentUser})
    }
    
    return (
    <>
    <h1>Articles</h1>
    <Button variant="primary" onClick = {handleCreate}> Create New Article </Button>
    <h1> <p>{"\n\n\n"}</p> </h1>
    
    {error ? <h1>{error}</h1> 
        : 
            articles.map((article, key) => (
                
                <div key = {key}>
                    <div >{article.username === currentUser || isAdmin ? 
                        <div >
                            <Button variant="primary" href={`/editarticle/${article.title}`} > Edit </Button>
                            {"                     "}
                            <Button variant="primary" onClick={() => handleDelete(article.title)} > Delete </Button>
                        </div>
                    : null
                         }
                    </div>
                    <Link className="article-list-item"  to={`/article/${article.title}`}>
                        <h3>{article.name}</h3>
                        <p>
                        {`             Written By ${article.username}`}
                        </p>
                    </Link>

                </div>
    ))}
    </>
)};

export default ArticleList;