import React, { useState, useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import { Button, Modal, Alert } from 'react-bootstrap';

const EcomerceDetail = () => {
  const [item, setItem] = useState(null);
  const [showCartAlert, setShowCartAlert] = useState(false);
  const [showCheckoutModal, setShowCheckoutModal] = useState(false);
  const [paymentMethod, setPaymentMethod] = useState(''); // Método de pago seleccionado
  const [paymentSuccess, setPaymentSuccess] = useState(false);
  const [cardNumber, setCardNumber] = useState(''); // Número de tarjeta de crédito
  const [paypalEmail, setPaypalEmail] = useState(''); // Email de PayPal
  const [bankAccount, setBankAccount] = useState(''); // Cuenta bancaria
  const [cashAmount, setCashAmount] = useState(''); // Cantidad en efectivo
  const [bitcoinAddress, setBitcoinAddress] = useState(''); // Dirección de Bitcoin

  const { id } = useParams(); // Obtén el ID de los parámetros de la URL

  useEffect(() => {
    // Simulación de carga de detalles del producto desde la API
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

  const handlePayment = () => {
    if (!paymentMethod) {
      alert('Por favor, selecciona un método de pago.');
      return;
    }

    switch (paymentMethod) {
      case 'Tarjeta de crédito':
        if (!cardNumber) {
          alert('Por favor, ingresa el número de tarjeta de crédito.');
          return;
        }
        break;
      case 'PayPal':
        if (!paypalEmail) {
          alert('Por favor, ingresa tu email de PayPal.');
          return;
        }
        break;
      case 'Transferencia bancaria':
        if (!bankAccount) {
          alert('Por favor, ingresa tu número de cuenta bancaria.');
          return;
        }
        break;
      case 'Efectivo':
        if (!cashAmount) {
          alert('Por favor, ingresa la cantidad en efectivo.');
          return;
        }
        break;
      case 'Bitcoin':
        if (!bitcoinAddress) {
          alert('Por favor, ingresa la dirección de Bitcoin.');
          return;
        }
        break;
      default:
        break;
    }

    // Realiza la lógica de pago aquí
    // Simulamos un éxito de pago después de un breve retraso
    setTimeout(() => {
      setPaymentSuccess(true);
    }, 2000);
  };

  const resetPayment = () => {
    setPaymentMethod('');
    setPaymentSuccess(false);
    setCardNumber('');
    setPaypalEmail('');
    setBankAccount('');
    setCashAmount('');
    setBitcoinAddress('');
    setShowCheckoutModal(false);
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
          <Modal.Title>Carrito</Modal.Title>
        </Modal.Header>
        <Modal.Body>¡Dirígete al carrito y selecciona tu producto a comprar!</Modal.Body>
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
      <Modal show={showCheckoutModal} onHide={() => resetPayment()}>
        <Modal.Header closeButton>
          <Modal.Title>Comprar Producto</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <h4>Selecciona un método de pago:</h4>
          <div>
            <select onChange={(e) => setPaymentMethod(e.target.value)}>
              <option value="">Selecciona un método de pago</option>
              <option value="Tarjeta de crédito">Tarjeta de crédito</option>
              <option value="PayPal">PayPal</option>
              <option value="Transferencia bancaria">Transferencia bancaria</option>
              <option value="Efectivo">Efectivo</option>
              <option value="Bitcoin">Bitcoin</option>
            </select>
          </div>
          {/* Campos para ingresar información adicional según el método de pago */}
          {paymentMethod === 'Tarjeta de crédito' && (
            <div>
              <label>Número de Tarjeta de Crédito:</label>
              <input
                type="text"
                value={cardNumber}
                onChange={(e) => setCardNumber(e.target.value)}
              />
            </div>
          )}
          {paymentMethod === 'PayPal' && (
            <div>
              <label>Email de PayPal:</label>
              <input
                type="text"
                value={paypalEmail}
                onChange={(e) => setPaypalEmail(e.target.value)}
              />
            </div>
          )}
          {paymentMethod === 'Transferencia bancaria' && (
            <div>
              <label>Número de Cuenta Bancaria:</label>
              <input
                type="text"
                value={bankAccount}
                onChange={(e) => setBankAccount(e.target.value)}
              />
            </div>
          )}
          {paymentMethod === 'Efectivo' && (
            <div>
              <label>Cantidad en Efectivo:</label>
              <input
                type="text"
                value={cashAmount}
                onChange={(e) => setCashAmount(e.target.value)}
              />
            </div>
          )}
          {paymentMethod === 'Bitcoin' && (
            <div>
              <label>Dirección de Bitcoin:</label>
              <input
                type="text"
                value={bitcoinAddress}
                onChange={(e) => setBitcoinAddress(e.target.value)}
              />
            </div>
          )}
          <Button
            variant='success'
            style={{ margin: '10px', cursor: 'pointer' }}
            onClick={handlePayment}
          >
            Pagar
          </Button>
          {paymentSuccess && (
            <Alert variant="success">¡Pago realizado con éxito!</Alert>
          )}
        </Modal.Body>
        <Modal.Footer>
          <Button variant='success' onClick={() => resetPayment()}>
            Cerrar
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default EcomerceDetail;
