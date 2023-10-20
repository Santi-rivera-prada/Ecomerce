import React, { useState, useEffect } from 'react';
import './Carrito.css';

const Carrito = () => {
  const [productos, setProductos] = useState([]);
  const [carrito, setCarrito] = useState([]);
  const [total, setTotal] = useState(0);
  const [selectedPaymentMethod, setSelectedPaymentMethod] = useState(null);

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

    // Realiza la lógica de pago aquí, puedes llamar a una API para procesar el pago
    // Por ejemplo:
    try {
      const response = await fetch('URL_DE_TU_API_DE_PAGO', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          products: carrito,
          total: total,
          paymentMethod: selectedPaymentMethod,
        }),
      });

      if (response.status === 200) {
        // Pago exitoso, puedes realizar acciones adicionales aquí
        alert('Pago exitoso');
        cancelarCompra();
      } else {
        // Manejar errores de pago
        alert('Error al procesar el pago');
      }
    } catch (error) {
      console.error('Ocurrió un error al procesar el pago:', error);
      alert('Error al procesar el pago');
    }
  };

  return (
    <div className="container">
      <h1 className="text-center">Carrito de Compras</h1>
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
            <button onClick={realizarPago}>Pagar</button>
          </div>
          <div>
            <button onClick={cancelarCompra}>Cancelar Compra</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Carrito;
