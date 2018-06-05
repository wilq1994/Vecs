import React from 'react';
import styled from 'styled-components';
import { connect } from 'react-redux';
import download from 'downloadjs';
import { broadcast } from '../socket';

import { openModal, closeModal } from '../store/actions/modal';
import { newFile } from '../store/actions/document';

import NewFilePopup from '../views/NewFilePopup';
import SavePngPopup from '../views/SavePngPopup';
import CodePopup from '../views/CodePopup';

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

  &:nth-child(1):before {
    background: url('../img/top-icons.png') no-repeat 0px top;
  }

  &:nth-child(2):before {
    background: url('../img/top-icons.png') no-repeat -36px top;
  }

  &:nth-child(3):before {
    background: url('../img/top-icons.png') no-repeat -72px top;
  }

  &:nth-child(4):before {
    background: url('../img/top-icons.png') no-repeat -108px top;
  }

  &:nth-child(5):before {
    background: url('../img/top-icons.png') no-repeat -144px top;
  }
`;

class FileOperations extends React.Component {
  constructor(props){
    super(props);
    this.createNewFile = this.createNewFile.bind(this);
    this.savePNG = this.savePNG.bind(this);
    this.svgCode = this.svgCode.bind(this);
  }

  createNewFile(){
    const { closeModal, createNewFile } = this.props;
    createNewFile();
    closeModal();
  }

  svgCode(){
    const { closeModal } = this.props;
    closeModal();
  }

  savePNG(){
    const { documentWidth, documentHeight, closeModal } = this.props;

    var canvas = document.createElement('canvas');
    canvas.width = documentWidth;
    canvas.height = documentHeight;
    var ctx = canvas.getContext('2d');
    var blob = new Blob([document.getElementById('stage').outerHTML], {type : 'image/svg+xml;charset=utf-8'});
    var img = new Image();
    img.onload = function() {
      // if(!transparent) {
      //     ctx.fillStyle = fill;
      //     ctx.fillRect(0, 0, canvas.width, canvas.height);
      // }
      ctx.drawImage(img, 0,0);
      closeModal();
      download(canvas.toDataURL(), 'vecs.png', 'image/png');
    }
    img.src = window.URL.createObjectURL(blob);
  }

  render(){
    const { clickButton } = this.props;
    return (
      <List>
        <Button onClick={ clickButton.bind(this, 'Nowy plik', <NewFilePopup/>, true, true, 'OK', this.createNewFile) }><span>Nowy plik</span></Button>
        <Button onClick={ clickButton.bind(this, 'Wczytaj plik', 'Content', true, true, 'Confirm', null) }><span>Wczytaj plik</span></Button>
        <Button onClick={ clickButton.bind(this, 'Zapisz jako PNG', <SavePngPopup/>, true, true, 'Zapisz', this.savePNG) }><span>Zapisz jako PNG</span></Button>
        <Button onClick={ clickButton.bind(this, 'Zapisz jako SVG', 'Content', true, true, 'Confirm', null) }><span>Zapisz jako SVG</span></Button>
        <Button onClick={ clickButton.bind(this, 'Kod', <CodePopup/>, true, false, 'OK', this.svgCode) }><span>Kod</span></Button>
        {/* <Button onClick={ clickButton.bind(this, 'Zapisz w chmurze', 'Content', true, true, 'Confirm', null) }><span>Zapisz w chmurze</span></Button> */}
      </List>
    )
  }
}

const mapStateToProps = state => ({
  documentWidth: state.document.width,
  documentHeight: state.document.height
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
  },
  closeModal: () => {
    dispath(closeModal())
  },
  createNewFile: () => {
    dispath(newFile());
    broadcast(newFile());
  }
})

export default connect(mapStateToProps, mapDispathToProps)(FileOperations);