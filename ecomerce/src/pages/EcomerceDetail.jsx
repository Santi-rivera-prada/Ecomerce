import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useParams } from 'react-router-dom';
import { Button, Modal } from 'react-bootstrap';

const EcomerceDetail = () => {
  const [item, setItem] = useState(null);
  const [showCartAlert, setShowCartAlert] = useState(false);
  const [showCheckoutModal, setShowCheckoutModal] = useState(false);
  const { id } = useParams();

  useEffect(() => {
    fetch(`https://ecomerce-i14z.onrender.com/items/${id}`)
      .then((response) => response.json())
      .then((data) => setItem(data))
      .catch((error) => console.log(error));
  }, [id]);

  const handleCartClick = () => {
    setShowCartAlert(true);
  };

  const handleCheckoutClick = () => {
    setShowCheckoutModal(true);
  };

  if (!item) {
    return <div style={{ display: 'grid', justifyContent: 'center', color: 'blue', fontSize: 'xx-large' }}>Loading...</div>;
  }

  return (
    <div className='container mt-5'>
      <div className='row'>
        <div className='col-md-4'>
          <img
            src={item.image}
            alt={item.product_name}
            className='img-fluid'
            style={{ boxShadow: '0 0 20px rgba(55, 255, 25, 0.5)', borderRadius: '10px' }}
          />
        </div>
        <div className='col-md-8'>
          <h3>{item.product_name}</h3>
          <p>{item.description}</p>
          <p>Category: {item.category}</p>
          <p>Brand: {item.brand}</p>
          <p>Rating: {item.rating} stars</p>
          <p style={{ color: 'red' }}>Price: ${item.price}</p>
          <Button variant='success' style={{ margin: '10px', cursor: 'pointer' }} onClick={handleCheckoutClick}>
            Comprar
          </Button>
          <Button variant='success' style={{ margin: '10px', cursor: 'pointer' }} onClick={handleCartClick}>
            Carrito
          </Button>
        </div>
      </div>

      {/* Modal para el carrito */}
      <Modal show={showCartAlert} onHide={() => setShowCartAlert(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Producto Agregado al Carrito</Modal.Title>
        </Modal.Header>
        <Modal.Body>¡El producto se ha agregado correctamente a tu carrito!</Modal.Body>
        <Modal.Footer>
          <Button variant='success' onClick={() => setShowCartAlert(false)}>
            Cerrar
          </Button>
          <Link to="/products">
                <Button variant="primary">Ver Mi Carrito</Button>
              </Link>
        </Modal.Footer>
      </Modal>

      {/* Modal para la página de compra */}
      <Modal show={showCheckoutModal} onHide={() => setShowCheckoutModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Comprar Producto</Modal.Title>
        </Modal.Header>
        <Modal.Body>Contenido de la página de compra...</Modal.Body>
        <Modal.Footer>
          <Button variant='success' onClick={() => setShowCheckoutModal(false)}>
            Cerrar
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default EcomerceDetail;
