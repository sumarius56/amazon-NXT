import Image from 'next/image'
import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { selectItems } from '../slices/basketSlice'
import { StarIcon } from '@heroicons/react/outline'
import Currency from 'react-currency-formatter'
import { addToBasket, removeFromBasket } from '../slices/basketSlice'


const CheckoutProduct = ({id,title,price,rating,description,category,image,hasPrime}) => {

  const items = useSelector(selectItems)

  const dispatch = useDispatch()

  const addItemToBasket = () => {
   const product ={
    id,title,price,rating,description,category,image,hasPrime
   }
   dispatch(addToBasket(product))
  }

  const removeItemFromBasket = () => {
   
   dispatch(removeFromBasket({id}))
  }



  return (
    <div className='grid grid-cols-5'>
     <Image src={image} height={200} width={200} objectFit='contain'/>

     {/* Mid Section */}
     <div className='col-span-3 mx-5'>
      <p>{title}</p>
      <div className='flex'>
       {Array(rating).fill().map((_,index)=>(
        <StarIcon key={index + Math.random()*23 +37 -index} className='h-5 text-yellow-500' />
       ))
       }
      </div>
      <p className='text-xs my-2 line-clamp-3 max-w-[500px]'>{description}</p>
      <Currency quantity={price} currency='EUR' />
      {hasPrime && (
       <div className='flex items-center space-x-2 '>
        <img className='w-12' src='https://links.papareact.com/fdw' alt='/' loading='lazy' />
        <p className='text-xs text-gray-500'>FREE Next-day Delivery</p>
       </div>
      )}
      
     </div>
       
      
        {/* Right Section */}
       <div className='flex flex-col space-y-2 my-auto justify-self-end'>
        <button onClick={addItemToBasket} className='button'>Add to Basket</button>
        <button onClick={removeItemFromBasket} className='button'>Remove from Basket</button>
       </div>
    </div>
  )
}

export default CheckoutProduct