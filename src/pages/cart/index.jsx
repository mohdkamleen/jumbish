import React, { useState } from 'react'
import { BsTrash } from 'react-icons/bs'
import { Link } from 'react-router-dom'
import styled from 'styled-components'
import { useSelector, useDispatch } from 'react-redux'
import { AiOutlinePlus, AiOutlineMinus } from 'react-icons/ai'
import { removeCart } from '../../redux/slice/order'
import { Input, Modal, Radio, Select, Tag } from 'antd'

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
  const [model, setModel] = useState(false)
  const [tip, setTip] = useState(false)
  const { cart } = useSelector(state => state.order)
  const onTipSelect = (e) => {
    console.log(`radio checked:${e.target.value}`);
  };
  return (
    <Container>
      <h3> <Link to="/">Home</Link> &gt; cart</h3>
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
                      <span> type : Greocery </span>
                      <div style={{ display: "flex", marginTop: "7px" }}>
                        <div style={{ background: "red", width: "65px", display: "flex", justifyContent: "space-around", alignItems: "center", height: '24px', borderRadius: "5px" }}>
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
            <h1>Cart total ({cart.length === 1 ? cart.length + " item" : cart.length + " items"}): ₹ {cart.length > 1 ? cart.reduce((e, j) => e.price + j.price) : cart[0].price}.00</h1>
            <br />
            <Button onClick={() => setModel("address")}>continue &amp; next</Button>
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

      {/* this model for address details  */}
      <Modal visible={model === "address"} footer={false} onCancel={() => setModel(false)}>
        <div style={{ display: "flex", justifyContent: "center", flexDirection: "column", alignItems: "center" }}>
          <h1> Add your address details </h1>
          <Input style={{ width: "80%" }} size="large" placeholder='Type your full name' /> <br />
          <Input style={{ width: "80%" }} size="large" placeholder='Type your phone number' /> <br />
          <Input style={{ width: "80%" }} size="large" placeholder='Pincode' /> <br />
          <Input.TextArea style={{ width: "80%" }} rows={4} size='large' placeholder='Type your address' /> <br />
          <div style={{ display: "flex", gap: "20px" }}>
            <Button onClick={() => setModel(false)}>Cancel</Button>
            <Button onClick={() => setModel("time")} >next</Button>
          </div><br />
        </div>
      </Modal>

      {/* this model for time deli.... details  */}
      <Modal visible={model === "time"} footer={false} onCancel={() => setModel(false)}>
        <div style={{ display: "flex", justifyContent: "center", flexDirection: "column", alignItems: "center" }}>
          <h1> Book your delivery slot </h1>

          <Select
            placeholder="Select delivery slot "
            size='large'
            style={{
              width: "70%",
            }}
          >
            <Select.Option>10am - 11am</Select.Option>
            <Select.Option>11am - 12pm</Select.Option>
            <Select.Option>12pm - 01pm</Select.Option>
            <Select.Option>01pm - 02pm</Select.Option>
            <Select.Option>02pm - 03pm</Select.Option>
            <Select.Option>03pm - 04pm</Select.Option>
          </Select> <br />
          <label style={{ width: "65%" }}><input type='checkbox' checked={tip} onChange={() => setTip(!tip)}/> &nbsp; <big>Tip your delivery partner (optional) </big> </label><br />
          
         { tip && (<Radio.Group onChange={onTipSelect} defaultValue="10">
            <Radio.Button value="10">₹ 10</Radio.Button>
            <Radio.Button value="20">₹ 20</Radio.Button>
            <Radio.Button value="30">₹ 30</Radio.Button>
            <Radio.Button value="50">₹ 50</Radio.Button>
          </Radio.Group>)
          }
          <br />
          <div style={{ display: "flex", gap: "20px" }}>
            <Button onClick={() => setModel("address")}>previous</Button>
            <Button danger>next</Button>
          </div><br />
        </div>
      </Modal>

    </Container >
  )
}
