import React from 'react';
import Home from './routes/Home';
import Root from './routes/Root';
import Catalog from './routes/Catalog';
import {createBrowserRouter, RouterProvider,} from "react-router-dom";
import Laptop from './components/laptops_page/Laptop';
import {Cart} from "./routes/Cart";
import {Provider} from "react-redux";
import store from "./store/store";

const routes = createBrowserRouter([
    {
        path: "/",
        element: <Root/>,
        children: [
            {
                path: "/",
                element: <Home/>
            },
            {
                path: "/catalog",
                element: <Catalog/>
            },
            {
                path: "/laptop/:id",
                element: <Laptop/>
            },
            {
                path:"/cart",
                element:<Cart/>
            }
        ]
    }
])

const App = () => {
    return (
        <Provider store={store}>
            <RouterProvider router={routes}/>
        </Provider>
    );
};

export default App;
