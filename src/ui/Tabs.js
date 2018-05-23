import React from 'react';
import styled from 'styled-components';

const List = styled.div`
  background: #f0f0f0;
  flex: 0 0 auto;
  display: flex;
`;

const Button = styled.div`
  background: ${ props => props.active ? '#fff' : 'transparent' };
  font-size: 0.75rem;
  padding: 0.7rem 1.4rem;
  margin: 0;
  border: 0;
  cursor: pointer;
  border-top: 2px solid ${ props => props.active ? 'var(--orange)' : 'transparent' };
  border-bottom: 2px solid transparent;
  &:hover {
    border-bottom: 2px solid ${ props => props.active ? 'transparent' : 'var(--orange)' };
  }
`;

const Tabs = () => (
  <List>
    <Button active>Tło</Button>
    <Button>Obrys</Button>
  </List>
)

export default Tabs;