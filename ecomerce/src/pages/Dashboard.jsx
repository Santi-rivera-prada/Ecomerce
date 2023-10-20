import React, { useState, useEffect } from 'react';
import { useAuthContext } from '@/hooks/useAuthContext';
import { Card, Button } from 'react-bootstrap';


const Dashboard = () => {
  const { userPayload } = useAuthContext();
  const [userData, setUserData] = useState({});
  const [showUploadedData, setShowUploadedData] = useState(false);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await fetch(`https://ecomerce-i14z.onrender.com/users/${userPayload.id}`);
        if (response.status === 200) {
          const data = await response.json();
          setUserData(data);
        } else {
          console.error('Error al obtener datos del usuario');
        }
      } catch (error) {
        console.error('Ocurrió un error en Dashboard:', error.message);
      }
    };
    fetchUserData();
  }, [userPayload.id]);

  return (
    <div className="container mt-5">
      <h1 className="mb-4 text-center">¡Bienvenido al Dashboard!</h1>
      <h2 className="mb-4 text-center text-muted">Esperamos que tengas un gran día.</h2>
      <Card style={{ maxWidth: '400px', margin: '0 auto', boxShadow: '0 4px 6px 0 rgba(0, 0, 0, 0.1)' }}>
        <Card.Header>Información de la Cuenta</Card.Header>
        <Card.Body>
          {showUploadedData ? (
            <>
              <Card.Text>
                <strong>Nombre:</strong> {userData.name}
              </Card.Text>
              <Card.Text>
                <strong>Género:</strong> {userData.gender}
              </Card.Text>
              <Card.Text>
                <strong>Correo Electrónico:</strong> {userData.email}
              </Card.Text>
              {userData.first_name && <h2>{userData.first_name}</h2>}
              {userData.last_name && <h2>{userData.last_name}</h2>}
            </>
          ) : (
            <Card.Text className='text-center text-muted'>
              Haga clic en "Mostrar Información" para ver los detalles de la cuenta.
            </Card.Text>
          )}
        </Card.Body>
        <Card.Footer>
          <Button
            variant='primary'
            onClick={() => setShowUploadedData(!showUploadedData)}
          >
            {showUploadedData ? 'Ocultar Información' : 'Mostrar Información'}
          </Button>
        </Card.Footer>
      </Card>
    </div>
  );
};

export default Dashboard;
