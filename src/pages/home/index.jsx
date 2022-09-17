import React from 'react'
import styled from 'styled-components'
import { useDispatch } from 'react-redux'
import { Button } from 'antd'
import { addCart } from '../../redux/slice/order' 

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
const product = []
Array(15).fill().map((e, i) => {
  product.push({
    id: Math.floor(Math.random().toString().substring(2, 8)),
    image: `https://source.unsplash.com/${i + 162}x${130}/?groceries,fruit`,
    name: `product${i + 1}`,
    price: Number(Math.floor(Math.random().toString().substring(2, 4)))
  })
}) 

export default () => {
  const dispatch = useDispatch()
  return (
    <Container>
      <ProductContainer>

        {/* fetch product from local database who created by random data  */}
        {
          product.map((e, i) => (
            <ProductCard key={e.id}>
              <img style={{ height: "150px", maxWidth: "185px" }} src={e.image} alt="loading..." />
              <Wrapper>
                <big>{e.name} (<small>₹{e.price}</small>)</big>
                <Button size='small' onClick={() => { dispatch(addCart(e)) }}>add</Button>
              </Wrapper>
            </ProductCard>
          ))
        }

      </ProductContainer><br />
    </Container>
  )
}
