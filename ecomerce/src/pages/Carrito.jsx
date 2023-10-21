import React, { useState, useEffect } from 'react';
import './Carrito.css';

const Carrito = () => {
  const [productos, setProductos] = useState([]);
  const [carrito, setCarrito] = useState([]);
  const [total, setTotal] = useState(0);
  const [selectedPaymentMethod, setSelectedPaymentMethod] = useState(null);
  const [paymentInfo, setPaymentInfo] = useState({ cardNumber: '', paypalEmail: '' });
  const [paymentSuccess, setPaymentSuccess] = useState(false);

  // Función para obtener productos de la API
  const obtenerProductos = async () => {
    try {
      const response = await fetch('https://ecomerce-i14z.onrender.com/items');
      if (response.status === 200) {
        const data = await response.json();
        setProductos(data);
      } else {
        console.error('Error al obtener productos de la API');
      }
    } catch (error) {
      console.error('Ocurrió un error:', error);
    }
  };

  useEffect(() => {
    obtenerProductos();
  }, []);

  const agregarAlCarrito = (producto) => {
    const nuevoCarrito = [...carrito, producto];
    const nuevoTotal = total + producto.price; // Asumiendo que el precio está en la propiedad "price"
    setCarrito(nuevoCarrito);
    setTotal(nuevoTotal);
  };

  const eliminarDelCarrito = (producto) => {
    const nuevoCarrito = carrito.filter((item) => item.id !== producto.id);
    const nuevoTotal = total - producto.price;
    setCarrito(nuevoCarrito);
    setTotal(nuevoTotal);
  };

  const cancelarCompra = () => {
    setCarrito([]);
    setTotal(0);
    setSelectedPaymentMethod(null);
    setPaymentInfo({ cardNumber: '', paypalEmail: '' });
    setPaymentSuccess(false);
  };

  const paymentMethods = [
    'Tarjeta de crédito',
    'PayPal',
    'Transferencia bancaria',
    'Efectivo',
    'Bitcoin',
  ];

  const realizarPago = async () => {
    if (!selectedPaymentMethod) {
      alert('Por favor, selecciona un método de pago.');
      return;
    }

    if (
      (selectedPaymentMethod === 'Tarjeta de crédito' && paymentInfo.cardNumber === '') ||
      (selectedPaymentMethod === 'PayPal' && !paymentInfo.paypalEmail)
      // Agrega validaciones para otros métodos de pago según sea necesario
    ) {
      alert('Por favor, completa la información de pago.');
      return;
    }

    // Realiza la lógica de pago aquí, puedes llamar a una API para procesar el pago
    // Simulación de éxito de pago después de un breve retraso
    setTimeout(() => {
      setPaymentSuccess(true);
    }, 2000);
  };

  return (
    <div className="container">
      <h1 className="text-center" style={{color:'green'}}>Carrito de Compras</h1>
      <div className="row">
        <div className="col-md-6">
          <h2>Productos Disponibles:</h2>
          <ul>
            {productos.map((producto) => (
              <li key={producto.id} className="product-list-item">
                {producto.product_name}
                <h3 style={{color: 'red'}}>$</h3>
                {producto.price}
                <img src={producto.image} alt={producto.name} className="product-image" />
                {carrito.find((item) => item.id === producto.id) ? (
                  <button onClick={() => eliminarDelCarrito(producto)}>Eliminar del carrito</button>
                ) : (
                  <button onClick={() => agregarAlCarrito(producto)}>Agregar al carrito</button>
                )}
              </li>
            ))}
          </ul>
        </div>
        <div className="col-md-6">
          <h2>Carrito:</h2>
          <ul>
            {carrito.map((producto) => (
              <li key={producto.id} className="cart-list-item">
                {producto.name}
                <img src={producto.image} alt={producto.name} className="product-image" />
                <button onClick={() => eliminarDelCarrito(producto)}>Eliminar del carrito</button>
              </li>
            ))}
          </ul>
          <p>Total: ${total}</p>
          <div>
            <h2>Selecciona un método de pago:</h2>
            <select onChange={(e) => setSelectedPaymentMethod(e.target.value)}>
              <option value="">Selecciona un método de pago</option>
              {paymentMethods.map((method, index) => (
                <option key={index} value={method}>
                  {method}
                </option>
              ))}
            </select>
            {selectedPaymentMethod === 'Tarjeta de crédito' && (
              <input
                type="text"
                placeholder="Número de tarjeta"
                value={paymentInfo.cardNumber}
                onChange={(e) => setPaymentInfo({ ...paymentInfo, cardNumber: e.target.value })}
              />
            )}
            {selectedPaymentMethod === 'PayPal' && (
              <input
                type="text"
                placeholder="Correo de PayPal"
                value={paymentInfo.paypalEmail}
                onChange={(e) => setPaymentInfo({ ...paymentInfo, paypalEmail: e.target.value })}
              />
            )}
            <button onClick={realizarPago}>Pagar</button>
          </div>
          {paymentSuccess && (
            <div>
              <p>Pago realizado con éxito.</p>
              <button onClick={cancelarCompra}>Cerrar</button>
            </div>
          )}
          <div>
            <button onClick={cancelarCompra}>Cancelar Compra</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Carrito;
