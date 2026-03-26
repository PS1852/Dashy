import { account } from '../lib/appwrite';
import { LogIn } from 'lucide-react';
import { OAuthProvider } from 'appwrite';

export default function Login() {
  const handleGoogleLogin = () => {
    account.createOAuth2Session(
      OAuthProvider.Google,
      window.location.origin, // success
      window.location.origin  // failure
    );
  };

  return (
    <div className="login-container">
      <div className="login-card">
        <div className="logo-wrapper">
          <img src="/logo.png" alt="Dashy Logo" className="login-logo" />
        </div>
        <h1>Dashy</h1>
        <p className="subtitle">Your thoughts, organized.</p>
        <button onClick={handleGoogleLogin} className="google-btn">
          <LogIn size={20} />
          Continue with Google
        </button>
      </div>
    </div>
  );
}
