import React, { Component } from 'react';
import styled from 'styled-components';
import { connect } from 'react-redux';
import { emit } from '../socket';

import { createDocument } from '../store/actions/document';
import { authenticateUser } from '../store/actions/user';

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

class JoinRoom extends Component {
  constructor(props) {
    super(props)
  
    this.state = {
       login: '',
       hue: Math.round(Math.random() * 360)
    }
  }

  componentDidUpdate(prevProps, prevState){
    if(this.props.documentInit && this.props.isAuthenticated){
      this.props.history.push(`/${this.props.documentUrl}`);
    }
  }

  changeLogin(event){
    this.setState({ login: event.target.value });
  }

  authenticate(documentInit, documentId, documentName, login, event){
    event.preventDefault();
    const { hue } = this.state;
    if(documentInit !== null){
      emit(createDocument(documentName));
      emit(authenticateUser(null, { login, hue }));
    }else{
      emit(authenticateUser(documentId, { login, hue }));
    }
  }
  
  render() {
    const { login, hue } = this.state;
    const { documentInit, documentId, documentName } = this.props;

    return (
      <Layout>
        <Box>
          <form onSubmit={ this.authenticate.bind(this) }>
            <Logo><img src="img/logo.png" alt="Vecs"/></Logo>
            <Heading><span>Dołącz do pokoju</span>{ documentName }</Heading>
            <BigAvatar hue={ hue } login={ login } speak/>
            <Input label="Login:" change={ this.changeLogin.bind(this) } required={ true }/>
            <Button block disabled={ login === '' } onClick={ this.authenticate.bind(this, documentInit, documentId, documentName, login) }>Dołącz</Button>
          </form>
        </Box>
        <Copyright>Bartosz Wilk © 2018</Copyright>
      </Layout>
    )
  }
}

const mapStateToProps = state => {
  const { id, name, url, init } = state.document;
  return {
    isAuthenticated: state.user.isAuthenticated,
    documentInit: init,
    documentId: id,
    documentName: name,
    documentUrl: url
  }
};

export default connect(mapStateToProps)(JoinRoom);