import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Button, Modal } from 'react-bootstrap';

const Home = () => {
  const [items, setItems] = useState([]);
  const [filteredItems, setFilteredItems] = useState([]);
  const [categories, setCategories] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');
  const [showInfoModal, setShowInfoModal] = useState(false);
  const [showCartModal, setShowCartModal] = useState(false);

  const [selectedItem, setSelectedItem] = useState(null);

  useEffect(() => {
    fetch('https://ecomerce-i14z.onrender.com/items')
      .then((response) => response.json())
      .then((data) => {
        setItems(data);
        setFilteredItems(data);
        const uniqueCategories = [...new Set(data.map((item) => item.category))];
        setCategories(uniqueCategories);
      })
      .catch((error) => console.log(error));
  }, []);

  useEffect(() => {
    const filtered = items.filter((item) => {
      const matchesQuery = item.product_name.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesCategory = selectedCategory === '' || item.category === selectedCategory;
      return matchesQuery && matchesCategory;
    });
    setFilteredItems(filtered);
  }, [searchQuery, selectedCategory, items]);

  const handleInfoClick = (item) => {
    setSelectedItem(item);
    setShowInfoModal(true);
  };

  const handleCartClick = (item) => {
    setSelectedItem(item);
    setShowCartModal(true);
  };

  return (
    <div className="container mt-5">
      <div className="row mb-4">
        <div className="col-md-6">
          <input
            type="text"
            className="form-control"
            placeholder="Buscar productos"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
        <div className="col-md-6">
          <select
            className="form-control"
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
          >
            <option value="">Todas las categorías</option>
            {categories.map((category, index) => (
              <option key={index} value={category}>
                {category}
              </option>
            ))}
          </select>
        </div>
      </div>
      <div className="row">
        {filteredItems.map((item, index) => (
          <div className='col-md-4 mb-5' key={index} style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, 90%)'}}>
            <div className="card">
              <img src={item.image} className="card-img-top" alt={item.product_name} />
              <div className="card-body">
                <h5 className="card-title">{item.product_name}</h5>
                <p className="card-text">{item.description}</p>
                <p className="card-text text-danger">Price: ${item.price}</p>
                <Link to={`/item/${item.id}`} style={{ textDecoration: 'none' }}>
                  <Button style={{ margin: '10px', cursor: 'pointer' }}
                    variant="success"
                    className="mr-2"
                    onClick={() => handleInfoClick(item)}
                  >
                    Saber más
                  </Button>
                </Link>
                <Button style={{ margin: '10px', cursor: 'pointer' }}
                  variant="success"
                  onClick={() => handleCartClick(item)}
                >
                  Carrito
                </Button>
              </div>
            </div>
          </div>
        ))}
      </div>
      {/* Modal para el carrito */}
      <Modal show={showCartModal} onHide={() => setShowCartModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Producto Agregado al Carrito</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {selectedItem && (
            <div>
              <p>{selectedItem.product_name} se ha agregado correctamente a tu carrito.</p>
              <Link to="/products">
                <Button variant="primary">Ver Mi Carrito</Button>
              </Link>
            </div>
          )}
        </Modal.Body>
        <Modal.Footer>
          <Button variant="success" onClick={() => setShowCartModal(false)}>
            Cerrar
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default Home;
