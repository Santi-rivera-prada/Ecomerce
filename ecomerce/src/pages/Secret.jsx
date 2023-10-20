import React, { useState, useEffect } from 'react';
import { useAuthContext } from '@/hooks/useAuthContext';
import { getSingleUserService } from '@/services/userServices';

const Secret = () => {
  const { userPayload } = useAuthContext();
  const [cart, setCart] = useState([]);
  const [products] = useState([
    'Producto 1',
    'Producto 2',
    'Producto 3'
  ]);
  const [userName, setUserName] = useState('');

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await getSingleUserService(userPayload.id);
        if (response.status === 200) {
          setUserName(response.data.name);
        }
      } catch (error) {
        console.error('Ocurrió un error en Secret', error.message);
      }
    };
    fetchUserData();
  }, [userPayload.id]);

  const addToCart = (product) => {
    setCart([...cart, product]);
  };

  const removeFromCart = (product) => {
    const updatedCart = cart.filter((item) => item !== product);
    setCart(updatedCart);
  };

  const sellProduct = (product) => {
    // Lógica para vender un producto (solo para ADMIN)
  };

  const isAdmin = userPayload?.role === 'ADMIN';

  return (
    <div className='container mt-5' style={{ display: 'grid', justifyContent: 'center', textAlign: 'center', margin: 'none', backgroundColor: 'black', color: 'white' }}>
      <h1>Secret Page</h1>
      {isAdmin ? <h2>Hello ADMIN</h2> : <h2>Hello CUSTOMER</h2>}
      {userName ? <h3>Welcome!</h3> : <h1>holiiiiiiiiii</h1>}
      <h1 style={{ color: 'black' }}>Hola, este apartado por el momento no está terminado, no por falta de tiempo, sino más por parte de accesibilidad, ya que sinceramente hay cosas que todavía no he podido dominar y es algo no muy bueno, pero trato de seguir adelante y aprender poco a poco más y más. Gracias por su atención 😁🙂🙂</h1>
    </div>
  );
};

export default Secret;
