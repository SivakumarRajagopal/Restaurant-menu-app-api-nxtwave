import {useContext} from 'react'

import {AiOutlineShoppingCart} from 'react-icons/ai'

import CartContext from '../../context/CartContext'

import './index.css'

const NavBar = props => {
  const {cartItems} = useContext(CartContext)
  const {restaurantName} = props

  return (
    <nav className="navbar">
      <div className="nav-container">
        <h1 className="web-logo-heading">{restaurantName}</h1>
        <div className="cart-container">
          <p className="my-order-menu">My Orders</p>
          <div className="cart-icon-container">
            <AiOutlineShoppingCart size={24} className="cart-icon" />
            <p className="cart-orders">{cartItems}</p>
          </div>
        </div>
      </div>
    </nav>
  )
}

export default NavBar
