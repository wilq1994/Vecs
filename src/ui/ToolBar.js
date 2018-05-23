import React from 'react';
import styled from 'styled-components';

const Bar = styled.div`
  background: #fff;
  grid-area: toolbar;
  border-right: 1px solid #d9d9d9;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const Button = styled.button`
  background: transparent;
  border: 0;
  cursor: pointer;
  align-self: stretch;
  height: calc(1.4rem * 2.5);
  position: relative;
  &:after {
    content: '';
    background: var(--orange);
    display: ${ props => props.active ? 'block' : 'none' };
    position: absolute;
    right: -1px;
    top: 0;
    bottom: 0;
    width: 2px;
  }

  &:hover {
    &:after {
      display: block;
    }
  }
`;

const Fill = styled.div`
  background: linear-gradient(to right bottom, #fff 40%, #ff0000 40%, #ff0000 60%, #fff 60%);
  width: 2.45rem;
  height: 2.45rem;
  margin-top: 1.4rem;
  border: 1px solid #d9d9d9;
  box-shadow: 0 0 1px rgba(0, 0, 0, 0.2) inset;
`;

const Stroke = styled.div`
  background: linear-gradient(to right bottom, #fff 40%, #ff0000 40%, #ff0000 60%, #fff 60%);
  width: 2.45rem;
  height: 2.45rem;
  margin-top: 0.7rem;
  border: 1px solid #d9d9d9;
  box-shadow: 0 0 1px rgba(0, 0, 0, 0.2) inset;
  position: relative;
  &:after {
    content: '';
    background: #fff;
    display: block;
    position: absolute;
    top: 0.35rem;
    left: 0.35rem;
    right: 0.35rem;
    bottom: 0.35rem;
    border: 1px solid #d9d9d9;
    box-shadow: 0 0 1px rgba(0, 0, 0, 0.2);
  }
`;

const ToolBar = () => (
  <Bar>
    <Button active>Select</Button>
    <Button>Path</Button>
    <Button>Line</Button>
    <Button>Circle</Button>
    <Button>Rectangle</Button>
    <Button>Text</Button>
    <Button>Image</Button>
    <Fill/>
    <Stroke/>
  </Bar>
)

export default ToolBar;