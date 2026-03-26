import { AppProvider } from './context/AppContext';
import AppInner from './components/AppInner';
import './App.css';

function App() {
  return (
    <AppProvider>
      <AppInner />
    </AppProvider>
  );
}

export default App;
