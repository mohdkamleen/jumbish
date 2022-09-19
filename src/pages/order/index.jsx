import React, { useEffect, useState } from 'react'
import { BsTrash } from 'react-icons/bs'
import { Link } from 'react-router-dom'
import styled from 'styled-components'
import { useSelector, useDispatch } from 'react-redux'
import { AiOutlinePlus, AiOutlineMinus } from 'react-icons/ai' 

const Container = styled.div`   
  margin: 30px 56px;
`
const Button = styled.button`
  background:rgba(0,0,0,0.9);  
  color:#fff;
  font-size:16px;
  border-radius:5px;
  display:block; 
  margin:auto;
  border:none;
  text-transform:uppercase;
  font-weight:500;
  padding:10px 20px;
  cursor:pointer;
`
const RowFlex = styled.div`
  display:flex;    
  justify-content:space-between; 
  padding: 20px 0px; 
`
export default () => {
  const dispatch = useDispatch()
  const { user } = useSelector(state => state.user)
  const { order } = user 
 
  return (
    <Container>
      <h3> <Link to="/">Home</Link> &gt; order</h3>
      {
        order.length > 0 ? (
          <>
            {
              order.map((e, i) => (
                <RowFlex key={i}>
                  <div className="order-card-left-part" style={{ display: "flex", gap: "20px" }}>
                    <img src={e.image} height={132} alt="error" style={{ borderRadius: "5px", maxWidth: "170px" }} />
                    <div style={{ display: "flex", fontWeight: "500", flexDirection: "column", justifyContent: "center" }}>
                      <span style={{ fontWeight: "600", fontSize: "22px", marginTop: "-10px" }}> {e.name} </span>
                      <span> id : {e.id}  </span >
                      <span> type : Greocery </span> 
                      <span> qnt : 04 </span> 
                      <span> delivery date : 22/10/2022 </span> 
                    </div>
                  </div>
                  <h2>₹ {e.price}.00</h2>
                </RowFlex>
              ))
            }
            <br />
           
          </>
        ) : (
          <>
            < RowFlex style={{ border: "none", flexDirection: "column", alignItems: "center" }}>
              <h1 style={{ fontSize: "35px" }}>Your order is empty!</h1>
              <h2 align="center">Looks like you have not added anything to your order. Go ahead and explore.</h2>
              <br /><br />
              <Link to="/">
                <Button>continue shopping</Button>
              </Link>
            </RowFlex >
          </>
        )
      }
      <br />
 
 
    </Container >
  )
}
