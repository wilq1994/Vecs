import React from 'react';
import styled from 'styled-components';

import Button from './Button';

const Overlay = styled.div`
  background: rgba(190, 190, 190, 0.8);
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const Content = styled.div`
  background: #fff;
  max-width: calc(1.4rem * 30);
  width: 100%;
  border-radius: 5px;
  overflow: hidden;
  display: flex;
  flex-direction: column;
  align-items: stretch;
  position: relative;
`;

const Head = styled.div`
  padding: 2.1rem 2.8rem 2.1rem;
  flex: 0 0 auto;
  display: flex;
  align-items: center;
  justify-content: space-between;
  h1 {
    font-size: 1.777rem;
    font-weight: 500;
    line-height: 2.8rem;
    margin: 0;
  }
`;

const Body = styled.div`
  padding: 0 2.8rem 2.1rem;
  flex: 1 1 auto;
`;

const Footer = styled.div`
  background: #f0f0f0;
  padding: 1.05rem 2.8rem;
  flex: 0 0 auto;
  display: flex;
  align-items: center;
  justify-content: center;
  ${Button} {
    min-width: 120px;
    &:first-child {
      margin-right: 0.7rem;
    }
  }
`;

const CloseButton = styled.button`
  background: transparent;
  padding: 0;
  margin: 0;
  border: 0;
  width: 1.4rem;
  height: 1.4rem;
  cursor: pointer;
  position: absolute;
  top: 1.4rem;
  right: 1.4rem;
  &:hover {
    &:before, &:after {
    background: hsl(43, 0%, 50%);
    }
  }
  &:before {
    background: hsl(43, 0%, 70%);
    content: '';
    display: block;
    width: 100%;
    height: 3px;
    transform-origin: center center;
    transform: translate(0, 2px) rotate(45deg);
  }
  
  &:after {
    background: hsl(43, 0%, 70%);
    content: '';
    display: block;
    width: 100%;
    height: 3px;
    transform-origin: center center;
    transform: translate(0, -1px) rotate(-45deg);
  }
`;

const Modal = ({ title, children }) => (
  <Overlay>
    <Content>
      <CloseButton></CloseButton>
      <Head><h1>{ title }</h1></Head>
      <Body>{ children }</Body>
      <Footer><Button>OK</Button><Button text>Anuluj</Button></Footer>
    </Content>
  </Overlay>
)

export default Modal;