import React from 'react'
import styled from 'styled-components'
import { MdOutlineShoppingCart } from 'react-icons/md'
import { BiUserCircle } from 'react-icons/bi'
import { Avatar, Badge } from 'antd'
import { Link, useNavigate } from 'react-router-dom'

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
const Header = () => {
    const navigate = useNavigate()
    return (
        <Container>
            <Wrapper>
                <Logo onClick={() => navigate("/")}> Jumbish </Logo>
            </Wrapper>
            <Wrapper>
                <Link to="/cart" >
                    <Badge count={1} size="small" >
                        <MdOutlineShoppingCart size="35px" color='red' />
                    </Badge>
                </Link>
                &ensp;
                <Link to="/">
                    <BiUserCircle size="35px" color='red' />
                </Link>
                <Avatar style={{ background: "red" }}>DF</Avatar>
            </Wrapper>

        </Container>
    )
}

export default Header