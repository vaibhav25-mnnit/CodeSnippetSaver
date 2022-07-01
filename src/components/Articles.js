import React, { useEffect, useState } from 'react'
import Articlebutton from './Articlebutton'
import Breadcrumb from './Breadcrumb'

import CreateSnippet from './CreateSnippet'

import axios from 'axios';

import { useParams } from 'react-router-dom';

import Spinar from './Spinar';



function Articles() {

    const { topicId } = useParams();

    const [articles, setArticles] = useState([]);
    const [topicName, setTopicName] = useState("");

    const [loading, setLoading] = useState(null);

    useEffect(() => {
        async function fetchData(topicId) {
            const url = `${process.env.REACT_APP_backend_url}/topic/${topicId}`;
            try {
                const response = await axios.get(url)
                const data = await response.data;
                setArticles(data.articles);
                setTopicName(data.name);
                setLoading(true);
            } catch (error) {
                console.log(error);
            }
        }
        fetchData(topicId);
    })


    return (
        <>
            {loading ?
                <div>
                    <Breadcrumb name={topicName} topicId={topicId} />
                    <CreateSnippet topic={topicId} />
                    <hr />
                    <div className="container">
                        <div className="row" >
                            {articles.map((article) => <>
                                <Articlebutton

                                    key={article._id}
                                    name={article.title}
                                    parent={topicId}
                                    dificulty={article.dificulty} id={article._id} parentName={topicName} />

                            </>
                            )}
                        </div>
                    </div>
                </div>
                :
                <Spinar />
            }
        </>
    )
}

export default Articles
