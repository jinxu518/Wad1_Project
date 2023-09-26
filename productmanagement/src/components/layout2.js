import React from 'react'
import { createBrowserRouter } from 'react-router-dom'
import Signup from './Signup';
import Login from './login';

const myRouter2 = createBrowserRouter([
    {
        path: '/',
        element: <Login />
        
    },
    {
        path: '/signup',
        element: <Signup/>

    } 
    ,
    {
        path: '/*',
        element: <Signup/>

    } 
])
export default myRouter2