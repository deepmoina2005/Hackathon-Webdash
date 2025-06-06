import React from 'react'
import ProductCart from './ProductCart'
import { useAppContext } from '../context/AppContext'

const BestSeller = () => {
    const { products } = useAppContext();
  return (
    <div className='mt-16'>
        <p className='text-2xl md:text-3xl font-medium'>Recycled Product</p>
        <div className='grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-6  md:gap-6 lg:grid-cols-5 mt-6 pl-8'>
            {products.filter((product)=> product.inStock).slice(0,5).map((product, index)=>(
            <ProductCart key={index} product={product}/>
            ))}
        </div>
    </div>
  )
}

export default BestSeller