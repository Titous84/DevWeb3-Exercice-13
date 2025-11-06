import { FormEvent, useContext, useEffect, useState } from 'react';
import { LoginContext } from '../../contexts/LoginContext';
import { useNavigate } from 'react-router-dom';

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [erreur, setErreur] = useState('');
  const navigate = useNavigate();
  const { login, isLoggedIn } = useContext(LoginContext);

  async function performLogin(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setErreur('');

    try {
      await login(email, password);
    } catch (error) {
      setErreur("Nom d'utilisateur ou mot de passe invalide");
    }
  }

  useEffect(() => {
    if (isLoggedIn) {
      navigate('/');
    }
  }, [isLoggedIn, navigate]);

  return (
    <div className="bg-gray-100 flex items-center justify-center min-h-screen p-4">
      <div className="flex flex-col md:flex-row bg-white rounded-2xl shadow-2xl max-w-4xl w-full">
        <div className="md:w-1/2 p-12 flex items-center justify-center">
          <img
            src="/catlogin.svg"
            alt="Le chat valide ton login"
            className="max-w-xs md:max-w-sm"
          />
        </div>

        <div className="md:w-1/2 p-12">
          <h2 className="text-3xl font-bold text-gray-800 mb-4">Bienvenue !</h2>
          <p className="text-gray-600 mb-8">Connectez-vous pour continuer.</p>

          <form onSubmit={performLogin}>
            <div className="mb-4">
              <label className="block text-gray-700 text-sm font-bold mb-2">
                Adresse e-mail
              </label>
              <input
                type="email"
                id="email"
                name="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="shadow-sm appearance-none border rounded-lg w-full py-3 px-4 text-gray-700 leading-tight focus:outline-none focus:ring-2 focus:ring-purple-400 focus:border-transparent transition duration-300 ease-in-out"
              />
            </div>

            <div className="mb-6">
              <label className="block text-gray-700 text-sm font-bold mb-2">
                Mot de passe
              </label>
              <input
                type="password"
                id="password"
                name="password"
                value={password}
                placeholder="******************"
                onChange={(e) => setPassword(e.target.value)}
                required
                className="shadow-sm appearance-none border rounded-lg w-full py-3 px-4 text-gray-700 mb-3 leading-tight focus:outline-none focus:ring-2 focus:ring-purple-400 focus:border-transparent transition duration-300 ease-in-out"
              />
            </div>

            <div className="mb-6 min-h-[24px]">
              <p className="block text-red-600">{erreur}</p>
            </div>

            <div className="flex items-center justify-between">
              <button
                type="submit"
                className="bg-purple-500 hover:bg-purple-700 text-white font-bold py-3 px-6 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2 transition duration-300 ease-in-out transform hover:-translate-y-1"
              >
                Se connecter
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Login;
