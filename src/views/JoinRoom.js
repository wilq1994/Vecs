import React, { Component } from 'react';
import styled from 'styled-components';

import Input from '../ui/Input';
import Button from '../ui/Button';
import Avatar from '../ui/Avatar';

const Layout = styled.div`
  background: #eee;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  padding: 0 1.4rem;
`;

const Box = styled.div`
  background: #fff;
  border-radius: 5px;
  padding: 2.8rem;
  margin: 1.4rem;
  max-width: calc(1.4rem * 20);
  width: 100%;
  box-sizing: border-box;
  box-shadow: 0px 2px 15px rgba(0, 0, 0, 0.2);
`;

const Heading = styled.h1`
  text-align: center;
  font-size: 1.777rem;
  font-weight: 500;
  line-height: 2.8rem;
  margin: 0;
  margin-bottom: 2.1rem;
  span {
    font-size: 0.75rem;
    text-transform: uppercase;
    display: block;
    line-height: 1.4rem;
    letter-spacing: 0.4px;
    color: #888;
    font-weight: 400;
    margin-bottom: -0.35rem;
  }
`;

const Logo = styled.div`
  border-bottom: 1px solid #f0f0f0;
  padding-bottom: 2.1rem;
  margin: 0 auto 2.1rem;
  img {
    display: block;
    margin: 0 auto;
  }
`;

const BigAvatar = styled(Avatar)`
  font-size: 3.157rem;
  margin: 0 auto 1.4rem;
`;

const Copyright = styled.p`
  margin: 0 0 1.4rem;
  text-align: center;
  color: #909090;
`;

export default class JoinRoom extends Component {
  constructor(props) {
    super(props)
  
    this.state = {
       login: ''
    }
    this.changeLogin = this.changeLogin.bind(this);
  }

  changeLogin(event){
    this.setState({ login: event.target.value });
  }
  
  render() {
    const { login } = this.state;

    return (
      <Layout>
        <Box>
          <Logo><img src="img/logo.png" alt="Vecs"/></Logo>
          <Heading><span>Dołącz do pokoju</span>Będziemy Magistrami</Heading>
          <BigAvatar login={ login } speak/>
          <Input label="Login:" change={ this.changeLogin } required={ true }/>
          <Button block disabled={ login === '' }>Dołącz</Button>
        </Box>
        <Copyright>Bartosz Wilk © 2018</Copyright>
      </Layout>
    )
  }
}