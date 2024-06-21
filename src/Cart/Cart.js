import React,{useEffect, useState} from 'react'
import './Cart.css'
import axios from 'axios'

export default function Cart() {
  const userId=localStorage.getItem("userId")
  const[loding,setLoading]=useState(true)
  const[userProducts, setUserProducts]=useState()
  useEffect(()=>{
    getCartProducts()
  },[])
  async function getCartProducts(){
    const response=await axios.get(`${process.env.REACT_APP_BACKEND_URL}/api/cart?userId=${userId}`,)
    console.log(response.data.items)
    setUserProducts(response.data.items)
    setLoading(false)
  }
  function handleBuyNow(){
    
  }
  return (
    <div className='cart-container'>
      {
        loding?(
          <p>Loding...</p>
        ):(
          <div className='cart-items'>
            {
              userProducts.map((productItem)=>(
                <div className='cart-item'>
                  <h3>Name: {productItem.product.name}</h3>
                  <p>Price: {productItem.product.price}</p>
                  <p>Description: {productItem.product.description}</p>
                  <p>Category :{productItem.product.category}</p>
                  <p>Stock: {productItem.product.stock}</p>
                  <p>Quantity: {productItem.product.quantity}</p>
                  <button onClick={()=>handleBuyNow()}>Buy Now</button>
                </div>
              
              ))
            }
          </div>
        )
      }
    </div>
  )
}