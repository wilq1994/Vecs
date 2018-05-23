import React from 'react';
import styled from 'styled-components';

import Tabs from './Tabs';

const Box = styled.div`
  background: #fff;
  grid-area: properties;
  border-left: 1px solid #d9d9d9;
  border-bottom: 1px solid #d9d9d9;
  display: flex;
  flex-direction: column;
  align-items: stretch;
`;

const Heading = styled.div`
  flex: 0 0 auto;
  padding: 0.7rem;
  h2 {
    font-size: 1rem;
    text-transform: uppercase;
    font-weight: 500;
    letter-spacing: 2px;
    margin: 0;
    margin-left: 0.7rem;
  }
`;

const Container = styled.div`
  flex: 1 1 auto;
  height: 0;
  overflow: auto;
  padding: 1.4rem;
`;

const Properties = () => (
  <Box>
    <Heading><h2>Właściwości</h2></Heading>
    <Tabs/>
    <Container>
      
    </Container>
  </Box>
)

export default Properties;