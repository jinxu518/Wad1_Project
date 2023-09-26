import React from 'react'
import { createBrowserRouter } from 'react-router-dom'



import Home from './product/Home';
import AddProduct from './product/AddProduct';
import EditProduct from './product/EditProduct';
import ProductDetails from './product/ProductDetails';
import ProductList from './product/ProductList';
import Signup from './Signup';
import Error404 from './product/Error404';

const myRouter = createBrowserRouter([
    {
        path: '/',
        element: <Home />,
        children: [
            {
                path: 'productList',
                element: <ProductList />
            }
        ]
    },
    {
        path: '/productDetails',
        element: <ProductDetails/>

    },
    {
        path: '/addProduct',
        element: <AddProduct/>
    },
    {
        path: '/editProduct',
        element: <EditProduct/>

    },
    {
        path: '/signup',
        element: <Signup/>

    }
    ,
    {
        path: '/*',
        element: <Error404/>

    }
])
export default myRouter