import React from 'react';
import Home from './routes/Home';
import Root from './routes/Root';
import Catalog from './routes/Catalog';
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import Laptop from './components/laptops_page/Laptop';

const routes = createBrowserRouter([
  {
    path:"/",
    element:<Root/>,
    children: [
        {
          path:"/",
          element:<Home/>
        },
        {
          path:"/catalog",
          element:<Catalog/>
        },
        {
            path:"/laptop/:id",
            element:<Laptop/>
        }
    ]
  }
])

const App = () => {
  return (
    <RouterProvider router={routes}/>
  );
};

export default App;
