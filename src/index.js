import React, { StrictMode } from 'react';
import ReactDOM from 'react-dom/client';
import { RouterProvider, createHashRouter } from 'react-router-dom';
import './index.css';
import Dex from './routes/dex/Dex';
import Root from './routes/root/Root';
import About from './routes/about/About'

const router = createHashRouter([
    {
      path: "/",
      element: <Root />,
      children: [
        {
          path: "/",
          element: <Dex />
        },
        {
          path: "/about",
          element: <About />
        }
      ]
    } 
  ]);

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>
);