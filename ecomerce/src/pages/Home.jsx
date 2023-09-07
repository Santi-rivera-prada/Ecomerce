import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'

const Home = () => {
  const [, setItems] = useState([])
  const [topItems, setTopItems] = useState([])
  const [, setCurrentItemIndex] = useState(0)

  useEffect(() => {
    fetch('https://ecomerce-i14z.onrender.com/items')
      .then(response => response.json())
      .then(data => {
        setItems(data)
        setTopItems(data.slice())
      })
      .catch(error => console.log(error))
  }, [])

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentItemIndex(prevIndex => (prevIndex + 1) % topItems.length)
    }, 1000)

    return () => {
      clearInterval(timer)
    }
  }, [topItems])

  return (
    <div className='container mt-5' style={{ background: 'rgb(red)' }}>
      <div className='row'>
        {topItems.map((item, index) => (
          <div className='col-md-4 mb-5' key={index} style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, 110%)' }}>
            {/* Utilizamos el componente Link para envolver el contenido de la tarjeta */}
            <Link to={`/item/${item.id}`} style={{ textDecoration: 'none' }}>
              <div
                className='card'
                style={{
                  boxShadow: '0 0 20px rgba(0, 0, 0, 0.6)',
                  borderRadius: '10px',
                  cursor: 'pointer',
                  height: '700px',
                  width: '93.3%'
                }}
              >
                <img
                  src={item.image}
                  className='card-img-top'
                  alt={item.product_name}
                  style={{ height: '65%', width: '' }}
                />
                <div className='card-body'>
                  <h5 className='card-title'>{item.product_name}</h5>
                  <p className='card-text'>{item.description}</p>
                  <p className='card-text' style={{ color: 'red' }}>Price: ${item.price}</p>
                  <button className='btn btn-success' style={{ margin: '10px', cursor: 'pointer' }}>Saber mas!!</button>
                  <button className='btn btn-success' style={{ margin: '10px', cursor: 'pointer' }}>Carrito</button>
                </div>
              </div>
            </Link>
          </div>
        ))}
      </div>
    </div>
  )
}

export default Home
