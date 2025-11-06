import { useContext, useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { LoginContext } from '../../contexts/LoginContext';

interface IUser {
  id?: string;
  name: string;
  email: string;
}

function UserList() {
  const { isLoggedIn, token } = useContext(LoginContext);
  const [userList, setUserList] = useState<IUser[]>([]);
  const [errorMessage, setErrorMessage] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    async function fetchUsers() {
      try {
        const response = await axios.get('/api/users/all', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        const users: IUser[] = response.data.users ?? response.data;
        setUserList(users);
        setErrorMessage('');
      } catch (error) {
        setUserList([]);

        if (!isLoggedIn) {
          navigate('/login');
        } else {
          setErrorMessage('Impossible de récupérer les utilisateurs.');
        }
      }
    }

    if (isLoggedIn && token) {
      fetchUsers();
    }
  }, [isLoggedIn, token, navigate]);

  return (
    <div className="space-y-6">
      {errorMessage && (
        <div className="text-center text-red-600">{errorMessage}</div>
      )}

      {!userList.length && !errorMessage && (
        <div className="text-center text-gray-600">
          Aucun utilisateur à afficher pour le moment.
        </div>
      )}

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {userList.map((user) => (
          <article
            key={user.id ?? user.email}
            className="max-w-sm mx-auto bg-white shadow-lg rounded-lg overflow-hidden"
          >
            <div className="px-6 py-4">
              <h2 className="font-bold text-xl mb-2">{user.name}</h2>
              <p className="text-gray-700 text-base">{user.email}</p>
            </div>
          </article>
        ))}
      </div>
    </div>
  );
}

export default UserList;
