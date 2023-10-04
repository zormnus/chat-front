import ReactDOM from 'react-dom/client';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';

import SignIn from './components/Auth/Login';
import Registration from './components/Auth/Registration';
import Welcome from './Welcome';
import ChatsMenu from './components/ChatsMenu';
import Chat from './components/Chat';

const router = createBrowserRouter([
  {
    path: '/',
    element: <Welcome />,
  },
  {
    path: 'auth/',
    element: <SignIn />,
  },
  {
    path: 'reg/',
    element: <Registration />,
  },
  {
    path: 'chats/',
    element: <ChatsMenu />,
  },
  { path: '/chat/:chatId', element: <Chat /> },
]);

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement,
);
root.render(<RouterProvider router={router} />);
