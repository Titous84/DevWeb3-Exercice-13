import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Login from './components/Login/Login';
import LoginProvider from './contexts/LoginContext';
import UserList from './components/UserList/UserList';
import Menu from './components/Menu/Menu';

function App() {
  return (
    <LoginProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Menu />}>
            <Route index element={<UserList />} />
          </Route>
          <Route path="/login" element={<Login />} />
        </Routes>
      </BrowserRouter>
    </LoginProvider>
  );
}

export default App;
