import { observer } from 'mobx-react-lite';
import { Routes, Route } from 'react-router-dom';

import Welcome from './components/Welcome';
import SignIn from './components/Auth/Login';
import Registration from './components/Auth/Registration';
import PrivateRoute from './privateRoute';
import ChatsMenu from './components/ChatsMenu';
import Chat from './components/Chat';

const App = () => {
  return (
    <Routes>
      <Route index element={<Welcome />} />
      <Route path="/auth" element={<SignIn />} />
      <Route path="/reg" element={<Registration />} />
      <Route element={<PrivateRoute />}>
        <Route path="/chats" element={<ChatsMenu />} />
        <Route path="/chat/:chatId" element={<Chat />} />
      </Route>
    </Routes>
  );
};

export default App;
