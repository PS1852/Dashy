import { account } from '../lib/appwrite';
import { LogIn } from 'lucide-react';
import { OAuthProvider } from 'appwrite';
import logo from '/logo.png';

export default function Login() {
  const handleGoogleLogin = () => {
    // Dynamic redirect for both localhost and GitHub Pages
    const redirectUrl = window.location.origin + 
      (window.location.hostname === 'localhost' ? '/' : '/Dashy/');

    account.createOAuth2Session(
      OAuthProvider.Google,
      redirectUrl, // success
      redirectUrl  // failure
    );
  };

  return (
    <div className="login-container">
      <div className="login-card">
        <div className="logo-wrapper">
          <img src={logo} alt="Dashy Logo" className="login-logo" />
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
