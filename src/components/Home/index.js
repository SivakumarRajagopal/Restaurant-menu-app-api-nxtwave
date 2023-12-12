import {useState, useEffect} from 'react'

import Loader from 'react-loader-spinner'
import './index.css'
import NavBar from '../NavBar'
import CartContext from '../../context/CartContext'

import RenderPage from '../RenderPage'
// import EachMenu from '../EachMenu'

const apiStatusConstant = {
  initial: 'INITIAL',
  success: 'SUCCESS',
  failure: 'FAILURE',
  inProgress: 'IN_PROGRESS',
}

const Home = () => {
  const [cartItems, setCartItems] = useState(0)

  const [apiResponse, setApiResponse] = useState({
    status: apiStatusConstant.initial,
    data: null,
    errorMsg: null,
  })

  useEffect(() => {
    const getApiResponse = async () => {
      setApiResponse(prevApiResponse => ({
        ...prevApiResponse,
        status: apiStatusConstant.inProgress,
      }))

      const url = `https://run.mocky.io/v3/77a7e71b-804a-4fbd-822c-3e365d3482cc`
      const options = {
        method: 'GET',
      }
      const response = await fetch(url, options)
      const responseData = await response.json()
      console.log(responseData)

      if (response.ok) {
        setApiResponse(prevApiResponse => ({
          ...prevApiResponse,
          data: responseData,
          status: apiStatusConstant.success,
        }))
      } else {
        setApiResponse(prevApiResponse => ({
          ...prevApiResponse,
          status: apiStatusConstant.failure,
          errorMsg: responseData.errorMsg,
        }))
      }
    }

    getApiResponse()
  }, [])

  const renderSuccessView = () => {
    const {data} = apiResponse

    const restaurantName = data[0].restaurant_name
    console.log(restaurantName)
    const tableMenuData = data[0].table_menu_list
    const formattedData = tableMenuData.map(eachItem => ({
      menuCategory: eachItem.menu_category,
      menuCategoryId: eachItem.menu_category_id,
      categoryDishes: eachItem.category_dishes.map(eachDish => ({
        dishId: eachDish.dish_id,
        dishName: eachDish.dish_name,
        dishPrice: eachDish.dish_price,
        dishImage: eachDish.dish_image,
        dishCurrency: eachDish.dish_currency,
        dishCalories: eachDish.dish_calories,
        dishDescription: eachDish.dish_description,
        dishAvailability: eachDish.dish_Availability,
        dishType: eachDish.dish_Type,
        addOnCat: eachDish.addonCat,
      })),
    }))

    return (
      <>
        <NavBar restaurantName={restaurantName} />
        <div className="menu-category-container">
          <RenderPage formattedData={formattedData} />
        </div>
      </>
    )
  }

  const renderFailureView = () => {
    const {errorMsg} = apiResponse
    return <div className="failure-view">{errorMsg}</div>
  }
  const renderLoadingView = () => (
    <div className="loader-view">
      <Loader color="#000000" size={50} />
    </div>
  )

  const renderMenuListContainer = () => {
    const {status} = apiResponse

    switch (status) {
      case apiStatusConstant.success:
        return renderSuccessView()
      case apiStatusConstant.failure:
        return renderFailureView()
      case apiStatusConstant.inProgress:
        return renderLoadingView()

      default:
        return null
    }
  }

  return (
    <CartContext.Provider value={{cartItems, setCartItems}}>
      <div className="page-container">{renderMenuListContainer()}</div>
    </CartContext.Provider>
  )
}
export default Home
