import React from 'react'
import Header from '../components/Header'
import { CheckCircleIcon } from '@heroicons/react/outline'
import { useRouter } from 'next/router'

const Success = () => {
 const router = useRouter();
  return (
    <div className='bg-gray-200 h-screen'>
     <Header />
     <main className='max-w-screen-lg mx-auto'>
      <div className='flex flex-col p-10 bg-white'>
      <div className='flex items-center mb-5 space-x-2'>
        <CheckCircleIcon className='text-green-500 h-10' />
        <h1 className='text-3xl'>Thank you! Your order has been confirmed.</h1>
       </div>
       <p>Thank you for shopping with us! We'll send a confirmation once item has been shipped.
        If you would like to check the status of the order(s) press the link below.</p> 
        <button onClick={()=>router.push('/orders')} className='button mt-8'>Go to my Orders</button>
      </div>
   
     </main>

    </div>
  )
}

export default Success