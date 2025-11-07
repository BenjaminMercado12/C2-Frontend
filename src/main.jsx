import React from 'react';
import ReactDOM from 'react-dom/client';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';

import App from './app';
import BuyTicketContainer from './containers/BuyTicketContainer';
import TicketsContainer from './containers/TicketsContainer';

import 'primereact/resources/themes/lara-light-blue/theme.css'; // tema
import 'primereact/resources/primereact.min.css';
import 'primeicons/primeicons.css';
import 'primeflex/primeflex.css';
import './index.scss';

const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    children: [
      { index: true, element: <BuyTicketContainer /> },
      { path: 'entradas', element: <TicketsContainer /> }
    ]
  }
]);

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
