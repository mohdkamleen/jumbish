import React from 'react'
import styled from 'styled-components'
import { MdOutlineShoppingCart, MdPhone } from 'react-icons/md'
import { BiUserCircle } from 'react-icons/bi'
import { Badge, Input, Modal } from 'antd'
import { useSelector } from 'react-redux'
import { Link, useNavigate } from 'react-router-dom'
import { useState } from 'react'

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
    const [model, setModel] = useState(false)
    const { cart } = useSelector(state => state.order)
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
                <BiUserCircle size="35px" color='red' onClick={() => setModel(true)}/>
                {/* <Avatar style={{ background: "red" }}>DF</Avatar> */}
            </Wrapper>



            {/* this model for user details  */}
            <Modal visible={model} footer={false} onCancel={() => setModel(false)}>
                <div style={{ display: "flex", justifyContent: "center", flexDirection: "column", alignItems: "center" }}>
                    <h1> SignUp with phone temp.. </h1>
                    <Input size="large" prefix={<MdPhone />} style={{ width: "80%" }} placeholder='Type phone number' /> <br />
                    <div style={{ display: "flex", gap: "20px" }}>
                        <Button onClick={() => setModel(false)}>Cancel</Button>
                        <Button>SignUp</Button>
                    </div><br />
                </div>
            </Modal>


        </Container>
    )
}

export default Header