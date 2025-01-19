import ReactDOM from 'react-dom/client';
import App from './App';
import './index.css'; // Import Tailwind CSS
import AuthProvider from './context/AuthProvider.jsx';
import { BrowserRouter } from 'react-router-dom';
import SocketProvider from './context/SocketContex.jsx';

ReactDOM.createRoot(document.getElementById('root')).render(
 
 <BrowserRouter>
 <AuthProvider>
  <SocketProvider>
    <App />
  </SocketProvider>
  </AuthProvider>
 </BrowserRouter>
);
