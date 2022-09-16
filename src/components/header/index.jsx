import React from 'react'
import styled from 'styled-components'
import { MdOutlineShoppingCart } from 'react-icons/md'
import { BiUserCircle } from 'react-icons/bi'
import { Avatar, Badge, Input, Modal } from 'antd'
import { useDispatch, useSelector } from 'react-redux'
import { Link, useNavigate } from 'react-router-dom'
import { useState } from 'react'
import { toast } from 'react-toastify'
import axios from '../../apis/axios'
import { LoginUser } from '../../redux/slice/auth'

const Container = styled.div`
    width: 100%;
    height: 70px;
    background: rgba(0,0,0,0.9);
    display:flex;
    justify-content:space-between;
    align-items:center; 
    padding:0px 56px;
`
const Wrapper = styled.div`     
    display:flex;
    gap:16px;
`
const Logo = styled.h1` 
    color:red; 
    margin-top: 10px;
    font-weight:700;
    font-size:30px;  
    cursor:pointer;
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
const Header = () => {
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const [model, setModel] = useState(false)
    const [phone, setPhone] = useState("")
    const { cart } = useSelector(state => state.order)

    
    const handleLogout = () => {
        setModel("")
        localStorage.removeItem("phone")
    }

    const handleSignup = async () => {
        if (!phone) return toast.warn("Pls fill phone number..")
        if (isNaN(phone)) return toast.warn("Char is not valid..")
        if (phone.length < 10 || phone.length > 10) return toast.warn("Pls enter valid phone number..") 
        const res = await dispatch(LoginUser({ phone }))
        if (res.payload) {
            localStorage.setItem("phone", phone)
            toast.success("Login Success")
            setModel(false)
        }
    } 

    return (
        <Container>
            <Wrapper>
                <Logo onClick={() => navigate("/")}> Jumbish </Logo>
            </Wrapper>
            <Wrapper>
                <Link to="/cart" >
                    <Badge count={cart.length} size="small" >
                        <MdOutlineShoppingCart size="35px" color='red' />
                    </Badge>
                </Link>
                &ensp; 
               {
               localStorage.getItem("phone") 
               ? <Avatar style={{ background: "red",cursor:"pointer" }} onClick={() => setModel("logout")}>DF</Avatar> 
               : <BiUserCircle size="35px" color='red' onClick={() => setModel("login")} /> }
            </Wrapper>



            {/* this model for login */}
            <Modal visible={model === "login"} footer={false} onCancel={() => setModel(false)}>
                <div style={{ display: "flex", justifyContent: "center", flexDirection: "column", alignItems: "center" }}>
                    <h1> SignUp with phone temp.. </h1>
                    <Input value={phone} type="tel" onChange={(e) => setPhone(e.target.value)} size="large" prefix="+91" style={{ width: "80%" }} placeholder='Type phone number' /> <br />
                    <div style={{ display: "flex", gap: "20px" }}>
                        <Button onClick={() => setModel(false)}>Cancel</Button>
                        <Button onClick={handleSignup}>SignUp</Button>
                    </div><br />
                </div>
            </Modal>


            {/* this model for user logout  */}
            <Modal visible={model === "logout"} footer={false} onCancel={() => setModel(false)}>
                <div style={{ display: "flex", justifyContent: "center", flexDirection: "column", alignItems: "center" }}>
                    <h1> Are you sure want to logout </h1>
                    <div style={{ display: "flex", gap: "20px" }}>
                        <Button onClick={() => setModel(false)}>Cancel</Button>
                        <Button onClick={handleLogout}>Logout</Button>
                    </div><br />
                </div>
            </Modal>


        </Container>
    )
}

export default Header