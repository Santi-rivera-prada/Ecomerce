import { AuthProvider } from './context/AuthContext';
import { BrowserRouter } from 'react-router-dom';
import Header from '@/components/Header';
import RoutesIndex from './routes/RoutesIndex';
import Footer from './footer/Footer'; // Asegúrate de proporcionar la ubicación correcta para el archivo del Footer.
import './App.css';

function App() {
  return (
    <>
      <AuthProvider>
        <BrowserRouter>
          <Header />
          <RoutesIndex />
          <Footer /> {/* Agregamos el componente Footer aquí */}
        </BrowserRouter>
      </AuthProvider>
    </>
  );
}

export default App;
