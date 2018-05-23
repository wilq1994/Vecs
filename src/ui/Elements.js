import React from 'react';
import styled from 'styled-components';

import Checkbox from './Checkbox';

const Box = styled.div`
  background: #fff;
  grid-area: elements;
  border-left: 1px solid #d9d9d9;
  display: flex;
  flex-direction: column;
  align-items: stretch;
`;

const Heading = styled.div`
  flex: 0 0 auto;
  display: flex;
  align-items: center;
  padding: 0.7rem;
  border-left: 5px solid transparent;
  h2 {
    font-size: 1rem;
    text-transform: uppercase;
    font-weight: 500;
    letter-spacing: 2px;
    margin: 0;
    margin-left: 0.7rem;
  }
`;

const List = styled.div`
  overflow: auto;
  flex: 1 1 auto;
  height: 0;
  ul {
    list-style: none;
    padding: 0;
    margin: 0;
  }
`;

const Item = styled.li`
    background: ${ props => props.active ? '#f0f0f0' : 'transparent' };
    color: ${ props => props.hue ? `hsla(${props.hue}, 80%, 30%, 0.5)` : 'inherit' };
    font-size: 0.75rem;
    padding: 0.35rem 0.7rem;
    display: flex;
    align-items: center;
    border-left: 5px solid ${ props => props.hue ? `hsl(${props.hue}, 80%, 80%)` : 'transparent' };
    cursor: ${ props => props.hue ? 'default' : 'pointer' };
    &:hover {
      background: ${ props => props.hue ? 'transparent' : '#f0f0f0' };
    }
  }

  span {
    margin-left: 0.7rem;
  }
`;

const Elements = () => (
  <Box>
    <Heading>
      <Checkbox checked/>
      <h2>Elementy</h2>
    </Heading>
    
    <List>
      <ul>
        <Item><Checkbox checked/><span>obraz</span></Item>
        <Item hue={ 16 }><Checkbox checked/><span>kwadrat</span></Item>
        <Item hue={ 186 }><Checkbox checked/><span>tekst</span></Item>
        <Item active><Checkbox checked/><span>linia</span></Item>
        <Item hue={ 106 }><Checkbox checked/><span>koło</span></Item>
        <Item><Checkbox checked/><span>ścieżka</span></Item>
      </ul>
    </List>
  </Box>
)

export default Elements;