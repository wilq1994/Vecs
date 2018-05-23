import React from 'react';
import styled from 'styled-components';

const Wrapper = styled.div`
  background: #f0f0f0;
  grid-area: stage;
  padding: 1.4rem;
`;

const Container = styled.div`
  height: 100%;
  overflow: auto;
  display: flex;
  align-items: center;
  justify-content: center;
  svg {
    flex: 0 0 auto;
    background: #fff;
    box-shadow: 0px 2px 15px rgba(0, 0, 0, 0.2);
  }
`;

const Stage = () => (
  <Wrapper>
    <Container>
      <svg xmlns="http://www.w3.org/2000/svg" version="1.1" viewBox="0 0 500 500" width="500" height="500">
        <linearGradient id="gradient">
          <stop className="begin" offset="0%" stop-color="green"/>
          <stop className="end" offset="100%" stop-color="gold"/>
        </linearGradient>
        <rect x="100" y="100" width="100" height="100" style={{ fill: 'url(#gradient)' }} />
        <circle cx="300" cy="300" r="30" style={{ fill: 'url(#gradient)' }} />
      </svg>
    </Container>
  </Wrapper>
)

export default Stage;