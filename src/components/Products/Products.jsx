import React from 'react'
import classes from './Products.module.scss'
import ProductsFilter from './ProductsFilter/ProductsFilter'
import ProductsList from './ProductsList/ProductsList'
const Products = () => {
  return (
    <section>
      <div className={`container ${classes.product}`}>
        <aside className={classes.filter}>
          <ProductsFilter />
          
        </aside>
        <div className={classes.content}>
          <ProductsList/>
        </div>
      </div>
      
    </section>
  )
}

export default Products
