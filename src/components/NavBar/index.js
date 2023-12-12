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
            <AiOutlineShoppingCart size={28} className="cart-icon" />
            <p className="cart-orders">{cartItems}</p>
          </div>
        </div>
      </div>

      {/* For Mobile View */}
      <div className="nav-mobile-container">
        <h1 className="web-logo-heading">UNI Resto Cafe</h1>
        <div className="cart-container">
          <div className="cart-icon-container">
            <AiOutlineShoppingCart size={20} className="cart-icon" />
            <p className="cart-orders">{cartItems}</p>
          </div>
        </div>
      </div>
    </nav>
  )
}

export default NavBar
