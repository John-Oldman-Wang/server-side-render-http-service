import React from 'react';
import Http from '../service/http';

export async function getProps() {
    const http = new Http(true);
    return http.get('http://localhost:3000/api');
}

export default function Index(props) {
    return (
        <div>
            hello world<div>cookie: {props.cookie}</div>
        </div>
    );
}
