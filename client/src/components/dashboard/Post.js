// //rcc
// import React, {Component} from 'react';
// import { Table } from 'reactstrap';
//
// class Post extends Component {
//     render() {
//         return (

//         );
//     }
// }
//
// export default Post;


//Hook
//rscp
import React, {useEffect, useState} from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';
import {Table} from "reactstrap"

const api = axios.create({
    baseURL: "https://jsonplaceholder.typicode.com/posts"

});


//Post 란 이름을 그대로 따라간다.
export default () => {
    //상태선언에 관한 Hook
    const [posts, setPosts] = useState({
        loading: true,
        results: [],
        resultsError: null
    })

    const getData = async () => {
        fetch('https://jsonplaceholder.typicode.com/posts')
            .then(response => response.json())
            .then(json => {
                const [results, resultsError] = [json];

                setPosts({
                    loading: false,
                    results,
                    resultsError
                })
                console.log(results)
            })

    }


    //life cycle Hook
    useEffect(() => {
        //networking (이전에 이 함수를 만들어야..)
        getData();
    }, []);

    return (
        <div>
            <h1>Post</h1>
            <Table bordered>
                <thead>
                <tr>
                    <th>ID</th>
                    <th>Title</th>
                    <th>Body</th>
                    <th>UserId</th>
                </tr>
                </thead>
                <tbody>
                {posts.results.map(result => (
                    <tr>
                        <th scope="row">{result.id}</th>
                        <td>{result.title}</td>
                        <td>{result.body}</td>
                        <td>{result.userId}</td>
                    </tr>
                ))}

                </tbody>
            </Table>
        </div>
    );
};

