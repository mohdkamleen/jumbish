import React from 'react'
import { BiCheckboxSquare, BiStopwatch } from 'react-icons/bi'
import { BsTrash } from 'react-icons/bs'
import { Link, useNavigate } from 'react-router-dom'
import styled from 'styled-components'
import { useSelector, useDispatch } from 'react-redux'
import { AiOutlinePlus, AiOutlineMinus } from 'react-icons/ai'
import { removeCart } from '../../redux/slice/order'

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
  border-bottom:1px solid lightgray;
`
export default () => {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const { cart } = useSelector(state => state.order)
  return (
    <Container>
      {
        cart.length > 0 ? (
          <>
            {
              cart.map((e, i) => (
                <RowFlex key={i}>
                  <div className="order-card-left-part" style={{ display: "flex", gap: "20px" }}>
                    <img src={e.image} height={132} alt="error" style={{ borderRadius: "5px", maxWidth: "170px" }} />
                    <div style={{ display: "flex", fontWeight: "500", flexDirection: "column", justifyContent: "center" }}>
                      <span style={{ fontWeight: "600", fontSize: "22px", marginTop: "-10px" }}> {e.name} </span>
                      <span> id : {e.id}  </span >
                      <span> type : Greocery  </span>
                      <span style={{ height: "25px", display: "flex", marginBottom: "5px" }}><BiStopwatch size="25px" color='#2DE14A' style={{ marginLeft: "-5px" }} />&nbsp; 2 min ago</span>
                      <div style={{ display: "flex" }}>
                        <div style={{ background: "#E4E7EB", width: "65px", display: "flex", justifyContent: "space-around", alignItems: "center", height: '24px', borderRadius: "5px" }}>
                          <AiOutlinePlus />
                          <span>1</span>
                          <AiOutlineMinus />
                        </div> &ensp;&ensp;
                        <font color="red" size='3' onClick={() => { dispatch(removeCart(i)) }}><BsTrash /> Delete </font>
                      </div>
                    </div>
                  </div>
                  <h2>₹ {e.price}.00</h2>
                </RowFlex>
              ))
            }
            <br />
            <h1 align="right">Cart total ({cart.length === 1 ? cart.length + " item" : cart.length + " items"}): ₹ {cart.length > 1 ? cart.reduce((e, j) => e.price + j.price) : cart[0].price}.00</h1>
            <br />
            <Button>proceed to buy</Button>
          </>
        ) : (
          <>
            < RowFlex style={{ border: "none", flexDirection: "column", alignItems: "center" }}>
              <h1 style={{ fontSize: "35px" }}>Your shopping cart is empty!</h1>
              <h2 align="center">Looks like you have not added anything to your cart. Go ahead and explore.</h2>
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
