import { createBrowserRouter, RouterProvider } from "react-router-dom";
import PostPageDetails from "./views/PostPageDetails";
import PostPageUpdate from "./views/PostPageUpdate";
import reportWebVitals from './reportWebVitals';
import PostPageAdd from "./views/PostPageAdd"; // local files start with ./ or ../
import "bootstrap/dist/css/bootstrap.min.css";
import ReactDOM from 'react-dom/client';
import React from 'react';
import App from './App';
import './index.css';

const router = createBrowserRouter([
  {path: "/", element: <App />,},
  {path: "/add", element: <PostPageAdd />,},
  {path: "/posts/:id", element: <PostPageDetails />,},
  {path: "/update/:id", element: <PostPageUpdate />,}
]);


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <RouterProvider router = {router} />
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
