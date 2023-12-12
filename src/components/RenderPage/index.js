import {useState} from 'react'
import './index.css'
import EachMenu from '../EachMenu'

const RenderPage = props => {
  const {formattedData} = props

  const [activeTabs, setActiveTab] = useState(formattedData[0].menuCategoryId)

  const renderMenuBar = () => (
    <ul className="menu-tabs">
      {formattedData.map(eachItem => (
        <li
          className={
            eachItem.menuCategoryId === activeTabs ? `tabs active` : `tabs`
          }
          key={eachItem.menuCategoryId}
        >
          <button
            type="submit"
            onClick={() => setActiveTab(eachItem.menuCategoryId)}
            className={
              eachItem.menuCategoryId === activeTabs
                ? `tab-btn active`
                : `tab-btn`
            }
          >
            {eachItem.menuCategory}
          </button>
        </li>
      ))}
    </ul>
  )

  const renderMenuItem = () => {
    const filteredData = formattedData.filter(
      eachItem => eachItem.menuCategoryId === activeTabs,
    )

    const dishesList = filteredData[0].categoryDishes

    return (
      <div className="menu-item-container">
        <ul className="menu-item-card-container">
          {dishesList.map(eachItem => (
            <EachMenu key={eachItem.dishId} eachItemDetails={eachItem} />
          ))}
        </ul>
      </div>
    )
  }

  return (
    <div>
      {renderMenuBar()}
      {renderMenuItem()}
    </div>
  )
}

export default RenderPage
