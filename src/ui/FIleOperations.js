import React from 'react';
import styled from 'styled-components';
import { connect } from 'react-redux';
import { emit } from '../socket';

import { saveToCloud } from '../store/actions/document';

import { openModal } from '../store/actions/modal';

const List = styled.div`
  display: flex;
  align-items: center;
  list-style: none;
  padding: 0;
  margin: 0;
  height: 100%;
`;

const Button = styled.button`
  background: none;
  font-size: 0.75rem;
  padding: 0 1.05rem;
  height: 100%;
  margin: 0;
  border: 0;
  box-sizing: border-box;
  cursor: pointer;
  position: relative;
  &:before {
    content: '';
    background: #f0f0f0;
    width: 36px;
    height: 36px;
    display: block;
    margin: 0 auto 0.35rem;
  }
  
  &:hover {
    &:after {
      content: '';
      background: var(--orange);
      display: block;
      position: absolute;
      bottom: -1px;
      left: 0;
      right: 0;
      height: 2px;
    }
  }
`;

class FileOperations extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      googleAuthWindow: null
    };
    this.googleAuth = this.googleAuth.bind(this);
  }

  componentDidUpdate(prevProps) {
    if(prevProps.googleToken !== this.props.googleToken){
      emit(saveToCloud(this.props.googleToken));
      this.state.googleAuthWindow.close();
    }
  }

  googleAuth(){
    const { googleAuthUrl } = this.props;

    const AuthWindow = {
      width: 500,
      height: 650,
      left: window.innerWidth / 2 - 500 / 2,
      top: window.innerHeight / 2 - 650 / 2
    };
    
    const googleAuthWindow = window.open(googleAuthUrl, 'GoogleAuthWindow', `width=${ AuthWindow.width },height=${ AuthWindow.height },left=${ AuthWindow.left },top=${ AuthWindow.top }`);
    this.setState({ googleAuthWindow });
  }

  render(){
    const { clickButton } = this.props;
    return (
      <List>
        <Button onClick={ clickButton.bind(this, 'Nowy plik', 'Content', true, true, null, null) }><span>Nowy plik</span></Button>
        <Button onClick={ clickButton.bind(this, 'Wczytaj plik', 'Content', true, true, 'Confirm', null) }><span>Wczytaj plik</span></Button>
        <Button onClick={ clickButton.bind(this, 'Zapisz jako PNG', 'Content', true, true, 'Confirm', null) }><span>Zapisz jako PNG</span></Button>
        <Button onClick={ clickButton.bind(this, 'Zapisz jako SVG', 'Content', true, true, 'Confirm', null) }><span>Zapisz jako SVG</span></Button>
        <Button onClick={ this.googleAuth.bind(this) }><span>Zapisz w chmurze</span></Button>
        <Button onClick={ clickButton.bind(this, 'Kod', 'Content', true, true, 'Confirm', null) }><span>Kod</span></Button>
      </List>
    )
  }
}

const mapStateToProps = state => ({
  googleToken: state.document.googleToken,
  googleAuthUrl: state.document.googleAuthUrl
})

const mapDispathToProps = dispath => ({
  clickButton: (title, content, closeButton, cancelButton, confirmButton, buttonAction) => {
    dispath(openModal({
      visible: true,
      title,
      content,
      closeButton,
      cancelButton,
      confirmButton,
      buttonAction
    }))
  }
})

export default connect(mapStateToProps, mapDispathToProps)(FileOperations);