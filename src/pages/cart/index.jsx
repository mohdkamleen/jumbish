import React from 'react'
import { BiCheckboxSquare } from 'react-icons/bi'
import { BsTrash } from 'react-icons/bs'
import { Link, useNavigate } from 'react-router-dom'
import styled from 'styled-components'
import { AiOutlinePlus, AiOutlineMinus } from 'react-icons/ai'

const Container = styled.div`   
  margin: 30px 56px;
`
const Heading = styled.h1`
  width:400px;
  font-size:32px; 
  padding-left:20px;
  border-top-left-radius: 30px; 
  background:linear-gradient(to right, #FADB5F 5%,white);
`
const Button = styled.button`
  background:#0967D2;
  width:432px;
  height:80px; 
  color:#fff;
  font-size:16px;
  border-radius:5px;
  display:block; 
  margin:auto;
  border:none;
  text-transform:uppercase;
  font-weight:500;
`
const RowFlex = styled.div`
  display:flex;    
  justify-content:space-between; 
  padding: 20px 0px;
  border-bottom:1px solid lightgray;
`
export default () => {
  const navigate = useNavigate()
  return (
    <Container>
      <Heading>Shopping cart</Heading>
      {/* this is order for in progress demo first order  */}
      <RowFlex>
        <div className="order-card-left-part" style={{ display: "flex", gap: "20px" }}>
          <img src="assest/image/cake2.png" height={132} alt="error" />
          <div style={{ display: "flex", fontWeight: "500", flexDirection: "column", justifyContent: "center" }}>
            <span style={{ fontWeight: "600", fontSize: "22px", marginTop: "-10px" }}>Chocolate Cream Cake 1/2 Kg</span>
            <span> Deliver to 123456  </span>
            <span> Deliver date : 22/02/2022  </span>
            <span style={{ height: "25px", display: "flex",marginBottom:"5px" }}><BiCheckboxSquare size="25px" color='#2DE14A' style={{marginLeft:"-5px"}}/> Eggless</span>
            <div style={{display:"flex"}}>
              <div style={{background:"#E4E7EB",width:"65px",display:"flex",justifyContent:"space-around",alignItems:"center",height:'24px',borderRadius:"5px"}}>
                <AiOutlinePlus />
                <span>1</span>
                <AiOutlineMinus />
              </div> &ensp;&ensp;
              <font color="red" size='3'><BsTrash /> Delete </font>
            </div>
          </div>
        </div>
        <h2>₹ 500.00</h2>
      </RowFlex>
      <br />
      <h1 align="right">Cart total (1item): ₹ 500.00</h1>
      <br />
      <Link to="/payment">
        <Button>proceed to buy</Button>
      </Link>


      {/* when cart will empty  */}
      {/* <RowFlex style={{border:"none",flexDirection:"column",alignItems:"center"}}>
        <h1 style={{fontSize:"35px"}}>Your shopping cart is empty!</h1>
        <h2>Looks like you have not added anything to your cart. Go ahead and explore.</h2>
        <br /><br />
        <Button onClick={() => navigate("/")}>continue shopping</Button>
      </RowFlex> */}


    </Container>
  )
}
