import { useEffect, useState } from 'react';
import { account } from './lib/appwrite';
import Login from './components/Login';
import Sidebar from './components/Sidebar';
import Workspace from './components/Workspace';
import './App.css';

function App() {
  const [user, setUser] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const checkSession = async () => {
      try {
        const session = await account.get();
        setUser(session);
      } catch (err) {
        setUser(null);
      } finally {
        setLoading(false);
      }
    };
    checkSession();
  }, []);

  if (loading) return (
    <div className="loading-screen">
      <div className="spinner"></div>
      <p>Opening Dashy...</p>
    </div>
  );

  if (!user) return <Login />;

  return (
    <div className="dashy-app">
      <Sidebar user={user} />
      <Workspace />
    </div>
  );
}

export default App;
