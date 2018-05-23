import React from 'react';
import styled from 'styled-components';

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

const FileOperations = () => (
  <List>
    <Button><span>Nowy plik</span></Button>
    <Button><span>Wczytaj plik</span></Button>
    <Button><span>Zapisz jako PNG</span></Button>
    <Button><span>Zapisz jako SVG</span></Button>
    <Button><span>Zapisz w chmurze</span></Button>
    <Button><span>Kod</span></Button>
  </List>
)

export default FileOperations;