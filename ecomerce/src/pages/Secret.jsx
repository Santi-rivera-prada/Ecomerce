import React, { useState, useEffect } from 'react'
import { useAuthContext } from '@/hooks/useAuthContext'
import { getSingleUserService } from '@/services/userServices'

const Secret = () => {
  const { userPayload } = useAuthContext()
  const [cart, setCart] = useState([])
  const [availableProducts] = useState([
    'Producto 1',
    'Producto 2',
    'Producto 3'
  ])
  const [userName, setUserName] = useState('')

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await getSingleUserService(userPayload.id)
        if (response.status === 200) {
          setUserName(response.data.name)
        }
      } catch (error) {
        console.error('Ocurrió un error en Secret', error.message)
      }
    }
    fetchUserData()
  }, [userPayload.id])

  const addToCart = (product) => {
    setCart([...cart, product])
  }

  const removeFromCart = (product) => {
    const updatedCart = cart.filter((item) => item !== product)
    setCart(updatedCart)
  }

  const sellProduct = (product) => {
    // Lógica para vender un producto (solo para ADMIN)
  }

  const isAdmin = userPayload?.role === 'ADMIN'

  return (
    <div className='container mt-5' style={{ display: 'grid', justifyContent: 'center' }}>
      <h1>Secret Page</h1>
      {isAdmin ? <h2>Hello ADMIN</h2> : <h2>Hello CUSTOMER</h2>}
      {userName && <h3>Welcome, {userName}!</h3>}
      {isAdmin && (
        <div>
          <h3>Admin: Add and Sell Products</h3>
          <ul>
            {availableProducts.map((product, index) => (
              <li key={index}>
                {product}{' '}
                <button className='btn btn-primary' onClick={() => sellProduct(product)}>
                  Sell
                </button>
              </li>
            ))}
          </ul>
        </div>
      )}
      {!isAdmin && (
        <div>
          <h3>Shopping Cart</h3>
          <ul>
            {cart.map((product, index) => (
              <li key={index}>
                {product}{' '}
                <button className='btn btn-danger' onClick={() => removeFromCart(product)}>
                  Remove
                </button>
              </li>
            ))}
          </ul>
          <h3>Available Products</h3>
          <ul>
            {availableProducts.map((product, index) => (
              <li key={index}>
                {product}{' '}
                <button className='btn btn-success' onClick={() => addToCart(product)}>
                  Add to Cart
                </button>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  )
}

export default Secret
