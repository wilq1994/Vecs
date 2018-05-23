import React from 'react';
import styled from 'styled-components';

import Avatar from './Avatar';

const List = styled.div`
  flex: 1 1 auto;
  display: flex;
  align-items: center;
  justify-content: flex-end;
  list-style: none;
  padding: 0;
  margin: 0;
  ${ Avatar }:last-child {
    margin-left: 2.1rem;
    position: relative;
    &:before {
      content: '';
      display: block;
      background: #d9d9d9;
      top: 5px;
      bottom: 5px;
      position: absolute;
      right: 100%;
      width: 1px;
      margin-right: 1.05rem;
    }
  }
`;

const Users = () => (
  <List>
    <Avatar login="Tomek" hue={ 16 }/>
    <Avatar login="Vlad" hue={ 106 } inactive/>
    <Avatar login="Mateusz" hue={ 186 }/>
    <Avatar login="Wilq" hue={ 46 } speak/>
  </List>
)

export default Users;