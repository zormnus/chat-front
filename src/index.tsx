import React from 'react';
import ReactDOM from 'react-dom/client';
import {
    createBrowserRouter,
    RouterProvider,
} from "react-router-dom";
import SignIn from './userwork_components/Login'
import Registration from "./userwork_components/Registration";
import Welcome from "./Welcome"
import ChatsMenu from './chats_components/ChatsMenu';


const router = createBrowserRouter([
    {
        path: "/",
        element: <Welcome/>
    },
    {
        path: "auth/",
        element: <SignIn/>
    },
    {
        path: "reg/",
        element: <Registration/>
    },
    {
        path: "chats/",
        element: <ChatsMenu/>
    }
])

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(<RouterProvider router={router}/>);

