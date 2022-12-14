import React, { useEffect, useState } from 'react'
import { BsTrash } from 'react-icons/bs'
import { Link } from 'react-router-dom'
import styled from 'styled-components'
import { useSelector, useDispatch } from 'react-redux'
import { AiOutlinePlus, AiOutlineMinus } from 'react-icons/ai'
import { PatchData, clearUser, removeCart, addOrder } from '../../redux/slice/user'
import { Input, Modal, Radio, Select } from 'antd'
import { toast } from 'react-toastify'

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
  const { cart } = user
  const [model, setModel] = useState("")
  const [tipBox, setTipBox] = useState(false)

  const defaultValue = {
    name: "",
    phone: "",
    pincode: "",
    address: "",
    slot: "",
    tip: 0
  }
  const [formData, setFormData] = useState(defaultValue)

  useEffect(() => {
    user.address && setFormData(user.address)
  }, [])


  const handleSlotChange = (e) => {
    setFormData({
      ...formData,
      slot: e
    })
  }

  const handleChange = (e) => {
    let { target: { name, value } } = e
    setFormData({
      ...formData,
      [name]: value
    })
  }

  const handleAddress = async () => {
    let { name, phone, pincode, address } = formData
    if (!name || !phone || !pincode || !address) return toast.warn("All feilds are required")
    if(localStorage.getItem("phone")){
      const resAddress = await dispatch(PatchData({
        _id: user._id,
        address: formData
      }))
      resAddress?.payload ? setModel("time") : toast.warn("Something went wrong")
    } else {
      setModel("time")
    }
  }

  const handleSubmit = async () => {
    let { slot } = formData
    if (!slot) return toast.warn("Pls select your slot")
    tipBox ? setFormData({ ...formData, tip: 10 }) : setFormData({ ...formData, tip: 0 })

    if(localStorage.getItem("phone")){
      const res = await dispatch(PatchData({
        _id: user._id,
        address: formData
      }))
      if (res?.payload) {
        setModel("success")
        var resOrder = await dispatch(PatchData({
          _id: user._id,
          order: cart
        }))
        resOrder?.payload && dispatch(addOrder())  
      } else {
        toast.warn("Something went wrong")
      }
    } else {
      setModel("success")
    }

  }

  return (
    <Container>
      <h3> <Link to="/">Home</Link> &gt; cart</h3>
      {
        cart.length > 0 ? (
          <>

          {/* {
            console.log(cart.map(e=>e.id).filter((i,j,self)=>self.indexOf(i) === j))
          } */}
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
                  <h2>??? {e.price}.00</h2>
                </RowFlex>
              ))
            }
            <br />
            <h1>Cart total ({cart.length === 1 ? cart.length+" item" : cart.length+" items"}) : ???{ cart.map(e=>e.price).reduce((i,j)=>i+j,0) }.00</h1>
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
      <Modal closeIcon={true} visible={model === "address"} footer={false} onCancel={() => setModel(false)}>
        <div style={{ display: "flex", justifyContent: "center", flexDirection: "column", alignItems: "center" }}>
          <h1> Add your address details </h1>
          <Input value={formData.name} onChange={handleChange} name="name" style={{ width: "80%" }} size="large" placeholder='Type your full name' /> <br />
          <Input value={formData.phone} onChange={handleChange} name="phone" style={{ width: "80%" }} size="large" placeholder='Type your phone number' /> <br />
          <Input value={formData.pincode} onChange={handleChange} name="pincode" style={{ width: "80%" }} size="large" placeholder='Pincode' /> <br />
          <Input.TextArea value={formData.address} onChange={handleChange} name="address" style={{ width: "80%" }} rows={3} size='large' placeholder='Type your address' /> <br />
          <div style={{ display: "flex", gap: "20px" }}>
            <Button onClick={() => setModel(false)}>Cancel</Button>
            <Button onClick={handleAddress} >next</Button>
          </div><br />
        </div>
      </Modal>

      {/* this model for time deli.... details  */}
      <Modal closeIcon={true} visible={model === "time"} footer={false} onCancel={() => setModel(false)}>
        <div style={{ display: "flex", justifyContent: "center", flexDirection: "column", alignItems: "center" }}>
          <h1> Book your delivery slot </h1>

          <Select
            placeholder="Select delivery slot "
            size='large'
            defaultValue={formData.slot}
            onChange={handleSlotChange}
            style={{
              width: "70%",
            }}
          >
            <Select.Option value="10am - 11am">10am - 11am</Select.Option>
            <Select.Option value="11am - 12pm">11am - 12pm</Select.Option>
            <Select.Option value="12pm - 01pm">12pm - 01pm</Select.Option>
            <Select.Option value="01pm - 02pm">01pm - 02pm</Select.Option>
            <Select.Option value="02pm - 03pm">02pm - 03pm</Select.Option>
            <Select.Option value="03pm - 04pm">03pm - 04pm</Select.Option>
          </Select> <br />
          <label style={{ width: "65%" }}>
            <input type='checkbox' checked={tipBox} onChange={() => setTipBox(!tipBox)} /> &nbsp;
            <big>Tip your delivery partner (optional) </big>
          </label><br />

          {tipBox && (<Radio.Group name='tip' onChange={handleChange} defaultValue="10">
            <Radio.Button value="10">??? 10</Radio.Button>
            <Radio.Button value="20">??? 20</Radio.Button>
            <Radio.Button value="30">??? 30</Radio.Button>
            <Radio.Button value="50">??? 50</Radio.Button>
          </Radio.Group>)
          }
          <br />
          <div style={{ display: "flex", gap: "20px" }}>
            <Button onClick={() => setModel("address")}>previous</Button>
            <Button onClick={handleSubmit}>submit</Button>
          </div><br />
        </div>
      </Modal>


      {/* this model for successs   */}
      <Modal closeIcon={true} visible={model === "success"} footer={false} onCancel={() => setModel(false)}>
        <div style={{ display: "flex", justifyContent: "center", flexDirection: "column", alignItems: "center" }}>
          <h1> Congrates... </h1>
          <h2>We received your order</h2>
          <h2>Order Id : 567834</h2>
          <br />
          <div style={{ display: "flex", gap: "20px" }}>
            <Button onClick={() => setModel(false)}>Cancel</Button>
            <Link to="/order">
              <Button >Orders</Button>
            </Link>
          </div><br />
        </div>
      </Modal>

    </Container >
  )
}
