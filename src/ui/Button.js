import React from 'react';
import styled from 'styled-components';

const Button = styled.button`
  background: ${props => props.text ? 'none' : 'var(--orange)' };
  color: hsla(33, 100%, 25%, 1);
  font-weight: 500;
  line-height: 3.75rem;
  text-transform: uppercase;
  padding: 0 1.4rem;
  border-radius: 5px;
  border: 0;
  cursor: pointer;
  box-shadow: ${ props => props.text ? 'none' : '0px 1px 5px rgba(0,0,0,0.2)' };
  display: ${props => props.block ? 'block' : 'inline-block' };
  width: ${props => props.block ? '100%' : 'auto' };
  transition: all 0.3s ease;
  &:focus {
    box-shadow: 0 0 2px #bbb inset;
  }

  &:disabled {
    cursor: default;
    background: hsl(43, 0%, 80%);
    color: hsla(33, 0%, 25%, 0.5);
    box-shadow: none;
  }

  &:not(:disabled):hover {
    background: ${props => props.text ? 'hsla(43, 45%, 85%, 1)' : '#ffc300' };
  }
`;

export default Button;