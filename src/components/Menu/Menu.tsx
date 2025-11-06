import { useContext, useEffect } from 'react';
import { Link, Outlet, useNavigate } from 'react-router-dom';
import { LoginContext } from '../../contexts/LoginContext';

function Menu() {
  const { isLoggedIn, logout } = useContext(LoginContext);
  const navigate = useNavigate();

  useEffect(() => {
    if (!isLoggedIn) {
      navigate('/login');
    }
  }, [isLoggedIn, navigate]);

  async function handleLogout() {
    await logout();
    navigate('/login');
  }

  return (
    <>
      <nav className="bg-gray-800 p-4">
        <div className="container mx-auto flex justify-between items-center">
          <ul className="flex space-x-4">
            <li>
              <Link to="/" className="text-white hover:text-gray-300">
                Liste des utilisateurs
              </Link>
            </li>
          </ul>
          <button className="text-white hover:text-gray-300" onClick={handleLogout}>
            Se déconnecter
          </button>
        </div>
      </nav>
      <main className="p-6">
        <Outlet />
      </main>
    </>
  );
}

export default Menu;
