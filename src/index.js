import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { BrowserRouter } from 'react-router-dom';
import { ProSidebarProvider } from "react-pro-sidebar"
import { TmdbProvider } from './contexts/TmdbProvider';
import { StylingProvider } from './contexts/StylingProvider';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  // <React.StrictMode>
  <StylingProvider>
    <TmdbProvider>
      <BrowserRouter>
        <ProSidebarProvider>
          <App />
        </ProSidebarProvider>
      </BrowserRouter>
    </TmdbProvider>
  </StylingProvider>
  // </React.StrictMode>
);