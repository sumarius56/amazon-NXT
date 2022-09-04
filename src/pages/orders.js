import React from 'react'
import Header from '../components/Header'
import { getSession, useSession } from 'next-auth/react';
import db from '../../firebase';
import moment from 'moment';
import Order from '../components/Order';


const Orders = ({orders}) => {
 const {data:session} = useSession();


  return (
    <div>
     <Header />
     <main className='max-w-screen-lg mx-auto  p-10 '>
      <h1 className='text-3xl border-b mb-2 pb-1 border-yellow-400'>Your Orders</h1>



      {session ? (
       <h2>{orders.length} Orders</h2>
      )        : ('Please Sign In to see your order details')}

      <div className='mt-5 space-y-4 '>
       {orders?.map(
        ({id,timestamp,amount,images,items}
         )=>(
        <Order
        key={id + Math.random() * id - 1}
        id={id}
        timestamp={timestamp}
        amount={amount}
        images={images}
        items={items}
        />
       ))}
      </div>
     </main>
    </div>
  )
}

export default Orders

export async function getServerSideProps(context){
 const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);

 //Get the users log in creds...
 const session = await getSession(context);
 
 if(!session){
  return {
   props:{}
  }
 }
 //Firebase DB
 const stripeOrders = await db
 .collection('users')
 .doc(session.user.email)
 .collection('orders')
 .orderBy('timestamp','desc')
 .get();
 
 //Stripe Orders
 const orders = await Promise.all(
  stripeOrders.docs.map(async (order) =>({
   id: order.id,
   amount: order.data().amount,
   images: order.data().images,
   timestamp: moment(order.data().timestamp.toDate()).unix(),
   items: (
    await stripe.checkout.sessions.listLineItems(order.id,{
     limit: 100,
    })
   ).data,
 }))
 );

 return {
  props: {
   orders,
  }
 }
}