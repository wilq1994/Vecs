import React from 'react';
import styled from 'styled-components';

import FileOperations from './FileOperations';
import Users from './Users';

const Bar = styled.div`
  background: #fff;
  grid-area: topbar;
  display: flex;
  align-items: center;
  padding: 0 0.7rem;
  border-bottom: 1px solid #d9d9d9;
`;

const Logo = styled.img`
  display: block;
  height: 58px;
  margin-right: 1.4rem;
`;

const TopBar = () => (
  <Bar>
    <Logo src="img/logo.png" alt="Vecs"/>
    <FileOperations/>
    <Users/>
  </Bar>
)

export default TopBar;