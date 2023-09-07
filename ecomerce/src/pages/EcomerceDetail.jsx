import React, { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'

const EcomerceDetail = () => {
  const [item, setItem] = useState(null)
  const { id } = useParams()

  useEffect(() => {
    fetch(`https://ecomerce-i14z.onrender.com/items/${id}`)
      .then(response => response.json())
      .then(data => setItem(data))
      .catch(error => console.log(error))
  }, [id])

  if (!item) {
    return <div style={{ display: 'grid', justifyContent: 'center', color: 'blue', fontSize: 'xx-large' }}>Loading...</div>
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
          <p style={{ color: 'red' }}>Price: ${item.price}</p>
          <button className='btn btn-success' style={{ margin: '10px', cursor: 'pointer' }}>Comprar</button>
          <button className='btn btn-success' style={{ margin: '10px', cursor: 'pointer' }}>Carrito</button>
        </div>
      </div>
    </div>
  )
}

export default EcomerceDetail
