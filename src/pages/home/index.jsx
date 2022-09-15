import React from 'react'
import styled from 'styled-components'
import { FaStarHalfAlt } from 'react-icons/fa'
import { useNavigate } from 'react-router-dom'
import { Button } from 'antd'

const Container = styled.div` 
    width:100%; 
    padding:20px 5%
`
const ProductContainer = styled.div` 
    width:100%; 
    display:flex;  
    gap:16px;  
    justify-content:center;
    align-items:center;
    flex-wrap:wrap;
`
const ProductCard = styled.div`
  width:200px;
  display:flex;
  border-radius:5px;
  padding:5px;
  border:1px solid gray;
  justify-content:center;
  align-items:center;
  flex-direction:column; 
  cursor:pointer;
  transition:.3s; 
  gap:3px;
  &:hover{ 
    box-shadow:1px 1px 5px 2px lightgray;
  }
`
const Wrapper = styled.div`
  width:98%; 
  display:flex;
  justify-content:space-between;
  align-items:center;
  font-family: 'Roboto', sans-serif;  
`
export default () => {
  const navigate = useNavigate()
  return (
    <Container>

      <ProductContainer>

        {
          Array(20).fill().map((e, i) => (
            <ProductCard>
              <img style={{ height: "150px",maxWidth:"185px" }} src={`https://source.unsplash.com/${i+162}x${130}/?grocery,fruit`} alt="loading..." />
              <Wrapper>
                <big>product{i + 1} (<small>₹{Math.floor(Math.random().toString().substring(2,4))}</small>)</big> 
                <Button size='small'>add</Button>
              </Wrapper>
            </ProductCard>
          ))
        }

      </ProductContainer><br />
    </Container>
  )
}
