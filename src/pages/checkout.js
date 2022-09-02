import Image from 'next/image'
import React from 'react'
import { useSelector } from 'react-redux'
import Header from '../components/Header'
import { selectItems, selectTotal } from '../slices/basketSlice'
import CheckoutProduct from '../components/CheckoutProduct'
import Currency from 'react-currency-formatter'
import {useSession} from 'next-auth/react'

const Checkout = () => {
  const items = useSelector(selectItems);
   const {data:session} = useSession();
   const total = useSelector(selectTotal);

  return (

    <div className='bg-gray-100'>
     <Header />
     <main className='lg:flex max-w-screen-2xl mx-auto '>
      {/* Left Section */}
      <div className='flex-grow m-5 shadow-sm'>
       <Image
        src='https://links.papareact.com/ikj'
        width={1020}
        height={250}
        objectFit='contain' 
        />
        <div className='flex flex-col p-5 space-y-10 bg-white'>
          <h1 className='text-3xl border-b pb-4'>
         {`Shopping Basket ( ${items.length} item(s)  ) : `}
          </h1>

        {items.map((item,index)=> (
          <CheckoutProduct 
          key={index + Math.random()*index}
          id={item.id}
          title={item.title}
          rating={item.rating}
          price={item.price}
          description={item.description}
          category={item.category}
          image={item.image}
          hasPrime={item.hasPrime}
          />
        ))}


        </div>
      </div>
      {/* Right Section */}
      <div className='flex flex-col bg-white p-10 shadow-md '>
       {items.length > 0 && (
        <div>
        <h2 className='whitespace-nowrap'>Subtotal:
         {items.length} item(s){" "} 
         <span className='font-bold'>
          <Currency quantity={total} currency='EUR' />
          </span> 
          
        </h2>
         <button disabled={!session} className={`button mt-2 ${!session && 'from-gray-300 to gray-500 border-gray-200 text-gray-300 cursor-not-allowed'}`}>
          {!session ? 'Sign in to Checkout' : 'Proceed to Checkout'}
         </button>
        </div>
       )}
      </div>
     </main>
    </div>
  )
}

export default Checkout