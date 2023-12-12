import {useState, useContext} from 'react'
import './index.css'
import CartContext from '../../context/CartContext'

const EachMenu = props => {
  const {eachItemDetails} = props
  const {setCartItems} = useContext(CartContext)

  const [orderNo, setOrderNo] = useState(0)

  const {
    dishAvailability,
    dishCalories,
    dishCurrency,
    dishDescription,
    dishId,
    dishImage,
    dishName,
    dishPrice,
    dishType,
    addOnCat,
  } = eachItemDetails

  const handleMinusSign = () => {
    setOrderNo(prevOrderNo => (prevOrderNo !== 0 ? prevOrderNo - 1 : 0))
    if (orderNo !== 0) {
      setCartItems(prevCartItems => prevCartItems - 1)
    }
  }

  const handlePlusSign = () => {
    setOrderNo(prevOrderNo => prevOrderNo + 1)
    setCartItems(prevCartItems => prevCartItems + 1)
  }

  const dishTypeImg =
    dishType === 1
      ? 'https://img.icons8.com/?size=48&id=61082&format=png'
      : `https://img.icons8.com/?size=48&id=61083&format=png`

  return (
    <li className="eachItem">
      <div className="dish-type-and-dish-details">
        <img src={dishTypeImg} alt={dishName} className="dish-type-img" />
        <div className="dish-details-container">
          <h1 className="dish-name">{dishName}</h1>
          <p className="sar-val">
            {dishCurrency} {dishPrice}
          </p>
          <p className="dish-desc">{dishDescription}</p>
          {dishAvailability ? (
            <div className="add-on-container">
              <button
                type="button"
                className="add-sub-btn"
                onClick={() => handleMinusSign()}
              >
                -
              </button>
              <p className="number-dish">{orderNo}</p>
              <button
                type="button"
                className="add-sub-btn"
                onClick={() => handlePlusSign()}
              >
                +
              </button>
            </div>
          ) : (
            <p className="not-available-error">Not available</p>
          )}
          {addOnCat.length !== 0 && (
            <p className="custom-avail">Customizations available</p>
          )}
        </div>
      </div>
      <div className="calories-and-image">
        <div className="dish-calories-section">
          <p className="calories">{dishCalories} calories</p>
        </div>
        <div>
          <img src={dishImage} alt={dishId} className="dish-img" />
        </div>
      </div>
    </li>
  )
}

export default EachMenu
