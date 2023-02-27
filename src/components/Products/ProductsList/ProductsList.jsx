import React, { useState } from 'react'
import classes from './ProductsList.module.scss'
import {BsFillGridFill} from 'react-icons/bs'
import {FaListAlt} from 'react-icons/fa'


const ProductsList = ({products}) => {
  const [grid, setGrid] = useState(true)

  return (
    <div className={classes.product_list}>
      <div className={classes.top} id='product'>
        <div className={classes.icons}>
          <BsFillGridFill size={22} onClick={() => setGrid(true)}/>
          <FaListAlt size={22} onClick={() => setGrid(false)}/>
          <p><b>{`${products.length} `}</b> Товаров найдено.</p>
        </div>
        {/* SEARCH */}
        <div>
          <p>Search</p>
        </div>
        {/* SORT PRODUCT */}
        <div className={classes.sort}>
          <label>Сортировать по:</label>
          <select>
            <option value='latest'>Новинки</option>
            <option value='lowest-price'>Низкая цена</option>
            <option value='highest-price'>Высокая цена</option>
            <option value='a-z'>A-Z</option>
            <option value='z-a'>Z-A</option>
          </select>
  </div>
      </div>
    </div>
  )
}

export default ProductsList
